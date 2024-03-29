import { Request, Response, NextFunction } from "express";
import { Project } from "../models/projectModel";
import { Organization } from "../models/organizationModel";

export const isProjectAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const projectId = req.params.projectId;
  const userId = req.user.id;
  console.log(projectId, userId);
  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const user = project.users.find((user) => user._id == userId);
    if (!user) {
      return res.status(401).json({ message: "User not authorized" });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ message: "User is not an admin" });
    }

    // If the user is an admin, call next() to proceed to the next middleware function
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const isOrgAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orgId = req.params.orgId;
  const userId = req.user.id;
  try {
    const organization = await Organization.findById(orgId);

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    const user = organization.users.find(
      (user: { _id: string }) => user._id == userId
    );
    console.log(organization);
    if (!user) {
      return res.status(401).json({ message: "User not authorized orgAuth" });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ message: "User is not an admin" });
    }

    // If the user is an admin, call next() to proceed to the next middleware function
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

