import { Request, Response, NextFunction, Router } from "express";
import { getUsers, getUser } from "../controllers/dashboardController";
import { auth } from "../middleware/authMiddleware";
const router = Router();

router.get("/getUsers", getUsers);

router.get("/me", auth, getUser);

export default router;
