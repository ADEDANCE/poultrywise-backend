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

/**
 * @swagger
 * /api/flocks:
 *   post:
 *     summary: Create a new flock
 *     tags: [Flocks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - batchID
 *               - numberOfBirds
 *               - breed
 *               - dateReceived
 *               - supplier
 *               - initialCost
 *             properties:
 *               batchID:
 *                 type: string
 *                 example: PW-001
 *               numberOfBirds:
 *                 type: number
 *                 example: 1000
 *               breed:
 *                 type: string
 *                 example: ISA Brown
 *               dateReceived:
 *                 type: string
 *                 format: date
 *                 example: 2026-08-01
 *               supplier:
 *                 type: string
 *                 example: ABC Poultry Farm
 *               initialCost:
 *                 type: number
 *                 example: 500000
 *     responses:
 *       201:
 *         description: Flock created successfully
 *       400:
 *         description: Farmer already has an active flock
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to create flock
 */
router.post("/", protect, createFlock);

/**
 * @swagger
 * /api/flocks:
 *   get:
 *     summary: Get the farmer's active flock
 *     tags: [Flocks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Active flock returned successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No active flock found
 *       500:
 *         description: Failed to get active flock
 */
router.get("/", protect, getActiveFlock);

/**
 * @swagger
 * /api/flocks/stage:
 *   patch:
 *     summary: Update the current flock stage
 *     tags: [Flocks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentStage
 *             properties:
 *               currentStage:
 *                 type: string
 *                 enum:
 *                   - brooding
 *                   - grower
 *                   - layer
 *                 example: grower
 *     responses:
 *       200:
 *         description: Flock stage updated successfully
 *       400:
 *         description: Invalid flock stage
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No active flock found
 *       500:
 *         description: Failed to update flock stage
 */
router.patch("/stage", protect, updateFlockStage);

/**
 * @swagger
 * /api/flocks/complete:
 *   patch:
 *     summary: Complete the active flock
 *     tags: [Flocks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Flock completed successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No active flock found
 *       500:
 *         description: Failed to complete flock
 */
router.patch("/complete", protect, completeFlock);

/**
 * @swagger
 * /api/flocks/history:
 *   get:
 *     summary: Get completed flock history
 *     tags: [Flocks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Completed flock history returned successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to get flock history
 */
router.get("/history", protect, getFlockHistory);

module.exports = router;
