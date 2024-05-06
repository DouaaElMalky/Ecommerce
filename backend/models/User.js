const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  email: String,
  password: String,
  loginAttempts: { type: Number, default: 0 },
  lockUntil: Number,
});

const User = mongoose.model("User", userSchema);

module.exports = User;