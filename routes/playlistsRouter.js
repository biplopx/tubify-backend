const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/usersModel');
const Playlist = require('../models/playListModal');
const playlistsRouter = express.Router();

// playlistsRouter.put('/:id', async (req, res) => {
//     const songId = req.params.id;
//     const userId = req.body.userId;
//     const customPlayListName = req.body.playlistName;
//     try {
//         const user = await User.findById(userId);
//         const customPlayList = {
//             name: customPlayListName,
//             songs: [songId,]
//         }
//         const previousPlayList = user.playlist;
//         const previousPlayListName = previousPlayList.map(playlist => playlist.name);
//         const previousPlayListSongs = previousPlayList.map(playlist => playlist.songs);
//         const flatArray = previousPlayListSongs.flat()
//         if (previousPlayListName.includes(customPlayListName)) {
//             if (flatArray.includes(songId)) {
//                 return res.status(200).send({ message: "song already exist" })
//             }
//             else {
//                 // mongooose replace array element
//                 const index = previousPlayListName.indexOf(customPlayListName);
//                 const savePlayList = previousPlayList[index].songs.push(songId);
//                 const result = await User.findByIdAndUpdate(userId, { playlist: previousPlayList });
//                 return res.status(200).send({ message: "song added to custom playlist" })
//             }
//         }
//         else {
//             const newPlaylist = user.playlist.push(customPlayList);
//             const result = await user.save(newPlaylist);
//             res.status(201).json({ status: "successful create playlist " });
//         };
//     } catch (err) {
//         res.send(err)
//     }
// })
playlistsRouter.put('/:id', async (req, res) => {
    const songId = req.params.id;
    const userId = req.body.userId;
    const customPlayListName = req.body.playlistName;
    try {
        const user = await User.findById(userId).populate('playlist');
        const existPlaylist = await Playlist.findOne({ name: customPlayListName }).populate('songs');
        // console.log(user.playlist)
        const existPlaylistInUser = user.playlist.find(list => list.name === customPlayListName)
        // console.log(existPlaylist)
        // console.log(user.playlist.includes(existPlaylist))
        // console.log(user)
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
            console.log(customPlayListName)
            const newPlaylist = await Playlist.create({ name: customPlayListName, songs: [songId] })

            console.log(newPlaylist);
            const updatedUser = await User.updateOne({ _id: userId }, {
                $push: { playlist: newPlaylist._id }
            });
            return res.status(201).json({ status: "successful create playlist " });
        }
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})
module.exports = playlistsRouter;