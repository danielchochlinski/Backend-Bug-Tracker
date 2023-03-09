import { Request, Response, NextFunction, Router } from "express";

// const router = require("express").Router();
const router = Router();
router.post("/register", (req: Request, res: Response) => {
  res.send("register");
});
router.post("/login", (req: any, res: any) => {
  res.send("login");
});

module.exports = router;
