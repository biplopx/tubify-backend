const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/usersModel');
const songModel = require('../models/songModel');
const playlistsRouter = express.Router();

playlistsRouter.post('/:id', async (req, res) => {
    const songId = req.params.id;
    const userId = req.body.userId;
    const customPlayListName = "sad";
    try {
        const user = await User.findById(userId);
        const customPlayList = {
            name: customPlayListName,
            songs: [songId]
        }
        const previousPlayList = user.playlist;
        const previousPlayListName = previousPlayList.map(playlist => playlist.name);

        const previousPlayListSongs = previousPlayList.map(playlist => playlist.songs);

        const flatSongs = previousPlayListSongs.flat()

        // console.log(n)
        if (previousPlayListName.includes(customPlayListName)) {
            if (flatSongs.includes(songId)) {
                return res.send({ message: "song already exist" })
            } else {
                const song = user.playlist.find(playlist => playlist.name === customPlayListName)
                song.songs.push(songId)
                console.log(song.songs)
                user.save(song);
                res.status(200).json({ status: "add successful" });
            }

        }
        else {
            const newPlaylist = user.playlist.push(customPlayList);
            const result = await user.save(newPlaylist);
            return res.status(200).json({ status: "successful" });
        };
    } catch (err) {
        res.send(err)
    }

})
module.exports = playlistsRouter;
