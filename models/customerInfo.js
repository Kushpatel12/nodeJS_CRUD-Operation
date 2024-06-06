const mongoose = require('mongoose');

const custInfo = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  address: {
    type: String,
  },
  good: {
    type: Boolean,
    required: true,
    default: false
  }
});

const customerInfo = mongoose.model('custerInfo',custInfo);
module.exports = customerInfo;