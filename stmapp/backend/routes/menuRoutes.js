// backend/routes/menuRoutes.js
import express from 'express';
import {
  createMenu,
  updateMenu,
  deleteMenu,
  getMenus,
  getMenuById,
} from '../controllers/menuController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';
import rateLimiter from '../middleware/rateLimitMiddleware.js';

const router = express.Router();

// Apply rate limiting to all routes
router.use(rateLimiter);

// Public routes
router.get('/', getMenus);
router.get('/:id', getMenuById);

// Admin protected routes
router.post('/', protect, admin, createMenu);
router.put('/:id', protect, admin, updateMenu);
router.delete('/:id', protect, admin, deleteMenu);

export default router;
