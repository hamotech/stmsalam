// routes/userRoutes.js
import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Registration
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Get profile (protected)
router.get('/profile', protect, getUserProfile);

export default router;
