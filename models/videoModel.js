const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  thumbnail: {
    type: String,
    required: true
  },
  videoSrc: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    required: true
  },
  videoType: {
    type: String,
    required: true
  },
  likedCount: {
    type: Number,
    required: false,
    default: 0
  },
});

module.exports = mongoose.model('Video', videoSchema);