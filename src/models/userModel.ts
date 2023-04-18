import mongoose from "mongoose";
import { UserModelInterface } from "./types";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    requried: [true, "User must have a name!"],
  },
  surname: {
    type: String,
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
  verified: {
    type: Boolean,
    default: false,
  },
  emailToken: {
    type: String || null,
  },
  invitations: [{ type: String }],
});

export const User = mongoose.model<UserModelInterface>("User", userSchema);
