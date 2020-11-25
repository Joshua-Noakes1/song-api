// Loading express, express router, userauth middleware and our mongoose song model
const express = require('express');
const router = express.Router();
const userAuth = require('../../authentication/users/check-user-auth');
const Songs = require('../../models/songs/songs');

// we accept a delete request to /songs/remove
router.delete('/', userAuth, (req, res, next) => {
    // we look for song in the db by its name
    Songs.deleteMany({
            song: req.body.song
        })
        .exec()
        .then(user => {
            // we remove it 
            res.status(200).json({
                message: 'Song Deleted',
                message_desc: 'SON_REM',
                message_code: 200
            })
        })
        // i dont know how many time i have to say this but no errors we dont want them 
        .catch(err => {
            res.status(500).json({
                message: err,
                message_code: 500
            })
        });
});

module.exports = router;