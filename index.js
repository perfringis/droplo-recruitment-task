const { resolve } = require('path');
const ImageProcessor = require(resolve('processor/image-processor'));
const mongoose = require(resolve('config/mongoose'));
const logger = require(resolve('config/logger'));

mongoose
  .then(connection => {
    logger.info('MongoDB connected...');
  })
  .catch(error => {
    logger.error(`MongoDB error ${error}`);
  });

(async () => {
  const processor = new ImageProcessor();
  await processor.process();
})();