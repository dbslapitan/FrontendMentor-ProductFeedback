const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  });

const schema = mongoose.model('Comment', Schema);

module.exports = schema;