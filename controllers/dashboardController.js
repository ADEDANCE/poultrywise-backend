const { getDashboardSummary } = require("../services/dashboardService");

const dashboardSummary = async (req, res) => {
  try {
    // Calling the service
    const summary = await getDashboardSummary(req.user._id);
    // Returning the response
    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({
      message: "Failed to load dashboard",
      error: error.message,
    });
  }
};

module.exports = {
  dashboardSummary,
};
