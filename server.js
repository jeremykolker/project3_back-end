//___________________
//Dependencies
//___________________
const express = require('express');
const mongoose = require ('mongoose');
const Movies = require('./models/movies')
const app = express ();
const db = mongoose.connection;
const cors = require('cors')
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
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

app.use(cors())
//___________________
// Routes
//___________________
//localhost:3000
// app.get('/' , (req, res) => {
//   res.send('Hello World!');
// });

//CREATE
app.post('/movies', (req,res) => {
  Movies.create(req.body) 
  .then((createdMovie) => {
    res.json(createdMovie)
  })
})

//READ
app.get('/movies', (req, res) => {
  Movies.find({})
  .then((foundMovie) => {
    res.json(foundMovie)
  })
})

//UPDATE
app.put('/movies/:id', (req, res) => {
  Movies.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then((updatedMovie) => res.json(updatedMovie))
})

//DELETE
app.delete('/movies/:id', (req, res) => {
  Movies.findByIdAndRemove(req.params.id)
  .then((deletedMovie) => {
    res.json(deletedMovie)
  })
})

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));












