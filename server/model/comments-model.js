const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  comment: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  feedbackId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  replies: [{
    dateCreated: {
      type: Date,
      default: Date.now()
    },
    extension: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    reply: {
      type: String,
      required: true
    },
    replyTo: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  }],
  extension: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  }
  });

const schema = mongoose.model('Comment', Schema);

module.exports = schema;