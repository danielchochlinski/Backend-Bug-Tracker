import { Request, Response, NextFunction, Router } from "express";
const {
  registerUser,
  loginUser,
  getUsers,
} = require("../controllers/authController");
// const router = require("express").Router();
const router = Router();

router.post("/register", registerUser);
// const { name, surname, email, password } = req.body;);
router.post("/login", loginUser);

router.get("/getUsers", getUsers);

module.exports = router;
