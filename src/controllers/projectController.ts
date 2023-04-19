import { Request, Response } from "express";
import { Project } from "../models/projectModel";
import { Organization } from "../models/organizationModel";

export const createProject = async (req: Request, res: Response) => {
  const { name, priority } = req.body;
  const { _id } = req.user;
  const { orgId } = req.params;

  try {
    const project = await Project.create({
      name,
      priority,
      users: [{ _id, isAdmin: true, role: 3 }]
    });
    await Organization.findByIdAndUpdate(
      orgId,
      {
        $push: { projects: project._id }
      },
      { new: true }
    );

    res
      .status(200)
      .json({ status: "Success", message: "Project succesfully created" });
  } catch (err) {
    return res.status(500).send({ error: "Server error" });
  }
};

// @desc        Get all projects available to a user
// @router      POST //api/organization/:orgId/projects"
// @access      Private auth / projectAuth
export const getProjects = async (req: Request, res: Response) => {
  const { _id } = req.user;
  try {
    const projects = await Project.find({ "users._id": _id }).select("-users");
    console.log(projects);
    res.send({ status: "Success", data: projects });
  } catch (err) {
    return res.status(500).send({ error: "Server error" });
  }
};

export const getSingleProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  try {
    const projects = await Project.findById(projectId).select("-users");
    res.send({ status: "Success", data: projects });
  } catch (err) {
    return res.status(500).send({ error: "Server error" });
  }
};

// @desc        Creat user using invitation link and add to project or send invite to user if exisits
// @router      POST //api/registration/project/:projectId/invite"
// @access      Private
export const deleteProject = async (req: Request, res: Response) => {
  const { _id: userId } = req.user;
  const projectId = req.params.id;
  const { _id } = req.user || {};
  if (!_id) {
    return res
      .status(400)
      .json({ status: "Failed", message: "Invalid user ID" });
  }
  try {
    const projects = await Project.find({ "users._id": userId });
    if (projects.length !== 0) {
      projects.map((el) => {
        el.users.map(async (user) => {
          //check if user is admin
          if (user.isAdmin == true) {
            await Project.findByIdAndDelete(projectId);
            res.status(200).json({
              status: "Success",
              message: "Project has been succesfuly deleted",
              params: projectId,
              data: projects
            });
          } else
            res.status(400).json({
              status: "Failed",
              message: "You are not the admin"
            });
        });
      });
    } else {
      res.status(400).json({ status: "Failed", message: "No projects found" });
    }
  } catch (err) {
    return res.status(500).send({ error: "Server error" });
  }
};
