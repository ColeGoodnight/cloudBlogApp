// sequelize implementation
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const userSchema = sequelize.define('userSchema', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.INTEGER,
	},
	username: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
		validate: {
			isLowercase: true,
			isAlphanumeric: true,
		}
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isLowercase: true,
			isEmail:true,
		}
	},
	password: {
		type: DataTypes.STRING,
		allowNull: true,
		notEmpty: true,
	}
});
userSchema.findById = async function (userid) {
	const temp = await userSchema.findOne({
		where: {
			id: userid
		}
	})
	return temp
}

module.exports = userSchema;