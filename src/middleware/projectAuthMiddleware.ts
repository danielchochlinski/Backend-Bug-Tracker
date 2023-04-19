import { Request, Response, NextFunction } from "express";
import { Project } from "../models/projectModel";

// check if user is allowed inside project
export const projectAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { projectId } = req.params;
  const { userId } = req.user;

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const user = project.users.find((user) => user._id == userId);
    if (!user) {
      return res.status(401).json({ message: "User not authorized" });
    }

    // If the user is an admin, call next() to proceed to the next middleware function
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
