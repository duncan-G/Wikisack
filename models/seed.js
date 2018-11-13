const models = require('./models');
const faker = require('faker');
faker.seed(3523);

const tags = Array(15).fill(null).map(_ => faker.random.word);
const getTags(tags, size) => {
  var shuffled = arr.slice(0), i = arr.length, temp, index;
  while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
}
const pageData = Array(50)
  .fill(null)
  .map(_ => {
    return {
      title: faker.lorem.words,
      content: faker.lorem.paragraphs,
      status: ['open', 'closed'][Math.floor(Math.random() * 2)],
      tags: faker.random.words.split(' ')
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

db.sync({ force: true })
  .then(() => {
    console.log('Database synced!');
    // `returning: true` is a postgres option returning representations of
    // the new data. Otherwise we get back a success report, not instances.
    return Promise.all([
      models.Page.bulkCreate(pageData, { returning: true }),
      models.User.bulkCreate(userData, { returning: true }),
    ]);
  })
  .then(insertedData => {
    const [pages, users] = insertedData;
    const [carrot, tomato, pepper] = vegetables;
    const [mcgregor, hashimoto, giancarlo] = gardeners;
    const [mcgregorPlot, hashimotoPlot, giancarloPlot] = plots;

    // Here we're using Sequelize's 'Magic' methods to set associations.
    // Each one returns a promise, so we must wrap them in Promise.all
    // to return a single promise that will resolve when they all complete
    return Promise.all([
      mcgregor.setFavoriteVegetable(carrot),
      mcgregorPlot.setGardener(mcgregor),
      mcgregorPlot.setVegetables([carrot, pepper]),

      hashimoto.setFavoriteVegetable(pepper),
      hashimotoPlot.setGardener(hashimoto),
      hashimotoPlot.setVegetables([carrot, pepper, tomato]),

      giancarlo.setFavoriteVegetable(tomato),
      giancarloPlot.setGardener(giancarlo),
      giancarloPlot.setVegetables([tomato, pepper])
    ]);
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
    db.close();
  });
