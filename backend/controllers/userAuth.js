const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const catchAsync = require("./../util/catchAsync");
const AppError = require("./../util/AppError");

const signJWTToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  if (!newUser) {
    return next(new AppError("Failed to create new user", 404));
  }
  const token = signJWTToken(newUser._id);
  res.status(200).json({
    status: "success",
    user: newUser,
    token,
  });
});

module.exports = { signup };
