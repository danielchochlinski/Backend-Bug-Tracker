import { Router } from 'express';
import { auth } from '../middleware/authMiddleware';
import { userAuthProject } from '../middleware/projectAuthMiddleware';
import { createTask, deleteTask, getSingleTask, getTasks, updateTask } from '../controllers/taskController';
const router = Router();
//tickets rout
//api/organization/:orgId/project/:projectId/task/:taskId
router.get("/organization/:orgId/project/:projectId/task/:taskId", auth, userAuthProject, getSingleTask)

router.get("/organization/:orgId/project/:projectId/task", auth, userAuthProject, getTasks)
router.post("/organization/:orgId/project/:projectId/task", auth,userAuthProject, createTask )
router.delete("/organization/:orgId/project/:projectId/task/:taskId", auth, userAuthProject, deleteTask)
router.patch("/organization/:orgId/project/:projectId/task/:taskId", auth,userAuthProject, updateTask )


export default router;
