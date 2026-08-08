require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

// importing router
const authRoutes = require("./routes/authRoutes");
const flockRoutes = require("./routes/flockRoutes");
const dailyRecordRoutes = require("./routes/dailyRecordRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// import swagger
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

// import cors
const cors = require("cors");

const app = express();
// enable CORS
app.use(cors());

connectDB();

app.use(express.json());

// Any route inside authRoutes should start with /api/auth
app.use("/api/auth", authRoutes);

app.use("/api/flocks", flockRoutes);

app.use("/api/daily-records", dailyRecordRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "PoultryWise API is running",
  });
});

// swagger routre
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`PoultryWise backend is running on port ${PORT}`);
});
