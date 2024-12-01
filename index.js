const { resolve } = require('path');
const ImageProcessor = require(resolve('processor/image-processor'));
const mongoose = require(resolve('config/mongoose'));
const logger = require(resolve('config/logger'));

mongoose
  .then(conn => {
    logger.info('MongoDB connected...');
  })
  .catch(err => {
    logger.error(`MongoDB error ${err}`);
  });

(async () => {
  const processor = new ImageProcessor();
  await processor.start();
})();