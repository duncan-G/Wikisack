const router = require('express').Router();
const {
  addPage,
  editPage,
  error404,
  error500,
  main,
  wikiPage
} = require('../views');
const { Page, User } = require('../models');
const marked = require('marked');
const utils = require('./routeUtils');

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages));
  } catch (err) {
    console.error(err);
    const routeError = utils.RouteError(500, error500);
    next(routeError);
  }
});

router.get('/:slug', async (req, res, next) => {
  const slug = req.params.slug;
  const page = await Page.findOne({ where: { slug } });

  if (!page) {
    const routeError = utils.RouteError(404, error404, [slug]);
    next(routeError);
  }

  try {
    const user = await page.getAuthor();
    page.content = marked(page.content);
    res.send(marked(wikiPage(page, user)));
  } catch (err) {
    next(err);
  }
});

router.post('/:slug', async (req, res, next) => {
  const slug = req.params.slug;
  const page = await Page.findOne({ where: { slug } });

  if (!page) {
    const routeError = utils.RouteError(404, error404, [slug]);
    next(routeError);
  }

  try {
    await page.update({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status
    });
    await page.save();

    res.redirect(`/wiki/${page.slug}`);
  } catch (err) {
    next(utils.routeError(500, error500));
  }
});

router.get('/:slug/edit', async (req, res, next) => {
  const slug = req.params.slug;
  const page = await Page.findOne({ where: { slug } });

  if (!page) {
    const routeError = utils.RouteError(404, error404, [slug]);
    next(routeError);
  }

  try {
    const user = await page.getAuthor();
    res.send(editPage(page, user));
  } catch (err) {
    next(utils.RouteError(500, error500));
  }
});

router.get('/:slug/delete', async (req, res, next) => {
  const slug = req.params.slug;
  await Page.destroy({ where: { slug } });
  res.redirect('/');
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

router.use((err, req, res, next) => {
  if (err) {
    res.status(err.status).send(err.handler(...err.args));
  } else {
    next();
  }
});

module.exports = router;
