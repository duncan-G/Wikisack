const Sequelize = require('sequelize');
const config = require('./.db.config');

config.databaseUrl = function() {
  return `postgres://${this.username}:${this.password}@${this.host}:${this.port}/${this.database}`;
};

const db = new Sequelize(config.databaseUrl(), {
  logging: false
});

module.exports = db;
