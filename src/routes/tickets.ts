import { Router } from "express";
import { auth } from "../middleware/authMiddleware";
import {
  createTicket,
  deleteTicket,
  updateTicket,
} from "../controllers/ticketController";
const router = Router();
//api/ticket
router.post("/:projectId/create-ticket", auth, createTicket);
router.put("/:projectId/ticket/:ticketId", auth, updateTicket);
router.delete("/:projectId/ticket/:ticketId", auth, deleteTicket);
export default router;
