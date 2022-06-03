const { request } = require("express");
const Post = require("../models/post");
const redis = require('../models/cache')
const crypto = require('node:crypto')

const { GetCommand, PutCommand, QueryCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbDocClient } = require("../config/ddbdocclient.js");

const homeStartingContent =
	'The home pages lists all the blogs from all the users.';

const composePost = async (req, res) => {
	/*Post.create({
		username: req.user.username,
		title: req.body.postTitle,
		content: req.body.postBody
	}).catch(function (err) {
		console.log(err)
	})*/
	
	console.log("redirected to compose");
	
	const params = {
    TableName: "cloudBlogApp3",
    Item: {
      partKeyID: crypto.randomUUID(),
      username: req.user.username,
      title: req.body.postTitle,
			content: req.body.postBody
    },
  };
  
  try {
    const data = await ddbDocClient.send(new PutCommand(params));
    console.log("Success - item added or updated", data);
  } catch (err) {
    console.log("Error", err.stack);
  }
	
	
		
	
	res.redirect('/post');
};

const displayAllPosts = async (req, res) => {
	/*Post.findAll().then( function(posts) {
		res.render('home', {
			startingContent: homeStartingContent,
			posts: posts
		});
	});*/
	
	const params = {
		TableName: 'cloudBlogApp3',
	}
	
	try {
		const data = await ddbDocClient.send(new ScanCommand(params));
		res.render('home', {
			startingContent: homeStartingContent,
			posts: data.Items
		})
	} catch (err) {
		console.log("Error", err.stack);
	}
}

	
	
	
	
	
	

	

	/*Post.find({}, function(err, posts) {
		res.render('home', {
			startingContent: homeStartingContent,
			posts: posts
		});
	});*/

async function displayPost (req, res)  {
	console.log("made it to display")
	const requestedPostId = req.params.postId;
	

	/*Post.findOne({ _id: requestedPostId }, function(err, post) {
		res.render('post', {
			title: post.title,
			content: post.content
		});
	});*/

  const renderPost = async (post) => {
    res.render('post', {
      title: post.title,
      content: post.content
    });
  }
  
  const params = {
	  TableName: "cloudBlogApp3",
	  Key: {
	    partKeyID: requestedPostId
	  },
	};
	
	try {
    const post = await ddbDocClient.send(new GetCommand(params));
    console.log("Success :", post.Item);
    renderPost(post.Item);
  } catch (err) {
    console.log("Error", err);
  }
  
  
	/*redis.get(requestedPostId, (err, result) => {
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
	});*/

	
};

module.exports = {
	displayAllPosts,
	displayPost,
  composePost
};