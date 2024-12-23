// models/Product.js
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  conformedId:{
    type: String,
  },
  category: {
    type: String,
  },
  subCategory: {
    type: String,
  },
  designName: { type: String },
  remark: { type: String },
  grossWeight: {
    type: String,
  },
  netWeight: {
    type: String,
  },
  purity: String,
 
  userName: {
    type: String,
  },
  userMobile: {
    type: String,
  },

  // Store photo path here, not the image
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
