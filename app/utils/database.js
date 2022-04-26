const Sequelize = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.get('db.name'), 
								config.get('db.user'),
								config.get('db.password'),
								{
									host: 'assign1-db.cw0wwz7qupmp.us-west-2.rds.amazonaws.com',
									port: '5432',
									dialect: 'postgres',
									logging: false
								})

module.exports = sequelize;