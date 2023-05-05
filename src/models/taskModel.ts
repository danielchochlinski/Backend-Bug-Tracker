import mongoose from "mongoose";
import Schema = mongoose.Schema;
import { User } from "./userModel";
import { Ticket } from "./ticketModel";
import { Comment } from "./commentModel";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project must have a name"]
    },
    status: {
      type: Number,
      default: 0
    },
    priority: {
      type: Number,
      default: 0
    },
    type: {
      type: Number,
      default: 0
    },
    comments: [{ type: Schema.Types.ObjectId, ref: Comment }],

    tickets: [{ type: Schema.Types.ObjectId, ref: Ticket }]
  },

  { timestamps: true }
);

export const Task = mongoose.model<any>("Task", taskSchema);
