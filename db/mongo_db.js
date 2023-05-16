const mongoose = require('mongoose');
// const logger = require('../config/logger');
const { MONGODB_URL } = require('../config');
// const seedPackagesDB = require('../config/seedDb');

const connectDB = async () => {
  try {
    let autoIndex = true; //todo:process.env.NODE_ENV == 'production' ? false : true;
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex,
    });
    console.log('MongoDB Connected');
    process.env.NODE_ENV != 'production' && mongoose.set('debug', true);

    //for graceful start
    process.send('ready');
  } catch (err) {
    // logger.error(err.message, err);
    process.exit(1);
  }
};

module.exports = connectDB;
