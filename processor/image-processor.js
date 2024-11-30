const { resolve, join } = require('path');
const fs = require('fs');

const { chunk } = require('lodash');
const { default: axios } = require('axios');
const sharp = require('sharp');
const ImageModel = require(resolve('model/image'));
const logger = require(resolve('config/logger'));

class ImageProcessor {

  async start() {
    const batchSize = parseInt(process.env.DEFAULT_BATCH_SIZE, 10);
    const filePath = resolve(join(process.cwd(), 'data/data.csv'));
    const data = fs.readFileSync(filePath, 'utf-8');
    const rows = this.parseCSV(data);

    logger.info(`Batch size: ${batchSize}`);
    logger.info(`Items: ${rows.length}`);

    const rawList = rows.map(row => ({
      index: row.index,
      id: row.id,
      url: row.url,
      thumbnail: null,
    }));

    const chunks = chunk(rawList, batchSize);

    logger.info('Starting batch...');

    for (const chunk of chunks) {
      try {
        const images = await this.processChunk(chunk, batchSize);

        await ImageModel.insertMany(images, { ordered: false });

        logger.info(`Processed batch size: ${images.length}`);
        logger.info(`Last processed index: ${chunk[chunk.length - 1].index}, Last processed ID: ${chunk[chunk.length - 1].id}`);

      } catch (error) {
        logger.error(`Error processing batch: ${error.message}`);
      }
    }
  }

  async processChunk(rawEntities, batchSize) {
    const tasks = rawEntities.map(rawEntity => this.createThumbnail(rawEntity));

    return Promise.all(tasks);
  }

  async createThumbnail(rawEntity) {
    try {
      const response = await axios.get(rawEntity.url, { responseType: 'arraybuffer' });
      const buffer = await sharp(response.data)
        .resize(100, 100)
        .toBuffer();

      rawEntity.thumbnail = buffer;
      delete rawEntity.url;
      return rawEntity;
    } catch (error) {
      logger.error(`Error creating thumbnail for ID ${rawEntity.id}: ${error.message}`);
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