import { Request, Response, NextFunction, Router } from "express";
const router = Router();
router.get("/dashboard", (req: Request, res: Response) => {
  res.send("dashboard");
});
export default router;
