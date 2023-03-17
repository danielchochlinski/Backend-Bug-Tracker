const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT;

const authRoute = require("./routes/auth");
const dashboardRoute = require("./routes/dashboard");
const connectDB = require("./config/db");

connectDB();
app.use(bodyParser.json());

app.use("/api/user", authRoute);
app.use("/api/dashboard", dashboardRoute);

app.listen(port || 3000, () => {
  console.log(`app is listening on ${port}`);
});
