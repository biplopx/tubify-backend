const express = require('express');
const recommendationAudio = express.Router();
recommendationAudio.get('/', async (req, res) => {
    res.send('recommendationAudio');
    
})





module.exports = recommendationAudio