// import Mongoose.
const mongoose = require("mongoose");

// connectDB
const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection string stored in MONGODB_URI
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    process.exit(1);
  }
};

module.exports = connectDB;