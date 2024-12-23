const multer = require("multer");
const path = require("path");
const formidable = require('formidable');
// const Image = require("../models/Image");
const fs = require("fs");
const Photo = require("../models/Photo");
// todo Initialize multer with the storage configuration

const addPhotoController = (req, res) => {
  const form = new formidable.IncomingForm();
  
  
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ success: false, msg: 'Error parsing the files.' });
    }

    const photoFile = files.photo; // Access the uploaded file

    if (!photoFile) {
      return res.status(400).json({ success: false, msg: 'No file uploaded.' });
    }

    try {
      const photo = {
        data: fs.readFileSync(photoFile.path), // Read the file data
        contentType: photoFile.type, // Get the file type
      };

      const newPhoto = new Photo(photo);
      await newPhoto.save();

      res.status(201).json({ success: true, msg: 'Photo saved successfully' });
    } catch (error) {
      console.error('Error saving image:', error);
      res.status(500).json({ success: false, msg: 'Error saving photo' });
    }
  });
};

const photosController = async (req, res) => {
  try {
    const allPhotos = await Photo.find({});
    // Convert binary data to Base64 format
    const photosWithBase64 = allPhotos.map((photo) => ({
      _id: photo._id,
      contentType: photo.contentType,
      data: photo.data.toString('base64'), // Convert binary data to Base64
    }));
    res.json({ success: true, allPhotos: photosWithBase64 });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ success: false, msg: 'Error fetching images' });
  }
}
const deletePhotoController = async (req, res) => {
  try {
    const { id } = req.params;
   

    // Find the photo by ID
    const photo = await Photo.findById(id);
    if (!photo) {
      return res.status(404).json({ success: false, msg: 'Photo not found' });
    }

    // Optional: Delete the file from the filesystem if saved locally
    if (photo.path) {
      fs.unlink(photo.path, (err) => {
        if (err) {
          console.error('Error deleting file from filesystem:', err);
        }
      });
    }

    // Delete the photo document from MongoDB
    await Photo.findByIdAndDelete(id);

    res.status(200).json({ success: true, msg: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Error deleting photo:', error);
    res.status(500).json({ success: false, msg: 'Error deleting photo' });
  }
};
module.exports = {
  addPhotoController,
  photosController,deletePhotoController
  // imagesController,
  // deleteController,
  // images,
};
