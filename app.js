// loading express, morgan, bodyparse and mongoose
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// loading user routes
const userCreate = require('./api/routes/users/user-create');
/*disable lookup in production
const userLookup = require('./api/routes/users/user-lookup');*/
// yeah im aware that anyone can remove a user, look in the remove file (api/routes/users) to see the bad way in trying to stop this.
const userRemove = require('./api/routes/users/user-remove');
const userLogin = require('./api/routes/users/user-login');
const userUpdate = require('./api/routes/users/user-update-current');
const userDetail = require('./api/routes/users/users-lookup-detail');
//loading song routes
const songsCreate = require('./api/routes/songs/songs-create');
const songsLookup = require('./api/routes/songs/songs-lookup');
const songsRemove = require('./api/routes/songs/songs-remove');

// connecting to mongodb
mongoose.connect(``, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Console log of anything hitting our server 
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

// CORS correction
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// User routes 
app.use('/users/create', userCreate);
/* disabled in favour of direct lookup
app.use('/users/lookup', userLookup); */
app.use('/users/lookup/', userDetail);
app.use('/users/remove', userRemove);
app.use('/users/login', userLogin);
app.use('/users/update', userUpdate);
// Song routes
app.use('/songs/create', songsCreate);
app.use('/songs/lookup', songsLookup);
app.use('/songs/remove', songsRemove);

// Errrors 
// Handle 404 not found
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
// Handle anything else thats not a 404 now found
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});
module.exports = app;