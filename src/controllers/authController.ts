import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendVerificationMail } from "../utilities/sendVerificationMail";

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
      emailToken: crypto.randomUUID(),
    });

    if (newUser) {
      sendVerificationMail(newUser);
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
    if (user && user.verified === false)
      res.status(401).json({
        status: "failed",
        message: "Please validate the email",
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

//Generate GWT
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "", {
    expiresIn: "30d",
  });
};

// POST
// 
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const emailToken = req.body.emailToken;

    if (!emailToken)
      res.status(400).json({
        status: "Failed",
        message: "EmailToken not found",
      });

    const update = {
      verified: true,
      emailToken: null,
    };

    const user = await User.findOneAndUpdate(emailToken, update, {
      new: true,
    });
    if (user) {
      res.status(200).json({
        status: "Success",
        data: { user },
      });
    } else {
      res.status(404).json({
        status: "Failed",
        message: "Verification failed invalid token",
      });
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).json(err.message);
  }
};
