import mongoose from "mongoose";
import { config } from "./config";

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = config;
const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(MONGO_URL);
    console.log(`mongo db connected: ${connect.connection.host}`);
    console.log(`url ${MONGO_URL}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
