const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("user already registered");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashPassword,
  });
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("user data not valid");
  }
  res.json({ message: "Register the user" });
});

//@desc login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler((req, res) => {
  res.json({ message: "login the user" });
});

//@desc login a user
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler((req, res) => {
  res.json({ message: "current user" });
});

module.exports = { registerUser, loginUser, currentUser };
