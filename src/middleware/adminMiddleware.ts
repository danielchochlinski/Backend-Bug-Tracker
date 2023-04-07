import { Request, Response, NextFunction } from "express";
import { Project } from "../models/projectModel";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const projectId = req.params.id;
  const userId = req.user.id;
  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const user = project.users.find((user) => user._id == userId);
    if (!user) {
      return res.status(401).json({ message: "User not authorized" });
    }

    if (!user.admin) {
      return res.status(403).json({ message: "User is not an admin" });
    }

    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
