const { resolve } = require('path');
const mongoose = require('mongoose');
const ImageProcessor = require(resolve('processor/image-processor'));

mongoose.connect(process.env.MONGO_URI);
