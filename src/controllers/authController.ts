import { Request, Response, NextFunction } from "express";
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerUser = async (req: Request, res: Response) => {
  const { name, surname, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json({
        status: "failed",
        message: "User already exisits",
      });
      return;
    }

    const hashpassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      surname,
      email,
      password: hashpassword,
    });
    const responseUser = {
      ...newUser,
      id: newUser.id,
      token: generateToken(newUser._id),
    };
    console.log(responseUser);
    res.status(201).json({
      status: "success",
      data: {
        user: responseUser,
      },
    });
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

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "sucess",
      data: {
        data: users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
    });
    console.log(err);
  }
};
//Generate GWT
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = {
  registerUser,
  loginUser,
  getUsers,
};
