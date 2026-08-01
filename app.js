require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "PoultryWise API is running",
  });
});

app.listen(3000, () => {
  console.log("PoultryWise backend is running on port 3000");
});