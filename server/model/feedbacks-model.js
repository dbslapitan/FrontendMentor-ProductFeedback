const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    upvotes: {
      type: Number,
      required: true,
      default: 0
    },
    status: {
      type: String,
      default: 0
    },
    details: String,
    dateCreated: {
      type: Date,
      default: Date.now()
    }
  });

const schema = mongoose.model('Feedback', Schema);

module.exports = schema;