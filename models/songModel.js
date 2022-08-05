const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  singer: {
    type: String,
    required: true

  },
  cover: {
    type: String,
    required: true
  },
  musicSrc: {
    type: String,
    required: true

  },
  lyrics: {
    type: String,
    required: false
  },
  playlist: {
    type: String,
    required: false
  },
  musicType: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Song', songSchema);