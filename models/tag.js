const Sequelize = require('sequelize');
const db = require('./db.js');

const Tag = db.define('tag', {
  name: {
    type: Sequelize.STRING
  }
});

module.exports = Tag;
