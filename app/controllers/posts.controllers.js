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
	}).catch(function (err) {
		console.log(err)
	})
		
	
	res.redirect('/post');
};

const displayAllPosts = (req, res) => {
	Post.findAll().then( function(posts) {
		res.render('home', {
			startingContent: homeStartingContent,
			posts: posts
		});
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
      await Post.findOne({
        where: {
          _id: requestedPostId,
        }
      }).then((post) => redis.set(requestedPostId, JSON.stringify(post)))
      .then((post) => renderPost(post))
      .catch((err) => {
        console.log(err);
      });
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