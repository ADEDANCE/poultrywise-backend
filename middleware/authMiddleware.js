// impoert JWT
const jwt = require("jsonwebtoken");
// import user model
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    // get the Authorization header
    const authHeader = req.headers.authorization;

    console.log("Authorization Header:", authHeader);

    // Check if a token was provided
    if (!authHeader) {
      return res.status(401).json({
        message: "Not authorized, no token provided",
      });
    }

    // Extract the actual token
    const token = authHeader.split(" ")[1];

    console.log("Extracted Token:", token);

    if (!token) {
      return res.status(401).json({
        message: "Not authorized, invalid token format",
      });
    }

    // Verify the JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User no longer exists",
      });
    }

    // Attach the user to the request
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Not authorized, invalid token",
    });
  }
};

module.exports = protect;
