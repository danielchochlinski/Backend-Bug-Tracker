import mongoose from "mongoose";
import {
  ProjectModelInterface,
  ProjectUserInterface,
  UserModelInterface,
} from "./types";
import Schema = mongoose.Schema;
const userProjectSchema = new mongoose.Schema({
  admin: {
    type: Boolean,
    default: false,
  },
  role: {
    type: Number,
    default: 0,
    //Role
    //0=dev
    //1=supervisor
    //2=admin
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
