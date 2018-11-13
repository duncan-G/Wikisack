const addPage = require('./addPage');
const editPage = require('./editPage');
const error404 = require('./404.js')
const error500 = require('./500.js');
const layout = require('./layout');
const main = require('./main');
const userList = require('./userList');
const userPages = require('./userPages');
const wikiPage = require('./wikiPage');
const searchPage = require('./search');

module.exports = {
  addPage,
  editPage,
  error404,
  error500,
  layout,
  main,
  userList,
  userPages,
  wikiPage,
  searchPage
};
