// this is also no longer used but im leaving it in incase i need it in the future 
// Loading express, express router, our userauth middleware and our mongoose user model
const express = require('express');
const router = express.Router();
const userAuth = require('../../authentication/users/check-user-auth');
const Users = require('../../models/users/users');

// we accept a get to /users/lookup (i should remove this shouldnt i?)
router.get('/', userAuth, (req, res, next) => {
    Users.find()
    // we pick the username, score and games from the users area 
        .select('username score games')
        .exec()
        .then(users => {
            // we build a response json obj 
            const response = {
                // how many overall
                count: users.length,
                // an array [] of the users 
                users: users.map(user => {
                    return {
                        _id: user._id,
                        username: user.username,
                        //password: user.password,
                        score: user.score,
                        games: user.games
                    }
                })
            }
            // send the json ^^
            res.status(200).json(response);
        })
        // i refuse to error dont do it 
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