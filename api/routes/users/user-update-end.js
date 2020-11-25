// Loading express, express router, our userauth middleware and our mongoose user model
const express = require('express');
const router = express.Router();
const userAuth = require('../../authentication/users/check-user-auth');
const User = require('../../models/users/users');

// accepts a patch request to /users/update/end
router.patch('/', userAuth, (req, res, next) => {
    // finding the username to update from the body
    const username = req.body.username;
    User.update({
        // selecting from the db 
            username: username
        }, {
            // updating the score element
            score: req.body.score
        }, {
            // updating the games element
            games: req.body.games
        })
        // full promise callback 
        .exec()
        .then(users => {
            res.status(200).json({
                // json 200 status saying we've updated okay 
                message: "Updated games and score",
                message_desc: "USR_UPDF_SUCC",
                message_code: 200
            });
        })
        // any errors (no pls no errors)
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
                error_code: 500
            })
        });
});

module.exports = router;