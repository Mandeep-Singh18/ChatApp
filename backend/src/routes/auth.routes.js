import express from 'express';
import { checkAuth, login, logout, profileUpdate, signup } from '../controllers/auth.controllers.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.put('/profile-update', protectRoute ,profileUpdate);
router.get('/check-auth', protectRoute, checkAuth);

export default router;