const { resolve } = require('path');

const mongoose = require('mongoose');
const ImageSchema = require(resolve('schema/image'));

module.exports = mongoose.model('Image', ImageSchema);