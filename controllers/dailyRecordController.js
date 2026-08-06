const DailyRecord = require("../models/DailyRecord");
const Flock = require("../models/Flock");

const createDailyRecord = async (req, res) => {
  try {
    const {
      date,

      mortality,

      feedBagsUsed,
      feedCost,

      medication,
      medicationCost,

      vaccination,
      vaccinationCost,

      electricityCost,
      labourCost,

      otherCost,
      otherCostDescription,

      cratesCollected,
      extraEggsCollected,

      brokenEggs,

      cratesSold,
      extraEggsSold,

      pricePerCrate,
      pricePerEgg,

      notes,
    } = req.body;

    // Find the user's active flock
    const flock = await Flock.findOne({
      user: req.user._id,
      status: "active",
    });

    if (!flock) {
      return res.status(404).json({
        message: "No active flock found",
      });
    }

    // Create daily record
    const dailyRecord = await DailyRecord.create({
      user: req.user._id,
      flock: flock._id,

      date,

      mortality,

      feedBagsUsed,
      feedCost,

      medication,
      medicationCost,

      vaccination,
      vaccinationCost,

      electricityCost,
      labourCost,

      otherCost,
      otherCostDescription,

      cratesCollected,
      extraEggsCollected,

      brokenEggs,

      cratesSold,
      extraEggsSold,

      pricePerCrate,
      pricePerEgg,

      notes,
    });

    res.status(201).json({
      message: "Daily record created successfully",
      dailyRecord,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create daily record",
      error: error.message,
    });
  }
};

module.exports = {
  createDailyRecord,
};
