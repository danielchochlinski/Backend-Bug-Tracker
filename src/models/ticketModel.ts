import mongoose, { Schema } from "mongoose";
import { TickerModelInterface } from "./types";
const ticketUserSchema = new mongoose.Schema({});
const ticketSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Ticket must have a name"],
  },
  status: {
    type: Number,
    default: 0,
    min: 0,
    max: 2,
    //0 = incomplete,
    //1 = in progress
    //2 = resolved
  },
  priority: {
    type: Number,
    default: 0,
    min: 0,
    max: 3,
    //0 = low,
    //1 = medium
    //2 = high
    //3 = immidiet
  },
  type: {
    type: Number,
    defualt: 0,
    min: 0,
    max: 3,
    //0 = bug,
    //1 = issue
    //2 = frontend
    //3 = backend
  },
  // assigned: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  // ],
});
export const Ticket = mongoose.model<TickerModelInterface>(
  "Ticket",
  ticketSchema
);
