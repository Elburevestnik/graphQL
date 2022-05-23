const mongoose = require('mongoose');
const ObjectId = require('mongoose').ObjectId;
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: String,
    genre: String,
    directorId: ObjectId,
    rate: Number,
    watched: Boolean
})

module.exports = mongoose.model('Movie', movieSchema);