const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/usersModel');
const playlistsRouter = express.Router();

playlistsRouter.put('/:id', async (req, res) => {
    const songId = req.params.id;
    const userId = req.body.userId;
    const customPlayListName = "happy";
    try {
        const user = await User.findById(userId);
        const customPlayList = {
            name: customPlayListName,
            songs: [songId,]
        }
        const previousPlayList = user.playlist;
        const previousPlayListName = previousPlayList.map(playlist => playlist.name);
        const previousPlayListSongs = previousPlayList.map(playlist => playlist.songs);
        const flatArray = previousPlayListSongs.flat()
        if (previousPlayListName.includes(customPlayListName)) {
            if (flatArray.includes(songId)) {
                return res.status(200).send({ message: "song already exist" })
            }
            else {
                // mongooose replace array element
                const index = previousPlayListName.indexOf(customPlayListName);
                const savePlayList = previousPlayList[index].songs.push(songId);
                const result = await User.findByIdAndUpdate(userId, { playlist: previousPlayList });
                return res.status(200).send({ message: "song added to custom playlist" })
            }
        }
        else {
            const newPlaylist = user.playlist.push(customPlayList);
            const result = await user.save(newPlaylist);
            res.status(201).json({ status: "successful create playlist " });
        };
    } catch (err) {
        res.send(err)
    }
})
module.exports = playlistsRouter;