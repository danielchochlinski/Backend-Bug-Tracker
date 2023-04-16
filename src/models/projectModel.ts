import mongoose from "mongoose";
import {
  ProjectModelInterface,
  ProjectUserInterface,
  UserModelInterface,
} from "./types";
import Schema = mongoose.Schema;
import { User } from "./userModel";
import { Ticket } from "./ticketModel";
const userProjectSchema = new mongoose.Schema({
  admin: {
    type: Boolean,
    default: false,
  },
  role: {
    type: Number,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: User,
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
    tickets: [{ type: Schema.Types.ObjectId, ref: Ticket }],
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
