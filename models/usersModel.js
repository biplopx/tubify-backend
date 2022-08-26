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

  playlist: [{
    type: Schema.Types.ObjectId,
    ref: "Playlist"
  }],

  likedSongs: [{
    type: Schema.Types.ObjectId,
    ref: "Song"
  }],
  saveForLater: [{
    type: Schema.Types.ObjectId,
    ref: "Song"
  }],
  followedArtist: {
    type: Array,
    required: false
  },
  payment: {
    type: Boolean,
    required: false
  }
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);