import { Response } from "express";
import { Project } from "../../models/projectModel";
import { User } from "../../models/userModel";
import { isValid } from "../../extra/validatiors";
import mongoose from "mongoose";
import { ProjectUserInterface } from "../../models/types";

// @desc        Add user to project only leader or admin can do it
// @router      GET /api/projects/admin/add-user/:id
// @access      Private
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
    await Project.findOneAndUpdate(
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

// @desc        Update auth for user inside project
// @router      GET /api/projects/admin/update-auth/:id
// @access      Private
export const updateProjectAuth = async (req: any, res: Response) => {
  const { admin, email, role } = req.body;
  //   const { _id: userId } = req.user;
  const projectId = req.params.id;
  const update: any = {};

  try {
    //check if user exisits
    const user: any = await User.findOne({
      email,
    }).select("-password");

    if (!user)
      return res
        .status(400)
        .json({ status: "Failed", message: "No such user" });

    //Set only values that are not empty
    for (const key of Object.keys(req.body)) {
      if (req.body[key] !== "") {
        update[key] = req.body[key];
      }
    }

    const projects = await Project.findOneAndUpdate(
      {
        _id: projectId,
        "users._id": user._id,
      },
      {
        $set: { "users.$": { ...update, _id: user._id } },
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      status: "Success",
      message: "Auth has been updated",
      data: projects,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: "Failed",
      message: "Ups something went wrong",
    });
  }
};
