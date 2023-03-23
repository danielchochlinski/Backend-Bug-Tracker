import { Router } from "express";
import {
  registerUser,
  loginUser,
  verifyEmail,
} from "../controllers/authController";

import { auth } from "../middleware/authMiddleware";
// const router = require("express").Router();
const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/verify-email", verifyEmail);

export default router;
