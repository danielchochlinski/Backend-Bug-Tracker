import { Router } from 'express';
import { auth } from '../middleware/authMiddleware';
import { createProject, deleteProject, getProject } from '../controllers/projectController';
import {
  addUserToProject,
  removeUserFromProject,
  updateProjectAuth
} from '../controllers/roleProjectControllers/adminProjectControllers';
import { isOrgAdmin, isProjectAdmin } from '../middleware/adminMiddleware';
import { projectAuth } from '../middleware/projectAuthMiddleware';
// import { auth } from "../middleware/authMiddleware";

const router = Router();

//api/organization/:orgId/project
router.post('/organization/:orgId/project', auth, isOrgAdmin, createProject);

//api/organization/:orgId/project
router.get('/organization/:orgId/project/project/:projectId', auth, projectAuth, getProject);
router.delete('/project/:projectId', auth, deleteProject);

//api/organization/:orgId/project/:projectId/user
router.post('/organization/:orgId/project/:projectId/add-user', auth, isProjectAdmin, addUserToProject);

//api/organization/:orgId/project/:projectId/user
router.patch('/admin/update-auth/:projectId', auth, isProjectAdmin, updateProjectAuth);

//api/organization/:orgId/project/:projectId/remove-user
router.patch('/admin/remove-user/:projectId', auth, isProjectAdmin, removeUserFromProject);
export default router;
