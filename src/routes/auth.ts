import { Router } from 'express';
import { registerUser, loginUser, verifyEmail } from '../controllers/auth/authController';

// const router = require("express").Router();
const router = Router();

//api/register
router.post('/register', registerUser);

//api/login
router.post('/login', loginUser);

//api/verify-email
router.post('/verify-email', verifyEmail);

export default router;
