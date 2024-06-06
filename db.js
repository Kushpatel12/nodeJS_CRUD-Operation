const mongoose = require('mongoose');

// define the MongoDB connection URL and Database name
const mongoURL = 'mongodb://localhost:27017/hotels';

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