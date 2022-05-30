const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  sort: {
    type: Number,
    default: 0
  },
  filter: {
    type: String,
    default: 'All'
  },
  userId: {
    type: String,
    required: true,
    unique: true
  }
});

const schema = mongoose.model('Historyd', Schema);

module.exports = schema;