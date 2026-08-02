const User = require("../models/User");


const registerUser = async (req, res) => {
  try {
    // Getting data from the request
    const { name, email, password } = req.body;

    // Creating a user
    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
};