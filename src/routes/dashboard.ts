import { Router } from "express";
import {
  getUsers,
  getUser,
  updateUser,
  updateUserPassword,
} from "../controllers/dashboardController";
import { auth } from "../middleware/authMiddleware";
const router = Router();

//api/dashboard
router.get("/getUsers", getUsers);

router.get("/me", auth, getUser);

router.post("/update-me", auth, updateUser);

router.post("/update-password", auth, updateUserPassword);

export default router;
