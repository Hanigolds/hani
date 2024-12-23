// models/Photo.js
const mongoose = require('mongoose');

const silverSchema = new mongoose.Schema({
  rate:{
    type:Number
  },
  extra:{
    type:Number
  }
},{
    timestamps:true
});

module.exports = mongoose.model('Silver', silverSchema);
