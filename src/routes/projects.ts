import { Router } from 'express';
import { auth } from '../middleware/authMiddleware';
import { createProject, deleteProject, getProjects, getSingleProject } from '../controllers/projectController';
import {
  addUserToProject,
  removeUserFromProject,
  updateProjectAuth
} from '../controllers/roleProjectControllers/adminProjectControllers';
import { isOrgAdmin, isProjectAdmin } from '../middleware/adminMiddleware';
import { checkUserProjects, checkUserSingleProject } from '../middleware/projectAuthMiddleware';
// import { auth } from "../middleware/authMiddleware";

const router = Router();

router.post('/organization/:orgId/project', auth, isOrgAdmin, createProject);
router.get('/organization/:orgId/projects', auth, checkUserProjects, getProjects);
router.get("/organization/:orgId/project/:projectId", auth, checkUserSingleProject, getSingleProject)
router.delete('/organization/project/:projectId', auth,isOrgAdmin, deleteProject);



//Admin Project Routes
router.post('/organization/:orgId/project/:projectId/user', auth, isProjectAdmin, addUserToProject);

router.patch('/organization/:orgId/project/:projectId/user', auth, isProjectAdmin, updateProjectAuth);

router.patch('/organization/:orgId/project/:projectId/remove-user', auth, isProjectAdmin, removeUserFromProject);

export default router;
