const mongoose = require("mongoose");

const flockSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    batchID: {
      type: String,
      required: true,
    },

    numberOfBirds: {
      type: Number,
      required: true,
      min: 1,
    },

    breed: {
      type: String,
      required: true,
      trim: true,
    },

    dateReceived: {
      type: Date,
      required: true,
    },

    supplier: {
      type: String,
      required: true,
      trim: true,
    },

    currentStage: {
      type: String,
      enum: ["brooding", "grower", "layer"],
      default: "brooding",
    },

    initialCost: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Flock", flockSchema);
