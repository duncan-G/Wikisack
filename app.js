const express = require('express');
const path = require('path');
const router = require('./routes');
const models = require('./models');
const app = express();

// Body parsers
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Logger
const logger = require('morgan');
app.use(logger('dev'));

// Static
const staticFilesMw = express.static(path.join(__dirname, 'public'));
app.use(staticFilesMw);

// Routes
app.get('/', (req, res, next) => {
  res.redirect('/wiki');
});
app.use(router);

// Test database connection
models.db.authenticate().then(() => {
  console.log('connected to the database');
});

const PORT = 1337;
// Init database
const init = async () => {
  await models.db.sync({});

  app.listen(PORT, () => {
    console.log('App started');
  });
};

// Start server
init();
