const Sequelize = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.get('db.name'), 
								config.get('db.user'),
								config.get('db.password'),
								{
									host: config.get('db.db_url'),
									port: '5432',
									dialect: 'postgres',
									logging: false
								})

module.exports = sequelize;