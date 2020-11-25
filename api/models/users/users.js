// we load mongoose
const mongoose = require('mongoose');

// the db schema model for uses 
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    games: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('User', userSchema);