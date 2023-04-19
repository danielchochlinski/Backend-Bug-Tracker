import { Response, Request } from "express";
import { Project } from "../../models/projectModel";
import { User } from "../../models/userModel";

import { ProjectUserInterface } from "../../models/types";
import { UserModelInterface } from "../../@types/express";

// @desc        Add user to project only leader or admin can do it
// @router      GET api/organization/:orgId/project/:projectId/user
// @access      Private auth / isProjectAdmin
export const addUserToProject = async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).send("Bad request");
    return;
  }
  const { email, role } = req.body;
  //    as { email: string; role: number };

  //   const { _id: userId } = req.user;
  const { projectId } = req.params;
  //   as string;

  try {
    const user: UserModelInterface | null = await User.findOne({
      email
    }).select("-password");
    console.log(user);

    if (!user) {
      return res
        .status(400)
        .json({ status: "Failed", message: "No such user" });
    }

    const { _id: searchID } = user;

    if (!user)
      return res
        .status(400)
        .json({ status: "Failed", message: "No such user" });

    const isInside = await Project.aggregate([
      { $unwind: "$users" },
      { $match: { "users._id": searchID } }
    ]);
    if (isInside.length !== 0) {
      return res
        .status(400)
        .json({ status: "Failed", message: "User already in the project " });
    }
    await Project.findByIdAndUpdate(
      projectId,
      { $push: { users: [{ _id: user._id, isAdmin: false, role }] } },
      { new: true }
    );

    return res.status(200).json({ isInside });
  } catch (err) {
    return res.status(400).json({
      status: "Failed",
      message: "Ups something went wrong"
    });
  }
};

// @desc        Update auth for user inside project only project admin can do it
// @router      PATCH api/organization/:orgId/project/:projectId/user
// @access      Private auth / isProjectAdmin
export const updateProjectAuth = async (req: Request, res: Response) => {
  const { email } = req.body;
  //   const { _id: userId } = req.user;
  const projectId = req.params.projectId;
  const update: ProjectUserInterface = {};

  try {
    //check if user exisits
    const user: UserModelInterface | null = await User.findOne({
      email
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
        "users._id": user._id
      },
      {
        $set: { "users.$": { ...update, _id: user._id } }
      },
      {
        new: true
      }
    );

    return res.status(200).json({
      status: "Success",
      message: "Auth has been updated",
      data: projects
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Server error" });
  }
};

// @desc        Remove user from project
// @router      DELETE api/organization/:orgId/project/:projectId/remove-user
// @access      Private auth / isProjectAdmin
export const removeUserFromProject = async (req: Request, res: Response) => {
  const { email } = req.body;
  const { projectId } = req.params;

  const user: UserModelInterface | null = await User.findOne({
    email
  }).select("-password");

  if (!user)
    return res.status(400).json({ status: "Failed", message: "No such user" });

  if (user.email === req.user.email) {
    return res
      .status(400)
      .json({ status: "Failed", message: "Admin cant remove himself" });
  }
  if (!user)
    return res.status(400).json({ status: "Failed", message: "No such user" });

  try {
    const project = await Project.findByIdAndUpdate(
      projectId,
      { $pull: { users: { _id: user._id } } },
      { new: true }
    );
    res.status(200).json({
      status: "Success",
      message: `User ${user._id} has been removed from this project`,
      data: project
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Server error" });
  }
};
