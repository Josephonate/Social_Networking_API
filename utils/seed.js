const connection = require('../config/connection');
const {User, Thought} = require('../models');


connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await Thought.deleteMany({});
    await User.deleteMany({});
  
    await User.collection.insertMany(users);

    console.info('Seeding complete! 🌱');
    process.exit(0);
  });
  