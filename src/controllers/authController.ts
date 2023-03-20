const User = require("../models/userModel");
import { Request, Response, NextFunction, Router } from "express";
const bcrypt = require("bcryptjs");

const registerUser = async (req: Request, res: Response) => {
  const { name, surname, email, password } = req.body;
  try {
    const hashpassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      surname,
      email,
      password: hashpassword,
    });
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
    console.log(newUser);
  } catch (err) {
    res.status(400).json({
      status: "fail",
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      res.status(400).json({
        status: "failed",
        message: "User not found",
      });
    const correctPassword = await bcrypt.compare(password, user.password);

    if (correctPassword) {
      res.status(200).json({
        status: "success",
        data: { user },
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "login information incorrect",
      });
    }
  } catch (err) {
    res.status(404);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
