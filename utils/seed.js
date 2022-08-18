const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUser } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await Thought.deleteMany({});
  await User.deleteMany({});

  const users = getRandomUser();
  
  console.log(users);


  await User.collection.insertMany(users);
 
  console.table(users);

  console.info('Seeding complete! 🌱');
  process.exit(0);
});
