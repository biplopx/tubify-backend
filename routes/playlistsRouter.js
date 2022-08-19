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

        const n = previousPlayListSongs.flat()
        // console.log(n)
        if (previousPlayListName.includes(customPlayListName)) {
            if (n.includes(songId)) {
                res.send({ message: "song already exist" })
            }

            previousPlayList.map(async playlist => {
                const [...songs] = playlist.songs;
                songs.push(songId);
                console.log(playlist)
                await user.save();
                return res.status(200).json({ status: "add successful" });
            });

        }
        else {
            const newPlaylist = user.playlist.push(customPlayList);
            const result = await user.save(newPlaylist);
            res.status(200).json({ status: "successful" });
        };
    } catch (err) {
        res.send(err)
    }

})


module.exports = playlistsRouter;
