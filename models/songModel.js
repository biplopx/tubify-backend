const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  singer: {
    type: String,
    required: true
  },
  cover: {
    type: String,
    required: true,
  },
  musicSrc: {
    type: String,
    required: true
  },
  lyrics: {
    type: String,
    required: false
  },
  album: {
    type: String,
    // required: false,
    ref: "Album"
  },
  musicType: {
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

module.exports = mongoose.model('Song', songSchema);