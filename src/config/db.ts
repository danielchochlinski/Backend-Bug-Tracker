import mongoose from "mongoose";
const MONGO_DB_URL = process.env.MONGO_DB_URL || "";
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(MONGO_DB_URL);
    console.log(`mongo db connected: ${connect.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = connectDB;
