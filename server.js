//___________________
//Dependencies
//___________________
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Movies = require('./models/movies')
const app = express();
const db = mongoose.connection;
require('dotenv').config()
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT
//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI)

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({
    extended: false
})); // extended: false - does not allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON - may or may not need it depending on your project

app.use(cors())
//___________________
// Routes
//___________________
// CREATE a movie
app.post('/movies', (req, res) => {
    Movies.create(req.body)
        .then((createdMovie) => {
            res.json(createdMovie)
        })
})

// READ all movies
app.get('/movies', (req, res) => {
    Movies.find({})
        .then((foundMovies) => {
            res.json(foundMovies)
        })
})

// READ watchlist movies
app.get('/watchlist', (req, res) => {
    Movies.find({
            watchlist: true
        })
        .then((foundMovies) => {
            res.json(foundMovies)
        })
})

// UPDATE a movie
app.put('/movies/:id', (req, res) => {
    Movies.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        .then((updatedMovie) => res.json(updatedMovie))
})

// DELETE a movie from watchlist
app.delete('/watchlist/:id', (req, res) => {
    Movies.findByIdAndUpdate(req.params.id, {
            $set: {
                watchlist: false
            }
        }, {
            new: true
        })
        .then((updatedMovie) => res.json(updatedMovie))
})

// ADD a movie to watchlist
app.post('/watchlist/:id', (req, res) => {
    Movies.findByIdAndUpdate(req.params.id, {
            $set: {
                watchlist: true
            }
        }, {
            new: true
        })
        .then((updatedMovie) => res.json(updatedMovie))
})

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log('Listening on port:', PORT));
