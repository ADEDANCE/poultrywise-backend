// importing the Express package.
const express = require("express");

// creates a router
const router = express.Router();

// importing registerUser & loginuser
const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;