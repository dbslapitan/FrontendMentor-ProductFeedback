const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    userID:  {
      type: String,
      required: true
    },
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
      default: "Planned"
    },
    details: {
      type: String,
      required: true
    },
    dateCreated: {
      type: Date,
      default: Date.now()
    }
  });

const schema = mongoose.model('Feedback', Schema);

module.exports = schema;