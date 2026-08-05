const mongoose = require("mongoose");

const dailyRecordSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    flock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flock",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    mortality: {
      type: Number,
      default: 0,
      min: 0,
    },

    feedUsed: {
      type: Number,
      default: 0,
      min: 0,
    },

    medication: {
      type: String,
      trim: true,
    },

    vaccination: {
      type: String,
      trim: true,
    },

    expense: {
      type: Number,
      default: 0,
      min: 0,
    },

    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("DailyRecord", dailyRecordSchema);


