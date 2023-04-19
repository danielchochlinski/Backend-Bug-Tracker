import { Router } from "express";

import { auth } from "../middleware/authMiddleware";
import {
  acceptInviteToProjectRegistration,
  inviteToProject,
} from "../controllers/auth/inviteAuth/inviteAuthController";
import { isProjectAdmin } from "../middleware/adminMiddleware";
// const router = require("express").Router();
const router = Router();

//api/registration
router.post("/project/:projectId/invite", auth, isProjectAdmin, inviteToProject);

router.post("/project/:projectId", acceptInviteToProjectRegistration);
export default router;
