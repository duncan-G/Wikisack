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
  }
});

Page.addHook('beforeValidate', (pageData) => {
  pageData.slug = slugify(pageData.title);
})

module.exports = Page;
