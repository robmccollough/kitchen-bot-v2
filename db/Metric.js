const mongoose = require('mongoose')
//this will just be a single item for now
const Metric = mongoose.model('Metric', new mongoose.Schema({
  counts: {
      type: String,
      menu: {
          type: Number
      },
      lateplate: {
          type: Number
      },
      dinner: {
          type: Number
      }
  }
}), 'metrics');

module.exports = Metric;