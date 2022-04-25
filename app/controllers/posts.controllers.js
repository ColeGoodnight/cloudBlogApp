const Post = require("../models/post");
const redis = require('./models/cache')

const homeStartingContent =
	'The home pages lists all the blogs from all the users.';

const composePost = (req, res) => {
	const post = new Post({
    	username: req.user.username,
		title: req.body.postTitle,
		content: req.body.postBody
	});

	post.save();

	/*
	const id = postgres.insert(post);
	redis.set(id, post);
	*/
	res.redirect('/post');
};

const displayAllPosts = (req, res) => {
	Post.find({}, function(err, posts) {
		res.render('home', {
			startingContent: homeStartingContent,
			posts: posts
		});
	});
};

// Use mget for finding post
async function displayPost (req, res)  {
	const requestedPostId = req.params.postId;

	redis.get(requestedPostId, (err, result) => {
		if (err) {
			Post.findOne({ _id: requestedPostId }, function(err, post) {
				redis.set(requestedPostId, JSON.stringify(post));
				res.render('post', {
					title: post.title,
					content: post.content
				});
			});
		} else {
			post = JSON.parse(result);
			res.render('post', {
				title: result.title,
				content: result.content
			});
		}
	  });

	
};

module.exports = {
	displayAllPosts,
	displayPost,
    composePost
};