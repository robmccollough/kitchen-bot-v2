const mongoose = require('mongoose')

const Menu = mongoose.model('Menu', new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now()
  },
  food: {
    monday: {
      main: {
        type: String,
        required: false
      },
      side:{
        type: String,
        required: false
      }
    },
    tuesday:{
      main: {
        type: String,
        required: false
      },
      side:{
        type: String,
        required: false
      }
    },
    wednesday: {
      main: {
        type: String,
        required: false
      },
      side:{
        type: String,
        required: false
      }
    },
    thursday: {
      main: {
        type: String,
        required: false
      },
      side:{
        type: String,
        required: false
      }
    },
    friday: {
      main: {
        type: String,
        required: false
      },
      side:{
        type: String,
        required: false
      }
    }
  }
}), 'test-menus');

module.exports = Menu;