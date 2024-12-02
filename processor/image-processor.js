const { resolve } = require('path');
const { promises } = require('fs');
const { chunk } = require('lodash');
const { default: axios } = require('axios');
const sharp = require('sharp');
const ImageModel = require(resolve('model/image'));

const logger = require(resolve('config/logger'));

class ImageProcessor {

  async start(batchSize = 120) {
    const data = await promises.readFile(resolve('data/data.csv'), 'utf-8');
    const rows = this.parseCSV(data);

    logger.info(`Batch size: ${batchSize}`);
    logger.info(`Items: ${rows.length}`);

    const rawList = rows.map(row => ({
      index: row.index,
      _id: row.id,
      url: row.url,
      thumbnail: null,
    }));

    const chunks = chunk(rawList, batchSize);

    logger.info('Starting batch...');

    for (const chunk of chunks) {
      try {
        const images = await this.createThumbnails(chunk);

        await ImageModel.insertMany(images, { ordered: false });

        logger.info(`Processed batch size: ${images.length}`);
        logger.info(`Last processed index: ${chunk[chunk.length - 1].index}, Last processed ID: ${chunk[chunk.length - 1]._id}`);

      } catch (error) {
        logger.error(`Error processing batch: ${error.message}`);
      }
    }
  }

  async createThumbnails(rows) {
    const thumbnails = rows.map(row => this.createThumbnail(row));

    return Promise.all(thumbnails);
  }

  async createThumbnail({ _id, index, url }) {
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const buffer = await sharp(response.data)
        .resize(100, 100)
        .toBuffer();

      return {
        _id: _id,
        index: index,
        thumbnail: buffer,
      };
    } catch (error) {
      logger.error(`Error creating thumbnail for ID ${_id}: ${error.message}`);
      return null;
    }
  }

  parseCSV(data) {
    const rows = data.split('\n');
    const headers = rows.shift().split(',');
    return rows.map(row => {
      const values = row.split(',');
      return headers.reduce((obj, header, index) => {
        obj[header.trim()] = values[index]?.trim();
        return obj;
      }, {});
    });
  }
}

module.exports = ImageProcessor;