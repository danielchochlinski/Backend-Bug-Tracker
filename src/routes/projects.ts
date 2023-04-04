import { Router } from "express";
import { auth } from "../middleware/authMiddleware";
import {
  createProject,
  deleteProject,
  getProjects,
} from "../controllers/projectController";
import { addUserToProject } from "../controllers/roleProjectControllers/adminProjectControllers";
// import { auth } from "../middleware/authMiddleware";

const router = Router();
router.post("/create-project", auth, createProject);
router.get("/get-projects", auth, getProjects);
router.delete("/delete-project/:id", auth, deleteProject);

//admin
router.post("/admin/add-user/:id", auth, addUserToProject);
export default router;
