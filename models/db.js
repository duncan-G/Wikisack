const Sequelize = require('sequelize');
// const config = require('./.db.config');

/*
  config = {
    username: 'username',
    password: 'password',
    database: 'wikistack',
    host: 'localhost',
    port: 5432,
  };
*/

// config.databaseUrl = function() {
//   return `postgres://${this.username}:${this.password}@${this.host}:${this.port}/${this.database}`;
// };

const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

module.exports = db;
