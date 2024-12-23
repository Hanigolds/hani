const express = require("express");
const {
 
  createProduct,
  getProducts,
  getProductPhoto,
  getProduct,
  deleteProduct,
  subCategory,
  category,
  filterSubCategory,
  barAndCoins,
  silver
  ,gold
} = require("../controllers/Product");
const formidable = require('express-formidable');
const router = express.Router();

// Route for adding a new product with photo uploads
router.post("/category",  filterSubCategory); // todo Using the same endpoint for upload and creation
router.post("/newproduct", formidable(), createProduct); // todo Using the same endpoint for upload and creation
router.get("/allproduct", getProducts); // ? Using the same endpoint for upload and creation
router.get("/product-photo/:pid", getProductPhoto)
router.get("/goldproduct", gold);
router.get("/barandcoins", barAndCoins);
//  // ? Using the same endpoint for upload and creation
router.get("/silverproduct", silver); // ? Using the same endpoint for upload and creation
router.get("/filtercategory/:category", category); // ! Using the same endpoint for upload and creation
router.get("/filtersubcategory/:subcategory", subCategory); // todo Using the same endpoint for upload and creation
router.get("/product/:id", getProduct); // ? Using the same endpoint for upload and creation
router.delete("/deleteproduct/:id", deleteProduct); // ? Using the same endpoint for upload and creation

module.exports = router;
