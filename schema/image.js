const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  id: { type: String, required: true },
  index: { type: Number, required: true },
  thumbnail: { type: Buffer, required: true },
});

module.exports = ImageSchema;