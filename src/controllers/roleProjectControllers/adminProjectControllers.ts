import { Response } from "express";
import { Project } from "../../models/projectModel";
import { User } from "../../models/userModel";
import { isValid } from "../../extra/validatiors";

export const addUserToProject = async (req: any, res: Response) => {
  const { _id: userId } = req.user;
  const projectId = req.params.id;
  const { email, role } = req.body;
  // const update = {
  //     users
  // }
  try {
    const projects = await Project.find({ "users._id": userId });
    console.log(projects);
    // return res.status(200).json
    const user = await User.findOne({ email }).select("-password");
    console.log(user);
    if (!user)
      return res
        .status(400)
        .json({ status: "Failed", message: "No such user" });

    if (projects.length !== 0) {
      projects.map((el) => {
        el.users.map(async (el) => {
          //check if user is admin
          //   console.log(user);
          //   res.status(200).json({ status: "SUccess", user });
          //   if(user._id === _id)
          if (el._id === user._id)
            return res.status(200).json({
              status: "Success",
              message: "User already in the project",
            });

          if (el.admin == true) {
            await Project.findByIdAndUpdate(
              projectId,
              { $push: { users: [{ _id: user._id, admin: false, role }] } },

              { new: true }
            );
            return res.status(200).json({
              status: "Success",
              message: `User ${user._id} have been granted acces to this project`,
            });
          } else {
            return res.status(401).json({
              status: "Failed",
              message: `Not authorized to give access`,
            });
          }
        });
      });
    } else {
      return res.status(401).json({
        status: "Failed",
        message: "Not authorized",
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: "Failed",
      message: "Ups something went wrong",
    });
  }
};
