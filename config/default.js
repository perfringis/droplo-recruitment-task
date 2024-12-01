const dotenv = require('dotenv');
const { resolve } = require('path');

dotenv.config();

module.exports = {
  root: resolve('./'),
};