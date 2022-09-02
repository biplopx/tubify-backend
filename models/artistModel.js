const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    artistName: {
        type: String,
        required: true,
    },
    artistBio: {
        type: String,
        required: true,
    },
    artistProfile: {
        type: String,
        required: false,
    },
    artistCover: {
        type: String,
        required: false,
    }
}, { timestamps: true });
module.exports = mongoose.model('Artist', userSchema);