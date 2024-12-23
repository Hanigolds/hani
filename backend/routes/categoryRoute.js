const express = require("express");
const {
  deleteCategory,
  createCategory,getCategories,getCategory
} = require("../controllers/Category");
const router = express.Router(); // Corrected this line

// todo register a new user

router.post("/create-category", createCategory);
router.get("/get-all-category", getCategories);
router.delete("/delete-category/:id", deleteCategory);
// router.post("/login", loginController);

module.exports = router;
