const mongoose = require('mongoose')

const User = mongoose.model('User', new mongoose.Schema({
  created_at: {
    type: Date,
    default: Date.now()
  },
  role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
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