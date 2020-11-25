// load mongoose
const mongoose = require('mongoose');

// the song schema for the songs in the db
const songsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    song:{
        type: String,
        required: true
    },
    artist: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Songs', songsSchema);