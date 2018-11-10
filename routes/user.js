const router = require('express').Router();
const { User, Page } = require('../models');
const { userList, userPages } = require('../views');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(userList(users));
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    const pages = await Page.findAll({
      where: { authorId: user.id }
    });

    res.send(userPages(user, pages));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {});

router.put('/:id', async (req, res, next) => {});

router.delete('/:id', async (req, res, next) => {});

module.exports = router;
