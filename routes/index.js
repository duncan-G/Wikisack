const router = require('express').Router();
const pageRouter = require('./page');
const userRouter = require('./user');

router.use('/wiki', pageRouter);
router.use('/users', userRouter);

module.exports = router;
