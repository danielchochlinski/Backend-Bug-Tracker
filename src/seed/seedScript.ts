import { connectDB } from "../config/db";
import { User } from "../models/userModel";
import { users } from "./mockup/users.mockup";
connectDB();
const seedDB = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(users);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
seedDB();
