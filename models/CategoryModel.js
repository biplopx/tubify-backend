const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: "Song"
  }]
});

module.exports = mongoose.model('Category', categorySchema);