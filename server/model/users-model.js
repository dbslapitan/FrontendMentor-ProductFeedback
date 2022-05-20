const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const Schema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    require: [true, 'Username is Required.'],
    unique: true,
  },
  image: String,
  password: {
    type: String,
    required: [true, 'Password is Required.']
  },
  dateCreated: {
    type: Date,
      default: Date.now()
  }
});

Schema.pre('save', async function(next) {
  if(!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const schema = mongoose.model('User', Schema);

module.exports = schema;