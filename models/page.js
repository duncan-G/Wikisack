const Sequelize = require('sequelize');
const db = require('./db.js');
const slugify = require('slug');

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
});

const slugifyTitle = pageData => {
  pageData.slug = slugify(pageData.title);
};
Page.addHook('beforeValidate', slugifyTitle);
Page.addHook('beforeUpdate', slugifyTitle);

module.exports = Page;
