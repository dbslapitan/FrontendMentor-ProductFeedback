const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title: String,
    category: String,
    upvotes: Number,
    status: String,
    description: String,
    dateCreated: {
      type: String,
      default: new Date().toISOString()
    }
  });

const schema = mongoose.model('Feedback', Schema);

module.exports = schema;