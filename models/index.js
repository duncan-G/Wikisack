const db = require('./db');
const Page = require('./page');
const Tag = require('./tag');
const User = require('./user');

Page.belongsTo(User, {as: 'author' });

module.exports = {
  db,
  Page,
  Tag,
  User
};
