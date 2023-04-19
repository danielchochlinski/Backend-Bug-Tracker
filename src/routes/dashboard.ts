import { Router } from 'express';
import { getUsers, getUser, updateUser, updateUserPassword } from '../controllers/dashboardController';
import { auth } from '../middleware/authMiddleware';
const router = Router();

//api/dashboard/get-user
router.get('/get-user', getUsers);

//api/dashboard/me
router.get('/me', auth, getUser);

//api/dashboard/update-me
router.post('/update-me', auth, updateUser);

//api/dashboard/update-password
router.post('/update-password', auth, updateUserPassword);

export default router;
