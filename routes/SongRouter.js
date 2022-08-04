const express = require('express');
const mongoose = require('mongoose');
const songModel = require('../models/songModel');
const songRouter = express.Router();

songRouter.get('/getsong', async (req, res) => {
  res.send("Song is ready")
});

// Add Song
songRouter.post('/add-song', async (req, res) => {
  const { title, url } = req.body;
  // add to the database
  try {
    const song = await songModel.create({ title, url })
    res.status(200).json("success");
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
});

//  Delete song
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