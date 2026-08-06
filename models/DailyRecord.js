const mongoose = require("mongoose");

const dailyRecordSchema = new mongoose.Schema(
  {
    // Owner of the record
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Flock this record belongs to
    flock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flock",
      required: true,
    },

    // Date of the record
    date: {
      type: Date,
      required: true,
    },

    // Bird information
    mortality: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Feed
    feedBagsUsed: {
      type: Number,
      default: 0,
      min: 0,
    },

    feedCost: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Medication
    medication: {
      type: String,
      trim: true,
      default: "",
    },

    medicationCost: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Vaccination
    vaccination: {
      type: String,
      trim: true,
      default: "",
    },

    vaccinationCost: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Other daily expenses
    electricityCost: {
      type: Number,
      default: 0,
      min: 0,
    },

    labourCost: {
      type: Number,
      default: 0,
      min: 0,
    },

    otherCost: {
      type: Number,
      default: 0,
      min: 0,
    },

    otherCostDescription: {
      type: String,
      trim: true,
      default: "",
    },

    // Egg production
    cratesCollected: {
      type: Number,
      default: 0,
      min: 0,
    },

    extraEggsCollected: {
      type: Number,
      default: 0,
      min: 0,
      max: 29,
    },

    brokenEggs: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Egg sales
    cratesSold: {
      type: Number,
      default: 0,
      min: 0,
    },

    extraEggsSold: {
      type: Number,
      default: 0,
      min: 0,
      max: 29,
    },

    pricePerCrate: {
      type: Number,
      default: 0,
      min: 0,
    },

    pricePerEgg: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Additional notes
    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("DailyRecord", dailyRecordSchema);
