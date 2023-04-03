import { Request, Response } from "express";
import { Project, UserProject } from "../models/projectModel";
export const createProject = async (req: any, res: Response) => {
  const { name, priority } = req.body;
  const { _id } = req.user;
  try {
    const project = await Project.create({
      name,
      priority,
      users: [{ _id, admin: true, role: 3 }],
    });
    console.log(project);
    res
      .status(200)
      .json({ status: "Success", message: "Project succesfully created" });
  } catch (err) {
    res
      .status(400)
      .json({ status: "Failed", message: "Failed to creat project" });
    console.log(err);
  }
};

export const getProjects = async (req: any, res: Response) => {
  const { _id } = req.user;
  try {
    const projects = await Project.find({ "users._id": _id });
    console.log(projects);
    res.status(200).json({ status: "Success", data: projects });
  } catch (err) {
    res
      .status(400)
      .json({ status: "Failed", message: "Failed to load your projects" });
    console.log(err);
  }
};
