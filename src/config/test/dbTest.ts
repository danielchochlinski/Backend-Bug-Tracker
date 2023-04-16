// import mongoose from "mongoose";
// import { MongoMemoryServer } from "mongodb-memory-server";
// import { MongoClient } from "mongodb";

// let connection: MongoClient;
// let mongoServer: MongoMemoryServer;

// export const connectDB = async () => {
//   mongoServer = await MongoMemoryServer.create();
//   connection = await MongoClient.connect(mongoServer.getUri(), {});
// };

// export const closeDB = async () => {
//   await mongoose.connection.dropDatabase();
//   await mongoose.connection.close();
//   await mongoServer.stop();
// };

// export const clearDB = async () => {
//   const collections = mongoose.connection.collections;
//   for (const key in collections) {
//     await collections[key].deleteMany({});
//   }
// };
