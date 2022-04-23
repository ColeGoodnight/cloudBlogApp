const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		lowercase: true,
		required: [ true, "can't be blank" ],
		match: [ /^[a-zA-Z0-9]+$/, 'Invalid username' ],
		unique: true,
		index: true
	},
	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: [ true, "can't be blank" ],
		match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid Email' ],
		index: true
	}
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model("User", userSchema);


// sequelize implementation
const { Sequelize, DataTypes } = require('sequelize');
// can we have an inherited sequelize object from config?
//const sequelize = new Sequelize('urltodb?');

const postSchema = sequelize.define('userSchema', {
	username: {
		type: DataTypes.STRING,
		unique: true,
		validate: {
			// need to see if required exists in sequelize
			isLowercase: true,
			notEmpty: true,
			validateUsername: function(username) {
				// may need to modify regex
				if ((/^[a-zA-Z0-9]+$/)) {
					throw new Error('Username not valid');
				}
			}
		}
	},
	email: {
		type: DataTypes.STRING,
		unique: true,
		validate: {
			// need to see if required exists in sequelize
			isLowercase: true,
			notEmpty: true,
			validateEmail: function(username) {
				// may need to modify regex
				if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
					throw new Error('Email not valid');
				}
			}
		}
	}
})