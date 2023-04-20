import mongoose from "mongoose";
import Schema = mongoose.Schema;
import { User } from "./userModel";
import { Ticket } from "./ticketModel";

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project must have a name"]
    },
    priority: {
      type: Number,
      default: 0
    },
    tickets: [{ ticket: { type: Schema.Types.ObjectId, ref: Ticket } }],
   
  },

  { timestamps: true }
);

export const Task = mongoose.model<any>("Task", taskSchema);
