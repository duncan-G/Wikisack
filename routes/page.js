const router = require('express').Router();
const { addPage, editPage, main, wikiPage } = require('../views');
const { Page, User } = require('../models');

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages));
  } catch (err) {
    next(err);
  }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const slug = req.params.id;
    const page = await Page.findOne({ slug });
    const user = await page.getAuthor();

    res.send(wikiPage(page, user));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const [user, _] = await User.findOrCreate({
      where: {
        name: req.body.author,
        email: req.body.email
      }
    });

    const newPage = await Page.create({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status
    });

    newPage.setAuthor(user);
    await newPage.save();
    res.redirect(`/wiki/${newPage.slug}`);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', (req, res, next) => {
  let page;
  res.send(wikiPage(page));
});

router.delete('/:id', (req, res, next) => {
  let page;
  res.send(wikiPage(page));
});

module.exports = router;
