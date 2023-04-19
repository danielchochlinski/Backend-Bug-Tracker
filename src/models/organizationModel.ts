import mongoose, { Schema } from "mongoose";
import { User } from "./userModel";
import { Project } from "./projectModel";
const organizationSchema = new mongoose.Schema({
  name: { type: String, require: [true, "Please prvde a name"] },
  users: [
    {
      user: { type: Schema.Types.ObjectId, ref: User },
      role: {
        type: Number,
      },
      isAdmin: {
        type: Boolean,
      },
    },
  ],
  projects: [{ type: Schema.Types.ObjectId, ref: Project }],
});

export const Organization = mongoose.model<any>(
  "Organization",
  organizationSchema
);
