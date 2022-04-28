/*
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
*/

// sequelize implementation
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const userSchema = sequelize.define('userSchema', {
	username: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
		validate: {
			isLowercase: true,
			/*
			// need to fix regex
			validateUsername: function(username) {
				// may need to modify regex
				if (! String.test(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))/)) {
					throw new Error('Username not valid');
				}
			}
			*/
		}
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isLowercase: true,
			/*
			// need to fix regex
			validateEmail: function(username) {
				// may need to modify regex
				if (! String.test(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
					throw new Error('Email not valid');
				}
			}
			*/
		}
	},
	password: {
		type: DataTypes.STRING,
		allowNull: true,
		notEmpty: true,
	}
});
userSchema.prototype.validPassword = function (password) {
	return this.password === password;
}

module.exports = userSchema;