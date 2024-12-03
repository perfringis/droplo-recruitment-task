const { resolve } = require('path');
const { default: axios } = require('axios');
const sharp = require('sharp');

const logger = require(resolve('config/logger'));
const Image = require(resolve('model/image'));
const CSVParser = require(resolve('utils/csv-parser'));
const File = require(resolve('utils/file'));
const { chunk } = require('lodash');

class ImageProcessor {

  async process() {
    const file = await File.of({
      path: 'data/data.csv', limit: 120,
    });
    const batchSize = file.getLimit();

    const rows = await CSVParser.parse(file);

    logger.info(`Batch size: ${batchSize}`);
    logger.info(`Items: ${rows.length}`);

    const batches = chunk(rows, batchSize);

    logger.info('Starting batch...');

    await this.processBatches(batches);
  }

  async processBatches(batches) {
    return Promise.all(batches.map(async (batch) => {
      try {
        const batchOfImages = await this.processBatch(batch);
        await Image.insertMany(batchOfImages, { ordered: false });

        logger.info(`Processed batch size: ${batchOfImages.length}`);
        logger.info(`Last processed index: ${batch[batch.length - 1].index}, Last processed ID: ${batch[batch.length - 1].id}`);
      } catch (error) {
        throw new Error(`Could not process batches: ${error.message}`);
      }
    }));
  }

  async processBatch(batch) {
    return Promise.all(batch.map(async (row) => {
      const { id, index, url } = row;
      try {
        const response = await this.downloadImage(url);
        const thumbnail = await this.createThumbnail(response.data);

        return { _id: id, thumbnail, index };
      } catch (error) {
        throw new Error(`Could not process batch and create thumbnail for Id ${id}: ${error.message}`);
      }
    }));
  }

  async downloadImage(url) {
    try {
      return await axios.get(url, { responseType: 'arraybuffer' });
    } catch (error) {
      throw new Error(`Could not download image: ${url}: ${error.message}`);
    }
  }

  async createThumbnail(buffer) {
    try {
      return await sharp(buffer)
        .resize(100, 100)
        .toBuffer();
    } catch (error) {
      throw new Error(`Could not create thumbnail: ${buffer}: ${error.message}`);
    }
  }
}

module.exports = ImageProcessor;