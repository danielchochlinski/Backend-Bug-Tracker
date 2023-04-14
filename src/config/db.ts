import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // const connect = await mongoose.connect(
    //   process.env.NODE_ENV === "dev"
    //     ? process.env.MONGO_DB_URL_DEV || ""
    //     : process.env.MONGO_DB_URL_TEST || ""
    // );
    const connect = await mongoose.connect(process.env.MONGO_DB_URL_DEV || "");
    if (connect) {
      console.log(`mongo db connected: ${connect.connection.host}`);
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
