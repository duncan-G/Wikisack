const models = require('.');
const faker = require('faker');
const slugify = require('slug');
faker.seed(2523);

let tagData = Array(15)
  .fill(null)
  .map(_ => faker.random.word());

const getTags = (size, tags = tagData) => {
  let shuffled = tags.slice(0),
    i = tags.length,
    temp,
    index;
  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
};

const pageData = Array(50)
  .fill(null)
  .map(_ => {
    const title = faker.lorem.words();
    return {
      title: title,
      slug: slugify(title),
      content: faker.lorem.paragraphs(),
      status: ['open', 'closed'][Math.floor(Math.random() * 2)],
      tags: getTags(Math.floor(Math.random() * 15))
    };
  });

const userData = Array(10)
  .fill(null)
  .map(_ => {
    return {
      name: faker.name.findName(),
      email: faker.internet.email()
    };
  });


models.db
  .sync({ force: true })
  .then(() => {
    console.log('Database synced!');
    // `returning: true` is a postgres option returning representations of
    // the new data. Otherwise we get back a success report, not instances.
    return Promise.all([
      models.Page.bulkCreate(pageData, { returning: true }),
      models.User.bulkCreate(userData, { returning: true })
    ]);
  })
  .then(insertedData => {
    const [pages, users] = insertedData;
    // Here we're using Sequelize's 'Magic' methods to set associations.
    // Each one returns a promise, so we must wrap them in Promise.all
    // to return a single promise that will resolve when they all complete
    return Promise.all(
      pages.map((page, i) => {
        let j = i % 5;
        page.setAuthor(users[j]);
      })
    );
  })
  .then(() => {
    console.log('Database seeded!');
  })
  .catch(err => {
    console.log('Disaster! Something went wrong!');
    console.log(err);
  })
  .finally(() => {
    console.log('Closing database connection.');
    models.db.close();
  });
