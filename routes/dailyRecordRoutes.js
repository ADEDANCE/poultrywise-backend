const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { createDailyRecord } = require("../controllers/dailyRecordController");

router.post("/", protect, createDailyRecord);

module.exports = router;
