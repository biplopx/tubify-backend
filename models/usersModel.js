const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true
  },
  playlist: {
    type: Array,
    required: false

  },
  likedSongs: {
    type: Array,
    required: false
  },
followedArtist: {
  type: Array,
  required: false
 },
 payment:{
  type:Boolean,
  required: false
 }
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);