import mongoose from "mongoose";
import Schema = mongoose.Schema;
import { User } from "./userModel";
import { Ticket } from "./ticketModel";
import { CommentModelInterface } from "./types";

const commentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User
    }
    // document: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Document"
    // }
  },
  { timestamps: true }
);

export const Comment = mongoose.model<CommentModelInterface>(
  "Task",
  commentSchema
);
