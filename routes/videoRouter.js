const express = require("express");
const mongoose = require("mongoose");
const videoModel = require("../models/videoModel");
const userModel = require("../models/usersModel");
const videoRouter = express.Router();

// get all song
videoRouter.get("/all-videos", async (req, res) => {
  const result = await videoModel.find({});
  res.send(result.reverse());
});

// Single Video Route
videoRouter.get("/single-video/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const video = await videoModel.findById({ _id: id });
    res.send(video);
  } catch {
    res.send("Video not found");
  }
});

// Add Video
videoRouter.post("/add-video", async (req, res) => {
  const newVideo = req.body;
  try {
    await videoModel.create(newVideo);
    res.status(200).json({ status: "successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//  Delete song by id
videoRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Item not found" });
  }
  try {
    await videoModel.deleteOne({ _id: id });
    res.status(200).json({ status: "successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//  Edit video by id
videoRouter.patch("/edit/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Item not found" });
  }
  try {
    const video = await videoModel.findById({ _id: id });
    Object.assign(video, req.body);
    await video.save();
    res.status(200).json({ status: "successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



module.exports = videoRouter;
