const { request } = require("express");
const Post = require("../models/post");
const redis = require('../models/cache')

const homeStartingContent =
	'The home pages lists all the blogs from all the users.';

const composePost = (req, res) => {
	Post.create({
    	username: req.user.username,
		title: req.body.postTitle,
		content: req.body.postBody
	});

	res.redirect('/post');
};

const displayAllPosts = (req, res) => {
	const posts = Post.findAll();

	res.render('home', {
		startingContent: homeStartingContent,
		posts: posts
	});

	/*Post.find({}, function(err, posts) {
		res.render('home', {
			startingContent: homeStartingContent,
			posts: posts
		});
	});*/
};

async function displayPost (req, res)  {
	const requestedPostId = req.params.postId;

	/*Post.findOne({ _id: requestedPostId }, function(err, post) {
		res.render('post', {
			title: post.title,
			content: post.content
		});
	});*/

  const renderPost = (post) => {
    res.render('post', {
      title: post.title,
      content: post.content
    });
  }
	redis.get(requestedPostId, (err, result) => {
		if (err) {
      const post = Post.findAll({
        where: {
          postId: requestedPostId,
        }
      });
      redis.set(requestedPostId, JSON.stringify(post));
      renderPost(post); 
		} else {
			const post = JSON.parse(result);
      renderPost(post);
			
		}
	});

	
};

module.exports = {
	displayAllPosts,
	displayPost,
    composePost
};