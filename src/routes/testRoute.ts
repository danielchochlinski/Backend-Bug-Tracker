import { Request, Router, Response } from "express";
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
router.get("/test", async (req: Request, res: Response) => {
  try {
    res.status(200).json({ status: "Success", message: "Server is running" });
  } catch (err) {
    res.status(400).json({ status: "Failed", message: "Something went wrong" });

    console.log(err);
  }
});
export default router;
