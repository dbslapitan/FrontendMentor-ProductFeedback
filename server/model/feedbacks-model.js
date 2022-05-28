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
      type: [String],
      required: true,
      default: []
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
    },
    comments: {
      type: Number,
      default: 0
    }
  });

const schema = mongoose.model('Feedback', Schema);

module.exports = schema;