const express = require('express');
const mongoose = require('mongoose');
const artistRouter = express.Router();
const Artist = require('../models/artistModel');

artistRouter.post('/new-artist', async (req, res) => {
        const artist = req.body
        const previousArtist = await Artist.findOne({ artistName: artist.artistName })
        if (previousArtist) {
            return res.status(400).send({ message: 'artist already exists' })
        } else {
        const newArtist = new Artist(artist)    
        const result = await newArtist.save()
        res.status(200).send({message: 'artist created'})
        }
});
artistRouter.get('/all-artist', async (req, res) => { 
    const artists = await Artist.find({})
    res.status(200).send(artists)
});

    module.exports = artistRouter;