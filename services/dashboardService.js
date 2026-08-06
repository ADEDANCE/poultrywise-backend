// import DailyRecord
const DailyRecord = require("../models/DailyRecord");

const getDashboardSummary = async (userId) => {
  // Read all daily records for the logged-in user
  const dailyRecords = await DailyRecord.find({
    user: userId,
  });

  // Check if the farmer has any records
  if (dailyRecords.length === 0) {
    return {
      totalExpenses: 0,
      totalRevenue: 0,
      netProfit: 0,
      profitMargin: 0,
      status: "No records",
    };
  }

  // Variables to store totals
  let totalExpenses = 0;
  let totalRevenue = 0;

  // Loop through every daily record
  for (const record of dailyRecords) {
    // Calculate today's expenses
    const dailyExpense =
      record.feedCost +
      record.medicationCost +
      record.vaccinationCost +
      record.electricityCost +
      record.labourCost +
      record.otherCost;

    // Add today's expense to the running total
    totalExpenses += dailyExpense;

    // Calculate today's revenue
    const dailyRevenue =
      record.cratesSold * record.pricePerCrate +
      record.extraEggsSold * record.pricePerEgg;

    // Add today's revenue to the running total
    totalRevenue += dailyRevenue;
  }

  // Calculate financial summary
  const netProfit = totalRevenue - totalExpenses;

const roi =
  totalExpenses === 0
    ? 0
    : Number(((netProfit / totalExpenses) * 100).toFixed(2));
  // Determine flock status
  const status = netProfit >= 0 ? "Profitable" : "Not Profitable";

  return {
    totalExpenses,
    totalRevenue,
    netProfit,
    roi,
    status,
  };
};

module.exports = {
  getDashboardSummary,
};
