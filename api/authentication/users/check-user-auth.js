// we load json web tokem
const jwt = require('jsonwebtoken');

// we make an export
module.exports = (req, res, next) => {
    try {
        // we try to seperate the token from the word Bearer 
        const token = req.headers.authorization.split(" ")[1];
        // we decide the token using our key
        const decoded = jwt.verify(token, '//accept the jwt key here');
        // we then succedd and we are good and we continue 
        req.userData = decoded
        next();
    } catch (error) {
        // if an error occures we give a 401 and fail 
        return res.status(401).json({
            error: "Authentication failure",
            error_desc: "AUTH_FAIL",
            error_code: 401
        });
    }
};