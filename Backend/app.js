// MongoDB PW: uhk2DY49rHRNnas
// MongoDB Connection: mongodb+srv://<username>:<password>@cluster0.3hxcg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

// import express
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const saucesRoute = require('./routes/saucesRoute');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb+srv://Attila:uhk2DY49rHRNnas@cluster0.3hxcg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

// CORS - Cross Origin Resource Sharing, Allows all requests from all origins to access API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Convert the body to json object because we are receiving json from frontend
app.use(bodyParser.json());

// Set static folder and files
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', saucesRoute);
app.use('/api/auth', userRoutes);


// exporting app (we can access to it from outside this js file)
module.exports = app;