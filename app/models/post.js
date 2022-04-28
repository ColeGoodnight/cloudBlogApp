/*
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
	username: {
		type: String,
		lowercase: true,
		required: [ true, "can't be blank" ],
		match: [ /^[a-zA-Z0-9]+$/, 'Invalid username' ],
		index: true,
		unique: true
	},
	title: { type: String, required: [ true, "can't be blank" ] },
	content: { type: String, required: [ true, "can't be blank" ] }
});

module.exports = mongoose.model("Post", postSchema);
*/

// sequelize implementation
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');


const postSchema = sequelize.define('postSchema', {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	content: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	username: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
		validate: {
			isLowercase: true,
			validateUsername: function(username) {
				// may need to modify regex
				if (! String.test(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))/)) {
					throw new Error('Username not valid');
				}
			}
		}
	}
});

module.exports = postSchema;