const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    poster_path: String,
    title: String,
    release_date: String,
    overview: String,
<<<<<<< HEAD
    vote_average: Number,
    
=======
    vote_average: Number
>>>>>>> 2d4bdfa66ca65b97a2eac22b67101cd24e292ca3
})

const Movies = mongoose.model('Movies', movieSchema)

module.exports = Movies