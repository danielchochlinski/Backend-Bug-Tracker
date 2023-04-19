import { Router } from "express";
import { auth } from "../middleware/authMiddleware";
import { createOrganization } from "../controllers/organizationController";

// const router = require("express").Router();
const router = Router();

//api/organization
router.post("/organization", auth, createOrganization);

export default router;
