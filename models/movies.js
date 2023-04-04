const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    poster_path: String,
    title: String,
    release_date: String,
    overview: String,
    vote_average: Number,
    

})

const Movies = mongoose.model('Movies', movieSchema)

module.exports = Movies
