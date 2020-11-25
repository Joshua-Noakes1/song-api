// Loading express, express router, our userauth middleware and our mongoose user model
const express = require('express');
const router = express.Router();
const userAuth = require('../../authentication/users/check-user-auth');
const User = require('../../models/users/users');

// accepts a delete request to /users/remove
router.delete('/', userAuth, (req, res, next) => {
    /* okay so im aware of how easy this is to defeat but i mean is anyone going to look at this code?
        so if we get a headder of login and it has hey! we know its me and we delete the user
        this is really bad but okay i really dont want to re hash the password or compare
    */
    if (req.headers.login != 'hey!') {
        return res.status(401).json({
            error: "Authentication failure",
            error_desc: "AUTH_FAIL",
            error_code: 401
        });
    } else {
        User.deleteMany({
            // removing the user with the same users as the one in the body
                username: req.body.username
            })
            // full promise callback
            .exec()
            .then(user => {
                // 200 status to say were good to go 
                res.status(200).json({
                    message: 'User Deleted',
                    message_desc: 'USR_REM',
                    message_code: 200
                })
            })
            // no errors no
            .catch(err => {
                res.status(500).json({
                    message: err,
                    message_code: 500
                })
            });
    }
});

module.exports = router;