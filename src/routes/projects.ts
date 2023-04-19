import { Router } from 'express';
import { auth } from '../middleware/authMiddleware';
import { createProject, deleteProject, getProjects } from '../controllers/projectController';
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
router.get('/organization/:orgId/project/project/:projectId', auth, projectAuth, getProjects);
router.delete('/organization/project/:projectId', auth,isOrgAdmin, deleteProject);



//Admin Project Routes
//api/organization/:orgId/project/:projectId/user
router.post('/organization/:orgId/project/:projectId/user', auth, isProjectAdmin, addUserToProject);

//api/organization/:orgId/project/:projectId/user
router.patch('/organization/:orgId/project/:projectId/user', auth, isProjectAdmin, updateProjectAuth);

//api/organization/:orgId/project/:projectId/remove-user
router.patch('/organization/:orgId/project/:projectId/remove-user', auth, isProjectAdmin, removeUserFromProject);
export default router;
