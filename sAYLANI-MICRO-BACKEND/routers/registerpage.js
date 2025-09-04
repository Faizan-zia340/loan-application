const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

// Registration Route
router.post("/register", async (req, res) => {
  try {
    const { name, email, cnic, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const existingCNIC = await User.findOne({ cnic });
    if (existingCNIC) {
      return res.status(400).json({ message: "CNIC already in use." });
    }

    // Create a new user
    const user = new User({ name, email, cnic, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
