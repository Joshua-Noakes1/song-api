// Loading express, express router, json web tokens, bcrypt, our userauth middleware and our mongoose user model
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/users/users');

// we accept a post request to /users/login
router.post('/', (req, res, next) => {
    User.find({
        // we find the user in the db and grab their info 
            username: req.body.username
        })
        .exec()
        .then(users => {
            // if we cant find a user with that name we just 401
            if (users.length < 1) {
                return res.status(401).json({
                    error: "Authentication failure",
                    error_desc: "AUTH_FAIL",
                    error_code: 401
                });
            }
            // bcrypt hash compare functon so we know a user knows their password and its right 
            bcrypt.compare(req.body.password, users[0].password, (err, result) => {
                // if their password is incorrect we give them a 401
                if (err) {
                    res.status(401).json({
                        error: "Authentication failure",
                        error_desc: "AUTH_FAIL",
                        error_code: 401
                    });
                }
                if (result) {
                    // if its right we create a json obj with json web tokens
                    const token = jwt.sign({
                        // we take a username
                        username: users[0].username,
                        // their mongoose id 
                        _id: users[0]._id
                        // this random password 
                    }, '//accept the jwt key here', {
                        // and  a 1 hour expiry time
                        expiresIn: "1h",
                    })
                    // and we send it all to the user
                    return res.status(200).json({
                        message: "Authentication successful",
                        // json web token generated token
                        message_token: token,
                        message_desc: "AUTH_SUCC",
                        message_code: 200
                    })
                }
                // if all of that fails we just 401
                res.status(401).json({
                    error: "Authentication failure",
                    error_desc: "AUTH_FAIL",
                    error_code: 401
                });
            });
        })
        // what an error how?
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