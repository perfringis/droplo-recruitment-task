const { resolve } = require('path');
const mongoose = require('mongoose');

const {
  mongodb: { host, port, user, pass, dbName },
} = require(resolve('config'));

module.exports = mongoose.connect(
  `mongodb://${host}:${port}`,
  {
    user,
    pass,
    dbName,
    authSource: 'admin',
  },
);