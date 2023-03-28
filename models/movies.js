const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    poster: String,
    title: String,
    released: Number,
    plot: String,
})

const Movies = mongoose.model('Movies', movieSchema)

module.exports = Movies