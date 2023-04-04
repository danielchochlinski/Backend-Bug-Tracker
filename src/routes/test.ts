import { Router } from "express";
import { User } from "../models/userModel";
import { Project } from "../models/projectModel";

const router = Router();
router.get("/get-users", async (req: any, res: any) => {
  try {
    const users = await User.find({});
    res.status(200).json({ status: "Success", data: users });
  } catch (err) {
    res.status(200).json({ status: "Failed" });
  }
});

router.get("/get-projects", async (req: any, res: any) => {
  try {
    const projects = await Project.find({});
    res.status(200).json({ status: "Success", data: projects });
  } catch (err) {
    res.status(200).json({ status: "Failed" });
  }
});
export default router;
