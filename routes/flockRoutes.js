const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { createFlock } = require("../controllers/flockController");

router.post("/", protect, createFlock);

module.exports = router;