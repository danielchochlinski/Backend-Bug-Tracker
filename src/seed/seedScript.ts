import { connectDB } from "../config/db";
import { User } from "../models/userModel";
import { users } from "./mockup/users.mockup";
const seedDB = async () => {
  connectDB();
  try {
    await User.deleteMany({});
    await User.insertMany(users);
    console.log("DB seeded successfully");
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};
seedDB();
