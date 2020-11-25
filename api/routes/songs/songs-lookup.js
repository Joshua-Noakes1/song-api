// Loading express, express router, userauth middleware and our mongoose song model
const express = require('express');
const router = express.Router();
const userAuth = require('../../authentication/users/check-user-auth');
const Songs = require('../../models/songs/songs');

// we accept a get request to /songs/lookup
router.get('/', userAuth, (req, res, next) => {
    Songs.find()
        // we filter out just the name and artist 
        .select('song artist')
        .exec()
        .then(songs => {
            // we make a json obj for the song data 
            const response = {
                // how many we have
                count: songs.length,
                // an array holding the data []
                songs: songs.map(songs => {
                    return {
                        // the mongoose id for it 
                        _id: songs._id,
                        song: songs.song,
                        artist: songs.artist
                    }
                })
            }
            // we send that response 
            res.status(200).json(response);
        })
        // im just going to stop saying it soon we dont want errors they are bad 
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
                error_desc: "Internal server error",
                error_code: 500
            });
        });
});

module.exports = router;