// importing the Express package.
const express = require("express");

// creates a router
const router = express.Router();

// importing registerUser 
const { registerUser } = require("../controllers/authController");

router.post("/register", registerUser);

module.exports = router;