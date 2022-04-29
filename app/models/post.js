// sequelize implementation
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');


const postSchema = sequelize.define('postSchema', {
	_id: {
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
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
		allowNull: false,
		validate: {
			isLowercase: true,
			isAlphanumeric: true,
		}
	}
});

module.exports = postSchema;