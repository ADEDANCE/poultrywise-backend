// impoert JWT
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    // get the Authorization header
    const authHeader = req.headers.authorization;

    // Check if a token was provided
    if (!authHeader) {
      return res.status(401).json({
        message: "Not authorized, no token provided",
      });
    }


    // Extract the actual token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Not authorized, invalid token format",
      });
    }


    // Verify the JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user to the request
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Not authorized, invalid token",
    });
  }
};

module.exports = protect;