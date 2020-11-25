// Loading express, express router, bcrypt, our userauth middleware and our mongoose user model
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../../models/users/users');

// we accept a post request to /users/create
router.post('/', (req, res, next) => {
    // we look for any uses with that name from the body of users 
    User.find({
            username: req.body.username
        })
        .exec()
        .then(users => {
            // if we find a user we error out with a 409 and tell them that it already exists 
            if (users.length >= 1) {
                return res.status(409).json({
                    error: "Username already exists",
                    error_desc: "USR_CONF",
                    error_code: 409
                });
            } else {
                // if we dont find a user we start the bcrypt hash feature to make a hashed password
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    // if something goes wrong bcrypt we just 500 error out 
                    if (err) {
                        res.status(500).json({
                            error: err
                        });
                    } else {
                        /* if noting goes wrong we contine 
                        we take their username and store it as a const*/
                        const username = req.body.username;
                        // we use the god forsaken regex to remove all spaces 
                        const regexUsername = username.replace(/\s+/g, '');
                        // we create new user in the db
                        const user_data = new User({
                            _id: mongoose.Types.ObjectId(),
                            username: regexUsername,
                            password: hash
                        });
                        // we ask mongoose to save all that data 
                        user_data.save()
                            .then(users => {
                                // we 201 and tell the user it was made successfuly and we send their username incase they used a space 
                                res.status(201).json({
                                    message: `User created successfuly with the username \'${regexUsername}\'`,
                                    message_desc: "USR_CRE_SUCC",
                                    message_code: 200
                                });
                            })
                            // no i dont want errors
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err,
                                    error_desc: "Internal server error",
                                    error_code: 500
                                });
                            });
                    }
                });
            }
        });
});

module.exports = router;