const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { dashboardSummary } = require("../controllers/dashboardController");

/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Get the flock dashboard summary
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard summary returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalExpenses:
 *                   type: number
 *                   example: 79000
 *                 totalRevenue:
 *                   type: number
 *                   example: 28200
 *                 netProfit:
 *                   type: number
 *                   example: -50800
 *                 profitMargin:
 *                   type: number
 *                   example: -180.14
 *                 roi:
 *                   type: number
 *                   example: -64.3
 *                 status:
 *                   type: string
 *                   example: Not Profitable
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to get dashboard summary
 */
router.get("/", protect, dashboardSummary);

module.exports = router;
