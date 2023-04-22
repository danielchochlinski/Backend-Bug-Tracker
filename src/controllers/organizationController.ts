import { Request, Response } from "express";
import { Organization } from "../models/organizationModel";

export const createOrganization = async (req: Request, res: Response) => {
  const { name } = req.body;
  const { _id } = req.user;
  try {
    await Organization.create({
      name,
      users: [{ _id, role: 3, isAdmin: true }]
    });
    res.send({
      status: "Success",
      message: "Organization was succesfuly created"
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Server error" });
  }
};
