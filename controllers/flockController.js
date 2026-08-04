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

module.exports = {
  createFlock,
};