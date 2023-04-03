import { Request, Response, NextFunction, Router } from "express";
import { auth } from "../middleware/authMiddleware";
import { createProject, getProjects } from "../controllers/adminProjectController";
// import { auth } from "../middleware/authMiddleware";

const router = Router();
router.post("/create-project", auth, createProject);
router.get("/get-projects", auth, getProjects);

export default router;
