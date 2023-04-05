import { Response } from "express";
import { Project } from "../../models/projectModel";
import { User } from "../../models/userModel";
import { isValid } from "../../extra/validatiors";
import mongoose from "mongoose";
import { ProjectUserInterface } from "../../models/types";

export const addUserToProject = async (req: any, res: Response) => {
  const { email, role } = req.body;
  //   const { _id: userId } = req.user;
  const projectId = req.params.id;

  try {
    const user: any = await User.findOne({
      email,
    }).select("-password");
    console.log(user);
    const { _id: searchID } = user;

    if (!user)
      return res
        .status(400)
        .json({ status: "Failed", message: "No such user" });

    const isInside = await Project.aggregate([
      { $unwind: "$users" },
      { $match: { "users._id": searchID } },
    ]);
    if (isInside.length !== 0) {
      return res
        .status(400)
        .json({ status: "Failed", message: "User already in the project " });
    }
    await Project.findByIdAndUpdate(
      projectId,
      { $push: { users: [{ _id: user._id, admin: false, role }] } },

      { new: true }
    );
    return res.status(200).json({ isInside });
  } catch (err) {
    return res.status(400).json({
      status: "Failed",
      message: "Ups something went wrong",
    });
  }
};

export const updateProjectAuth = async (req: any, res: Response) => {
  const { email, role } = req.body;
  //   const { _id: userId } = req.user;
  const projectId = req.params.id;
  try {
    // const project = await Project.aggregate([
    //   { $unwind: "$users" },
    //   { $match: { "users._id": searchID } },
    // ]);
  } catch (err) {
    console.log(err);
  }
};
