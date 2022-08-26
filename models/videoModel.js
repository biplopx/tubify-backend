const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
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
    videoSrc: {
      type: String,
      required: true  
    },
    lyrics: {
      type: String,
      required: false
    },
    album: {
      type: String,
      required: false
    },
    videoType: {
      type: String,
      required: true
    },
    lang: {
      type: String,
      required: true
    },
    category: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'Category'
    },
    likedCount: {
      type: Number,
      required: false,
      default: 0
    },
  });
  
  module.exports = mongoose.model('Video', videoSchema);