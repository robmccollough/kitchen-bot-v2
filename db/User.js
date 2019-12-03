const mongoose = require('mongoose')

const User = mongoose.model('User', new mongoose.Schema({
  created_at: {
    type: Date,
    default: Date.now()
  },
  user_id: {
      type: String,
      index: true,
      unique: true
  },
  role: {
      type: String,
      enum: ['admin', 'user']
  },
  email: {
      type: String,
      required: true
  },
  password: {
      type: String,
      required: true
  }
}), 'users');

module.exports = User;