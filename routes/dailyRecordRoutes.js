const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { createDailyRecord } = require("../controllers/dailyRecordController");

/**
 * @swagger
 * /api/daily-records:
 *   post:
 *     summary: Create a daily flock record
 *     tags: [Daily Records]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-08-08
 *               feedCost:
 *                 type: number
 *                 example: 15000
 *               medicationCost:
 *                 type: number
 *                 example: 5000
 *               vaccinationCost:
 *                 type: number
 *                 example: 3000
 *               cratesSold:
 *                 type: number
 *                 example: 5
 *               pricePerCrate:
 *                 type: number
 *                 example: 12000
 *               extraEggsSold:
 *                 type: number
 *                 example: 2
 *               pricePerEgg:
 *                 type: number
 *                 example: 500
 *               mortality:
 *                 type: number
 *                 example: 3
 *     responses:
 *       201:
 *         description: Daily record created successfully
 *       400:
 *         description: Invalid daily record data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No active flock found
 *       500:
 *         description: Failed to create daily record
 */
router.post("/", protect, createDailyRecord);

module.exports = router;
