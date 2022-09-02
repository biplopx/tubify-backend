const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/usersModel');
const Playlist = require('../models/playListModal');
const playlistsRouter = express.Router();

playlistsRouter.put('/:id', async (req, res) => {
    const songId = req.params.id;
    const userId = req.body.userId;
    const customPlayListName = req.body.playlistName;
    try {
        const user = await User.findById(userId).populate('playlist');
        const existPlaylist = await Playlist.findOne({ name: customPlayListName }).populate('songs');
        const existPlaylistInUser = user.playlist.find(list => list.name === customPlayListName)
        if (existPlaylist && existPlaylistInUser) {
            // Check song exits
            const existSongInPlaylist = existPlaylist.songs.find(song => song._id == songId)
            if (existSongInPlaylist) {
                return res.status(200).send({ message: "song already exist" })
            } else {
                const updatedPlaylist = await Playlist.updateOne({ name: customPlayListName }, {
                    $push: { songs: songId }
                });
                return res.status(200).send({ message: "song added to custom playlist" })
            }

        }
        else {
            const newPlaylist = await Playlist.create({ name: customPlayListName, songs: [songId] })
            const updatedUser = await User.updateOne({ _id: userId }, {
                $push: { playlist: newPlaylist._id }
            });
            return res.status(201).json({ status: "successful create playlist " });
        }
    } catch (err) {
        res.send(err)
    }
})
module.exports = playlistsRouter;