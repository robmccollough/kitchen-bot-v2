const mongoose = require('mongoose')

const LatePlate = mongoose.model('LatePlate', new mongoose.Schema({
  created_at: {
    type: Date,
    required: [true, 'Date created is required']
  },
  recipient: {
      type: String,
      required: [true, 'Late plate recipient required']
  },
  created_by: {
    type: String,
    required: false
  },
  complete : {
      type: Boolean,
      required: true
  },
  food: {
      type: String,
      required: false
  }
}), 'lateplates');

module.exports = LatePlate;