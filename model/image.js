const { resolve } = require('path');

const mongoose = require('mongoose');
const ImageSchema = require(resolve('schema/image'));

const ImageModel = mongoose.model('Image', ImageSchema);

module.exports = ImageModel;