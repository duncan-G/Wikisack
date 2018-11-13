const router = require('express').Router();
const pageRouter = require('./page');
const userRouter = require('./user');
const { error404 } = require('../views');

router.use('/wiki', pageRouter);
router.use('/users', userRouter);
router.use((req, res) => {
  res.send(error404());
})

router.use((err, req, res, next) => {
  if (err) {
    res.status(err.status).send(err.handler(...err.args));
  } else {
    next();
  }
});

module.exports = router;
