const express = require('express');
const mongoose = require('mongoose');
const songModel = require('../models/songModel');
const userModel = require('../models/usersModel');
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
});


// // liked song api
songRouter.put('/like', async (req, res) => {
  try {
    const existSong = await songModel.findOne({
      _id: req.body.id
    });
    if (existSong) {
      const likedSong = await userModel.updateOne({
        email: req.body.email
      }, {
        $push: {
          likedSongs: req.body.id
        }
      });
      const likedCount = await songModel.updateOne({
        _id: req.body.id
      }, {
        $set: {
          likedCount: existSong.likedCount + 1
        }
      });
      res.status(200).json({
        code: "success",
        msg:
          "Successfully liked a song.",
      });
    } else {
      res.status(200).json({
        code: "error",
        msg: "There are no song like this.",
      });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      code: "error",
      msg: "Server Error",
      err: err
    });
  }
})
// // Un liked song API
songRouter.put('/unlike', async (req, res) => {
  console.log(req.body)
  try {
    const existSong = await songModel.findOne({
      _id: req.body.id
    });
    if (existSong) {
      const likedSong = await userModel.updateOne({
        email: req.body.email
      }, {
        $pull: {
          likedSongs: req.body.id
        }
      });
      const likedCount = await songModel.updateOne({
        _id: req.body.id
      }, {
        $set: {
          likedCount: existSong.likedCount - 1
        }
      });
      res.status(200).json({
        code: "success",
        msg:
          "Successfully unlikd a song.",
      });
    } else {
      res.status(200).json({
        code: "error",
        msg: "There are no song like this.",
      });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      code: "error",
      msg: "Server Error",
      err: err
    });
  }
})

// Save for later API
songRouter.put('/save-for-later', async (req, res) => {
  console.log(req.body)
  try {
    const existSong = await songModel.findOne({
      _id: req.body.id
    });
    if (existSong) {
      const saveForLater = await userModel.updateOne({
        email: req.body.email
      }, {
        $pull: {
          saveForLater: req.body.id
        }
      });
      console.log(saveForLater);
      res.status(200).json({
        code: "success",
        msg: "save for later.",
        user: saveForLater
      });
    } else {
      res.status(200).json({
        code: "error",
        msg: "There are no song like this.",
      });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      code: "error",
      msg: "Server Error",
      err: err
    });
  }
})


module.exports = songRouter;