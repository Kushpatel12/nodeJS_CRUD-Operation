const mongoose = require('mongoose');
require('dotenv').config();

// define the MongoDB connection URL and Database name
// const mongoURL = process.env.DB_URL_LOCAL; // Local db 
const mongoURL = process.env.DB_URL; // online db of atlas

// setup the mongoDB connection
mongoose.connect(mongoURL, {
  // useNewUrlParser : true,
  // useUnifiedTopology : true
})

// get the default connection
const db = mongoose.connection;

// define the event listeners for database connection
db.on('connected',() => {
  console.log('Connected to MongoDB server');
});



db.off('disconnected',() => {
  console.log('MongoDB disconnected');
});

module.exports = db;