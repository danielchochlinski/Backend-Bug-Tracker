import mongoose from "mongoose";
import { ProjectModelInterface, ProjectUserInterface } from "./types";
import Schema = mongoose.Schema;
import { User } from "./userModel";
import { Task } from "./taskModel";


const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project must have a name"]
    },
    priority: {
      type: Number,
      default: 0
    },
    tasks: [{ type: Schema.Types.ObjectId, ref: Task }],
    users: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: User
        },
        isAdmin: {
          type: Boolean,
          default: false
        },
        role: {
          type: Number,
          default: 0
        }
      }
    ],
    pendingUsers: [
      {
        email: {
          type: String,
          required: [true, "Please provide email"]
        }
      }
    ]
  },

  { timestamps: true }
);

export const Project = mongoose.model<ProjectModelInterface>(
  "Project",
  projectSchema
);
// export const UserProject = mongoose.model<ProjectUserInterface>(
//   "ProjectUser",
//   userProjectSchema
// );
