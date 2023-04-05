import mongoose from "mongoose";
import {
  ProjectModelInterface,
  ProjectUserInterface,
  UserModelInterface,
} from "./types";
import Schema = mongoose.Schema;
import { User } from "./userModel";
const userProjectSchema = new mongoose.Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: User,
    unique: [true, "User already in the project"],
  },
  admin: {
    type: Boolean,
    default: false,
  },
  role: {
    type: Number,
    default: 0,
  },
});
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project must have a name"],
    },
    priority: {
      type: Number,
      default: 0,
    },
    users: [userProjectSchema],
  },
  { timestamps: true }
);

export const Project = mongoose.model<ProjectModelInterface>(
  "Project",
  projectSchema
);
export const UserProject = mongoose.model<ProjectUserInterface>(
  "ProjectUser",
  userProjectSchema
);
