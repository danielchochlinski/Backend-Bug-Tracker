import { Request, Response } from "express";
import { User } from "../models/userModel";

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
