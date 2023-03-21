import mongoose from "mongoose";
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./config");
// const MONGO_DB_URL = process.env.MONGO_DB_URL || "";
// const MONGO_DB_URL_DEV = process.env.MONGO_DB_URL_DEV || "";
// const MONGO_DB_HERE = "mongodb://localhost:27017";
const test = `mongodb://bug-tracker:daniel1@mongo:27017/?authSource=admin`;
const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(MONGO_URL);
    console.log(`mongo db connected: ${connect.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = connectDB;
