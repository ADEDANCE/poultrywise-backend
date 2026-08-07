const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createFlock,
  getActiveFlock,
  updateFlockStage,
  completeFlock,
} = require("../controllers/flockController");

router.post("/", protect, createFlock);
router.get("/", protect, getActiveFlock);
router.patch("/stage", protect, updateFlockStage);
router.patch("/complete", protect, completeFlock);

module.exports = router;
