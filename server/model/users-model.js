const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    require: [true, 'Username is Required.'],
    unique: true
  },
  image: String
});

const user = mongoose.model('User', userSchema);

module.exports = user;