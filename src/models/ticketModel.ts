import mongoose, { Schema } from "mongoose";
import { TicketModelInterface } from "./types";
import { User } from "./userModel";

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "Ticket must have a name"]
  },
  status: {
    type: Number,
    default: 0,
    min: 0,
    max: 2
    //0 = incomplete,
    //1 = in progress
    //2 = resolved
  },
  priority: {
    type: Number,
    default: 0,
    min: 0,
    max: 3
    //0 = low,
    //1 = medium
    //2 = high
    //3 = immidiet
  },
  type: {
    type: Number,
    defualt: 0,
    min: 0,
    max: 3
    //0 = bug,
    //1 = issue
    //2 = frontend
    //3 = backend
  },
  assigned: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: User
      }
    }
  ]
});
export const Ticket = mongoose.model<TicketModelInterface>(
  "Ticket",
  ticketSchema
);
