// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
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
  photo:{
    data:Buffer,
    contentType:String
  },  
    // Store photo path here, not the image
},{
  timestamps:true
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
// const ProductSchema =  new mongoose.Schema({
//   name:{
//       type:String,
//       required:true
//   },
//   slug:{
//       type:String,
//       required:true
//   },
//   description:{
//       type:String,
//       required:true
//   },
//   price:{
//       type:Number,
//       required:true
//   },
//   category:{
//       type:mongoose.ObjectId,
//       ref:"Category",
//       required:true
//   },
//   quantity:{
//       type:Number,
//       required:true
//   },
 
    
//   shipping:{
//       type:Boolean,
//   }

// },{timestamps:true})


// module.exports =mongoose.model("Product",ProductSchema)
