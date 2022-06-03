const Sequelize = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize('assign3db'/*config.get('db.name')*/, 
								config.get('db.user'),
								config.get('db.password'),
								{
									host: 'database-1.cw0wwz7qupmp.us-west-2.rds.amazonaws.com',//config.get('db.db_url'),
									port: '5432',
									dialect: 'postgres',
									logging: false
								})

module.exports = sequelize;