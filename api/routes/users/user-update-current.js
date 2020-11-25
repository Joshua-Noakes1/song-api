// Loading express, express router, our userauth middleware and our mongoose user model
const express = require('express');
const router = express.Router();
const userAuth = require('../../authentication/users/check-user-auth');
const User = require('../../models/users/users');

// accepts a patch request to /users/update/
router.patch('/', userAuth, (req, res, next) => {
    const username = req.body.username;
    // finding the username to update from the body
    User.update({
        // selecting from the db
            username: username
        }, {
            // updating the score
            score: req.body.score
        })
        // full promise callback
        .exec()
        .then(users => {
            res.status(200).json({
                // json 200 status saying we've updated okay 
                message: "Updated score",
                message_desc: "USR_UPDH_SUCC",
                message_code: 200
            });
        })
        // pls no errors no 
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
                error_code: 500
            })
        });
});

module.exports = router;