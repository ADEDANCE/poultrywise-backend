const User = require("../models/User");
// impport bcrypt
const bcrypt = require("bcrypt");


const registerUser = async (req, res) => {
  try {
    // Getting data from the request
    const { name, email, password } = req.body;

    // hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Creating a user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
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