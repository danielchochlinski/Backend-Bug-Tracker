import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
export const app = express();
const port = process.env.PORT;
import authRoute from "./routes/auth";
import dashboardRoute from "./routes/dashboard";
import projectRoute from "./routes/projects";
import testRoute from "./routes/testRoute";
import ticketsRoute from "./routes/tickets";
import inviteAuthRoute from "./routes/inviteAuth";
import { connectDB } from "./config/db";

connectDB();
app.use(bodyParser.json());
app.use("/api/user", authRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/project", projectRoute);
app.use("/api/project", ticketsRoute);
app.use("/api/registration", inviteAuthRoute);
//testing route dev only
app.use("/api/test/", testRoute);

if (process.env.NODE_ENV !== "test") {
  app.listen(port || 3000, () => {
    console.log(`app is listening on ${port}`);
  });
}
