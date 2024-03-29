import { Request, Response } from "express";
import { User } from "../models/userModel";
import bcrypt from "bcryptjs";

export const getUser = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      status: "Success",
      data: req.user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Server error" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      status: "Sucess",
      data: { users: users },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Server error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const updateInfo = req.body;

    const updatedUser = await User.findByIdAndUpdate(user._id, updateInfo, {
      new: true,
    }).select("-password");
    return res.status(200).json({
      status: "Success",
      data: { updatedUser },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Server error" });
  }
};
//checking

export const updateUserPassword = async (req: Request, res: Response) => {
  try {
    const { _id, password } = req.user;

    const { oldPassword, newPassword } = req.body;

    if (await bcrypt.compare(oldPassword, password)) {
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await User.findByIdAndUpdate(
        _id,
        { password: hashedPassword },
        {
          new: true,
        }
      );
      return res.status(200).json({ status: "Success" });
    } else {
      res.status(400).json({
        status: "Failed",
        message: "Passwords don't match",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Server error" });
  }
};
