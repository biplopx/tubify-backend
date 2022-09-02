const express = require('express');
const albumModel = require('../models/albumModel');
const albumsRouter = express.Router();

// all albums
albumsRouter.get('/', async (req, res) => {
  try {
    const allAlbums = await albumModel.find().populate('songs');
    res.send(allAlbums)
  }
  catch (error) {
    res.send(error)
  }
});

// Single album API
albumsRouter.get('/single-album/:albumId', async (req, res) => {
  const { albumId } = req.params;
  try {
    const singleAlbum = await albumModel.findById({ _id: albumId }).populate('songs');
    res.send(singleAlbum)
  }
  catch (error) {
    res.send(error)
  }
})


module.exports = albumsRouter;