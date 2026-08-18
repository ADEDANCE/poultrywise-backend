// import DailyRecord
const DailyRecord = require("../models/DailyRecord");

const Flock = require("../models/Flock");

const getFlockAnalytics = async (userId) => {
  // Read all daily records for the logged-in user
  const dailyRecords = await DailyRecord.find({
    user: userId,
  });

  // get active flock
  const activeFlock = await Flock.findOne({
    user: userId,
    status: "active",
  });

  // Check if an active flock exists
  if (!activeFlock) {
    return {
      message: "No active flock found",
    };
  }

  // Variables to store totals
  let totalExpenses = 0;
  let totalRevenue = 0;

  let recommendedStage;
  let totalMortality = 0;
  const BROODING_MAX_DAYS = 56;
  const GROWER_MAX_DAYS = 126;

  let stageMessage = "";

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
    totalMortality += record.mortality;
  }

  // Calculate financial summary
  const netProfit = totalRevenue - totalExpenses;

  const roi =
    totalExpenses === 0
      ? 0
      : Number(((netProfit / totalExpenses) * 100).toFixed(2));
  // Determine flock status
  const status = netProfit >= 0 ? "Profitable" : "Not Profitable";

  // Get today's date
  const today = new Date();

  // Get the flock's received date
  const receivedDate = activeFlock.dateReceived;
  // Calculate the difference
  const differenceInMilliseconds = today - receivedDate;

  // Convert to days
  const birdAgeDays = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24),
  );

  // Convert days to weeks
  const birdAgeWeeks = Math.floor(birdAgeDays / 7);

  if (birdAgeDays <= BROODING_MAX_DAYS) {
    recommendedStage = "brooding";
  } else if (birdAgeDays <= GROWER_MAX_DAYS) {
    recommendedStage = "grower";
  } else {
    recommendedStage = "layer";
  }

  const stageChangeRequired = activeFlock.currentStage !== recommendedStage;

  if (stageChangeRequired) {
    stageMessage = `Your flock is ready to move to the ${recommendedStage} stage.`;
  }

  const birdsAlive = activeFlock.numberOfBirds - totalMortality;

  const mortalityRate = Number(
    ((totalMortality / activeFlock.numberOfBirds) * 100).toFixed(2),
  );

  return {
    totalExpenses,
    totalRevenue,
    netProfit,
    roi,
    status,

    birdsAlive,
    totalMortality,
    mortalityRate,

    birdAgeDays,
    birdAgeWeeks,

    currentStage: activeFlock.currentStage,

    recommendedStage,

    stageChangeRequired,

    stageMessage,
  };
};

module.exports = {
  getFlockAnalytics,
};
