// models/Photo.js
const mongoose = require('mongoose');

const goldSchema = new mongoose.Schema({
  rate:{
    type:Number
  },
  extra:{
    type:Number
  }
},{
    timestamps:true
});

module.exports = mongoose.model('Gold', goldSchema);
