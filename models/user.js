const Sequelize = require('sequelize');
const db = require('./db.js');

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    isUnique: true,
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Must be a valid email address'
      }
    }
  }
});

module.exports = User;
