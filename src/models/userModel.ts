const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    requried: [true, "User must have a name!"],
  },
  surname: {
    type: String,
    unique: true,
    requried: [true, "User must have a surname"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "User must have an email"],
  },
  password: {
    type: String,
    requried: [true, "User must have a password"],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
