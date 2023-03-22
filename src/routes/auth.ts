import { Request, Response, NextFunction, Router } from "express";
import { registerUser, loginUser, getUsers, getUser } from "../controllers/authController";
// import { auth } from "../middleware/authMiddleware";
// const router = require("express").Router();
const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/getUsers", getUsers);

router.get("/me", getUser);

export default router;
