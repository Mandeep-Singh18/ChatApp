import express from 'express';
import { login, logout, profileUpdate, signup } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.put('/profile-update', profileUpdate);

export default router;