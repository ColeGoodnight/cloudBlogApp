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

// sequelize implementation
const { Sequelize, DataTypes } = require('sequelize');
// can we have an inherited sequelize object from config?
//const sequelize = new Sequelize('urltodb?');

const postSchema = sequelize.define('postSchema', {
	title: DataTypes.STRING,
	content: DataTypes.STRING,
	username: {
		type: DataTypes.STRING,
		unique: true,
		validate: {
			// need to see if required exists in sequelize
			isLowercase: true,
			notEmpty: true,
			validateUsername: function(username) {
				// may need to modify regex
				if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))/)) {
					throw new Error('Username not valid');
				}
			}
		}
	}
})