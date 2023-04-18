import { Router } from "express";
import {
  registerUser,
  loginUser,
  verifyEmail,
} from "../controllers/auth/authController";

// const router = require("express").Router();
const router = Router();

//api/user
router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/verify-email", verifyEmail);

export default router;
