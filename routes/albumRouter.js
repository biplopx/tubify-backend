const express = require('express');
const albumModel = require('../models/albumModel');
const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res) => {
  try {
    const allAlbums = await albumModel.find().populate('songs');
    res.send(allAlbums)
  }
  catch (error) {
    res.send(error)
  }
})
module.exports = albumsRouter;