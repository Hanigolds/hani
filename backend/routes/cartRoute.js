const express = require("express");
const {
  addCartController,
  cartController,
  cartConformedController
} = require("../controllers/Cart");
const router = express.Router();

// Route for adding a new product with photo uploads
router.post("/newcart", addCartController); // Using the same endpoint for upload and creation
router.get("/allcart", cartController); // Using the same endpoint for upload and creation
router.delete("/conformed/:id/:cartid", cartConformedController); // Using the same endpoint for upload and creation
// router.get("/filterproduct/:category", filterController); // Using the same endpoint for upload and creation
// router.get("/filtersub/:subcategory", filterSubController); // Using the same endpoint for upload and creation

module.exports = router;
