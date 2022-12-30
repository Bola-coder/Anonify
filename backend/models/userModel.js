const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username already taken by another user"],
    required: [true, "You should provide a username"],
    minLength: [4, "Your username should be a minimum of 4 characters"],
    maxLength: [16, "Your username should be a maximum of 16 characters"],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide an email address"],
    trim: true,
  },
  password: {
    type: String,
    minLength: [8, "Your password should be a minimum of 8 characters"],
    select: false,
  },
  passwordChangedAt: {
    type: Date,
  },
});

// A database middleware to hash the password before saving to the database;
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }
  this.passwordChangedAt = Date.now - 2000;
});

// Creating an instance method to compare password entered by user to the one in the database during login
userSchema.methods.confirmPasswordDuringLogin = async function (
  enteredPassword,
  userPassword
) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

const Users = mongoose.model("users", userSchema);

module.exports = Users;
