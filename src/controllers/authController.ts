import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerUser = async (req: Request, res: Response) => {
  const { name, surname, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400);
      // .json({
      //   status: "failed",
      //   message: "User already exisits",
      // });
      // return;
      throw new Error("User already exists");
    }

    const hashpassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      surname,
      email,
      password: hashpassword,
    });

    if (newUser) {
      res.status(201).json({
        status: "success",
        data: {
          user: newUser,
          token: generateToken(newUser._id),
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user)
      res.status(400).json({
        status: "failed",
        message: "User not found",
      });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        status: "success",
        data: { user, token: generateToken(user._id) },
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

export const getUser = async (req: any, res: Response) => {
  try {
    res.status(200).json({
      status: "success",
      data: req.user,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "sucess",
      data: { users: users },
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
  return jwt.sign({ id }, process.env.JWT_SECRET || "", {
    expiresIn: "30d",
  });
};
