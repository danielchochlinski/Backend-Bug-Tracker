import express from "express";
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
import taskRoute from "./routes/tasks";
import { connectDB } from "./config/db";
import organizationRoute from "./routes/organization";
connectDB();
app.use(bodyParser.json());
app.use("/api", authRoute);
app.use("/api", organizationRoute);
app.use("/api", dashboardRoute);
app.use("/api", projectRoute);
app.use("/api", ticketsRoute);
app.use("/api", inviteAuthRoute);
app.use("/api", taskRoute);
//testing route dev only
app.use("/api/test/", testRoute);

if (process.env.NODE_ENV !== "test") {
  app.listen(port || 3000, () => {
    console.log(`app is listening on ${port}`);
  });
}
