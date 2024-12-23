const express = require("express");
const {
    deleteRate,
  createRate,readsRate
} = require("../controllers/Gold");
const router = express.Router(); // Corrected this line

// todo register a new user

router.post("/create", createRate);
router.get("/gets", readsRate);

router.delete("/delete/:id", deleteRate);

module.exports = router;
