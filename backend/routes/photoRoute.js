const express = require("express");
// const formidableMiddleware = require('express-formidable');
// const {
//   // images,
//   addImageController,
//   photosController,
//   deleteController,
// } = require("../controllers/Images");
const { addPhotoController,photosController,deletePhotoController } = require("../controllers/Photo");
const router = express.Router();

// Route for adding a new product with photo uploads
router.post("/add" ,addPhotoController); // Using the same endpoint for upload and creation
router.get("/photos", photosController); // Using the same endpoint for upload and creation
router.delete("/photo/delete/:id", deletePhotoController); // Using the same endpoint for upload and creation
// Endpoint to retrieve all images
// router.get('/api/photo', async (req, res) => {
 
// });


module.exports = router;
