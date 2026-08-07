const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createFlock,
  getActiveFlock,
  updateFlockStage,
  completeFlock,
  getFlockHistory,
} = require("../controllers/flockController");

router.post("/", protect, createFlock);
router.get("/", protect, getActiveFlock);
router.patch("/stage", protect, updateFlockStage);
router.patch("/complete", protect, completeFlock);
router.get("/history", protect, getFlockHistory);

module.exports = router;
