import { Router } from "express";
import { auth } from "../middleware/authMiddleware";
import {
  createProject,
  deleteProject,
  getProjects,
} from "../controllers/projectController";
import {
  addUserToProject,
  removeUserFromProject,
  updateProjectAuth,
} from "../controllers/roleProjectControllers/adminProjectControllers";
import { isAdmin } from "../middleware/adminMiddleware";
// import { auth } from "../middleware/authMiddleware";

const router = Router();

router.post("/create-project", auth, createProject);
router.get("/get-projects", auth, getProjects);
router.delete("/delete-project/:projectId", auth, deleteProject);

//admin
router.post("/admin/add-user/:projectId", auth, addUserToProject);
router.patch("/admin/update-auth/:projectId", auth, isAdmin, updateProjectAuth);
router.patch("/admin/remove-user/:projectId", auth, isAdmin, removeUserFromProject);
export default router;
