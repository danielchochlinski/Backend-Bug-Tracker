import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
const app = express();
const port = process.env.PORT;
import { auth } from "./middleware/authMiddleware";
import authRoute from "./routes/auth";
import dashboardRoute from "./routes/dashboard";
import { connectDB } from "./config/db";
connectDB();
app.use(bodyParser.json());

app.use("/api/user", authRoute);
app.use("/api/dashboard", dashboardRoute);

app.listen(port || 3000, () => {
  console.log(`app is listening on ${port}`);
});
