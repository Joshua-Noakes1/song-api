// Loading express, express router, our userauth middleware and our mongoose user model
const express = require('express');
const router = express.Router();
const userAuth = require('../../authentication/users/check-user-auth');
const Users = require('../../models/users/users');

// we accept a get request to /users/lookup for this 
router.get('/', userAuth, (req, res, next) => {
    Users.find({
        // finds a user based on their username from the body
        username: req.body.username
    })
        .then(user => {
            if (user) {
                // if we find the user we grab all their data and send it our through a 200 web request
                res.status(200).json({
                    username: user[0].username,
                    score: user[0].score,
                    games: user[0].games
                })
            } else {
                // if we dont we just say 404
                res.status(404).json({
                    message: 'Not Found'
                })
            }
        })
        // no errors i dont want them 
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