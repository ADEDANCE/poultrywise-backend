// Import the Flock model
const Flock = require("../models/Flock");

const createFlock = async (req, res) => {
  try {
    // get flock information
    const {
      batchID,
      numberOfBirds,
      breed,
      dateReceived,
      supplier,
      initialCost,
    } = req.body;

    // Check for an existing active flock
    const existingFlock = await Flock.findOne({
      user: req.user._id,
      status: "active",
    });

    if (existingFlock) {
      return res.status(400).json({
        message: "You already have an active flock",
      });
    }

    // create flock
    const flock = await Flock.create({
      user: req.user._id,
      batchID,
      numberOfBirds,
      breed,
      dateReceived,
      supplier,
      initialCost,
    });

    res.status(201).json({
      message: "Flock created successfully",
      flock,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create flock",
      error: error.message,
    });
  }
};

// get flock
const getActiveFlock = async (req, res) => {
  try {
    const flock = await Flock.findOne({
      user: req.user._id,
      status: "active",
    });

    if (!flock) {
      return res.status(404).json({
        message: "No active flock found",
      });
    }

    res.status(200).json({
      flock,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get active flock",
      error: error.message,
    });
  }
};

// update flock stage

const updateFlockStage = async (req, res) => {
  try {
    // get new stage
    const { currentStage } = req.body;

    // find farmer's active flock
    const flock = await Flock.findOne({
      user: req.user._id,
      status: "active",
    });

    // Check if the flock exists

    if (!flock) {
      return res.status(404).json({
        message: "No active flock found",
      });
    }

    // Validate the stage
    if (!["day-old", "grower", "layer"].includes(currentStage)) {
      return res.status(400).json({
        message: "Invalid flock stage",
      });
    }

    flock.currentStage = currentStage;

    await flock.save();

    res.status(200).json({
      message: "Flock stage updated successfully",
      flock,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update flock stage",
      error: error.message,
    });
  }
};

module.exports = {
  createFlock,
  getActiveFlock,
  updateFlockStage,
};
