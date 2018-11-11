const router = require('express').Router();
const pageRouter = require('./page');
const userRouter = require('./user');
const { error404 } = require('../views');

router.use('/wiki', pageRouter);
router.use('/users', userRouter);
router.use((req, res, next) => {
  res.send(error404());
})
module.exports = router;
