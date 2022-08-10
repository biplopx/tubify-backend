const express = require('express');
const mongoose = require('mongoose');
const songModel = require('../models/songModel');
const songRouter = express.Router();

// get all song
songRouter.get('/all-song', async (req, res) => {
  const result = await songModel.find({})
  res.send(result)
});

// Add Song api
songRouter.post('/add-song', async (req, res) => {
  const { name, singer, cover, musicType, playlist, musicSrc, lyrics, lang } = req.body;
  // add to the database
  try {
    const song = await songModel.create({
      name, singer, cover, musicType, playlist
      , musicSrc, lyrics, lang
    })
    res.status(200).json({ status: "successful" });
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
});

//  Delete song by id 
songRouter.delete('/delete', async (req, res) => {
  const { id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Item not found" });
  }
  try {
    const DeleteSong = await songModel.deleteOne({ id })
    res.status(200).json(DeleteSong);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

})

module.exports = songRouter;