const express = require('express');
const mongoose = require('mongoose');
const songModel = require('../models/songModel');
const userModel = require('../models/usersModel');
const albumModel = require('../models/albumModel');
const songRouter = express.Router();
// get all song
songRouter.get('/all-song', async (req, res) => {
  const result = await songModel.find({})
  res.send(result.reverse())
});

// Single Song Route
songRouter.get('/single-song/:id', async (req, res) => {
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
    const exitAlbum = await albumModel.findOne({ name: newSong.album });
    if (exitAlbum) {
      const updatedAlbum = await albumModel.updateOne({ name: newSong.album }, {
        $push: { songs: song._id }
      });
    }
    else {
      const newAlbum = await albumModel.create({ name: newSong.album, albumImg: newSong.cover, songs: [song._id] });
    }
    res.status(200).json({ status: "successful" });
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
});

//  Delete song by id 
songRouter.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Item not found" });
  }
  try {
    const findSong = await songModel.findOne({ _id: id });
    const exitAlbum = await albumModel.findOne({ name: findSong.album });
    if (exitAlbum) {
      const updatedAlbum = await albumModel.updateOne({ name: findSong.album }, {
        $pull: { songs: id }
      });
    }
    const DeleteSong = await songModel.deleteOne({ _id: id });
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
    const findSong = await songModel.findOne({ _id: id });
    const exitAlbum = await albumModel.findOne({ name: findSong.album });
    if (exitAlbum) {
      const updatedAlbum = await albumModel.updateOne({ name: findSong.album }, {
        $pull: { songs: id }
      });
    }
    const song = await songModel.findById({ _id: id })
    Object.assign(song, req.body);
    await song.save();
    const exitAlbum2 = await albumModel.findOne({ name: req.body.album });
    if (exitAlbum2) {
      const updatedAlbum2 = await albumModel.updateOne({ name: req.body.album }, {
        $push: { songs: id }
      });
    }
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
    res.status(500).json({
      code: "error",
      msg: "Server Error",
      err: err
    });
  }
})
// // Un liked song API
songRouter.put('/unlike', async (req, res) => {
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
    res.status(500).json({
      code: "error",
      msg: "Server Error",
      err: err
    });
  }
})

// Save for later API
// songRouter.put('/save-for-later', async (req, res) => {
//   try {
//     const existSong = await songModel.findOne({
//       _id: req.body.id
//     });
//     if (existSong) {
//       const saveForLater = await userModel.updateOne({
//         email: req.body.email
//       }, {
//         $pull: {
//           saveForLater: req.body.id
//         }
//       });
//       res.status(200).json({
//         code: "success",
//         msg: "save for later.",
//         user: saveForLater
//       });
//     } else {
//       res.status(200).json({
//         code: "error",
//         msg: "There are no song like this.",
//       });
//     }
//   } catch (err) {
//     res.status(500).json({
//       code: "error",
//       msg: "Server Error",
//       err: err
//     });
//   }
// })

// Get album
songRouter.get('/albums', async (req, res) => {
  const albums = await songModel.find({}).select('album')
  res.send(albums)
})

module.exports = songRouter;