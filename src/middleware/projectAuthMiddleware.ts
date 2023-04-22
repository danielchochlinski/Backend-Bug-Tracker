import { Request, Response, NextFunction } from "express";
import { Project } from "../models/projectModel";
interface User {
  _id: string;
  isAdmin: boolean;
  role: number;
}

// returns projects if user is is part of it
export const checkUserProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.user;
  if (!_id) {
    return res.status(401).json({ message: "User not authorized" });
  }

  try {
    const projects: any = await Project.find({
      "users._id": _id
    })
      .lean()
      .select("-users");

    if (projects?.length === 0) {
      return res.status(404).json({ message: "User not part of any projects" });
    }

    req.projects = projects;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

//checks project determins if admin or not and returns one single project
export const checkUserSingleProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.user;
  const projectId = req.params.projectId;
  console.log(_id, projectId);
  if (!_id) {
    return res.status(401).json({ message: "User not authorized" });
  }

  try {
    const project: any = await Project.findOne({
      _id: projectId,
      users: {
        $elemMatch: { _id }
      }
    }).lean();

    if (!project) {
      return res.status(404).json({ message: "Not Authorized" });
    }

    if (project?.length === 0) {
      return res
        .status(404)
        .json({ status: "Failed", message: "User not authorized" });
    }
    const user = project.users.find(
      (user: User) => user._id.toString() === _id.toString()
    );
    console.log(user);
    if (!user)
      return res
        .status(400)
        .json({ status: "Failed", message: "User not authorized" });
    if (user && !user.isAdmin) {
      req.projects = { ...project, users: undefined };
    } else {
      req.projects = project;
    }
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// allow to enter project / tasks and tickets
export const userAuthProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.user;
  if (!_id) {
    return res
      .status(401)
      .json({ status: "Failed", message: "User not authorized" });
  }

  try {
    const projects: any = await Project.find({
      "users._id": _id
    })
      .lean()
      .select("-users");
    if (projects?.length === 0) {
      return res
        .status(401)
        .json({ status: "Failed", message: "User not authorized" });
    }
    req.projectTasks = projects[0].tasks;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
