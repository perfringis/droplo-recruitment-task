const { merge } = require('lodash');

const defaults = require('./default');
const config = require('./env');

module.exports = merge({}, defaults, config);