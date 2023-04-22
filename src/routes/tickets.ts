import { Router } from 'express';
import { auth } from '../middleware/authMiddleware';
import { createTicket, deleteTicket, getSingleTicket, getTickets, updateTicket } from '../controllers/ticketController';
import { userAuthProject } from '../middleware/projectAuthMiddleware';
const router = Router();
//api/ticket
router.get('/organization/:orgId/project/:projectId/task/:taskId/ticket/:ticketId', auth, userAuthProject, getSingleTicket);

router.get('/organization/:orgId/project/:projectId/task/:taskId/tickets', auth, userAuthProject, getTickets);
router.post('/organization/:orgId/project/:projectId/task/:taskId/ticket', auth, userAuthProject, createTicket);
router.put('/organization/:orgId/project/:projectId/task/:taskId/ticket/:ticketId', auth, userAuthProject,updateTicket);
router.delete('/organization/:orgId/project/:projectId/task/:taskId/ticket/:ticketId', auth,userAuthProject, deleteTicket);
export default router;
