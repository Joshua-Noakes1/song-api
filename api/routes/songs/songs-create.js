// Loading express, express router, mongoose, userauth middleware and our mongoose song model
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userAuth = require('../../authentication/users/check-user-auth');
const Songs = require('../../models/songs/songs');

// we accept a post request to /songs/create
router.post('/', userAuth, (req, res, next) => {
    // we look for a song with that name 
    Songs.find({
            song: req.body.song
        })
        .exec()
        .then(songs => {
            // if it exists we error out with a 409
            if (songs.length >= 1) {
                return res.status(409).json({
                    error: "Song already exists",
                    error_desc: "SON_CONF",
                    error_code: 409
                });
            } else {
                // we build a json obj for it 
                const song = new Songs({
                    _id: mongoose.Types.ObjectId(),
                    // from the body of the request 
                    song: req.body.song,
                    artist: req.body.artist
                });
                // get mongoose to save it ^^
                song.save()
                    .then(song => {
                        // send a 201 and tell them its made
                        res.status(201).json({
                            message: "Song created successfuly",
                            message_desc: "SON_CRE_SUCC",
                            message_code: 201
                        })
                    })
                    // errors that all your getting
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err,
                            error_desc: "Internal server error",
                            error_code: 500
                        });
                    });
            }
        })
});

module.exports = router;