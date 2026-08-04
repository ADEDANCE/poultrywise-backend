require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

// importing router
const authRoutes = require("./routes/authRoutes");
const flockRoutes = require("./routes/flockRoutes");

const app = express();

connectDB();

app.use(express.json());

// Any route inside authRoutes should start with /api/auth
app.use("/api/auth", authRoutes);

app.use("/api/flocks", flockRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "PoultryWise API is running",
  });
});

app.listen(3000, () => {
  console.log("PoultryWise backend is running on port 3000");
});
