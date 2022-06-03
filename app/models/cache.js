const Redis = require("ioredis");

const config = require('../config/config');

const redis = new Redis({
  port: 6379, // Redis port
  host: "colecluster2.awx9ha.ng.0001.usw2.cache.amazonaws.com", // Redis host
  connectTimeout: 10,
  db: 0, // Defaults to 0
});
console.log('redis set');
module.exports = redis;