import { connectDB } from "../config/db";
import { User } from "../models/userModel";
import { users } from "./mockup/users.mockup";
const seedDB = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(users);
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};
connectDB().then(() => seedDB());
