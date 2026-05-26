// backend/routes/adminRoutes.js
import express from 'express';
import { adminLogin, adminDashboard } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Public admin login
router.post('/login', adminLogin);

// Protected admin dashboard (admin only)
router.get('/dashboard', protect, admin, adminDashboard);

export default router;
