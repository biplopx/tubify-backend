const express = require('express');
const mongoose = require('mongoose');
const songModel = require('../models/songModel');
const songRouter = express.Router();


// get all song
songRouter.get('/all-song', async (req, res) => {
  const result = await songModel.find({})
  res.send(result.reverse())
});


// Single Song Route
songRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const song = await songModel.findById({ _id: id });
    res.send(song);
  }
  catch {
    res.send("Song not found")
  }
})

// Add Song api
songRouter.post('/add-song', async (req, res) => {
  const newSong = req.body;
  try {
    const song = await songModel.create(newSong)
    res.status(200).json({ status: "successful" });
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
});

//  Delete song by id 
songRouter.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Item not found" });
  }
  try {
    const DeleteSong = await songModel.deleteOne({ _id: id })
    res.status(200).json({ status: "successful" });
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})
//  Edit song by id 
songRouter.patch('/edit/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Item not found" });
  }
  try {
    const song = await songModel.findById({ _id: id })
    Object.assign(song, req.body);
    await song.save();
    console.log(song)
    res.status(200).json({ status: "successful" });
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// 
// songRouter.put('/edit/:id', async (req, res) => {
//   const { id } = req.params;
//   const update = req.body;
//   try {
//     const updateSong = await songModel.findOneAndUpdate(id, update, {
//       new: true
//     });
//     console.log(updateSong)
//     res.status(200).send({ status: "successful" })
//   }
//   catch (error) {
//     res.status(400).json({ error: error.message })
//   }

// });

module.exports = songRouter;