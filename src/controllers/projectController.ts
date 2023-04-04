import { Request, Response } from "express";
import { Project, UserProject } from "../models/projectModel";
import mongoose from "mongoose";
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
    const projects = await Project.find({ "users._id": _id }).select("-users");
    console.log(projects);
    res.status(200).json({ status: "Success", data: projects });
  } catch (err) {
    res
      .status(400)
      .json({ status: "Failed", message: "Failed to load your projects" });
    console.log(err);
  }
};

export const deleteProject = async (req: any, res: Response) => {
  const { _id: userId } = req.user;
  const projectId = req.params.id;

  try {
    const projects = await Project.find({ "users._id": userId });
    if (projects.length !== 0) {
      projects.map((el) => {
        el.users.map(async (user) => {
          //check if user is admin
          if (user.admin == true) {
            await Project.findByIdAndDelete(projectId);
            res.status(200).json({
              status: "Success",
              message: "Project has been succesfuly deleted",
              params: projectId,
              data: projects,
            });
          } else
            res.status(400).json({
              status: "Failed",
              message: "You are not the admin",
            });
        });
      });
    } else {
      res.status(400).json({ status: "Failed", message: "No projects found" });
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "Failed to delete this projects",
      value: projectId,
    });
    console.log(err);
  }
};