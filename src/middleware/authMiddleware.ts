const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
import { Request, Response, NextFunction } from "express";
const auth = async (req: Request, res: Response, next: NextFunction) => {
  let token = "";
  if (req.headers && req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      req.user = await User.findById()

    } catch (err) {
      console.log(err);
    }
  }
};
