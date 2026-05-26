// backend/routes/driverRoutes.js
import express from 'express';
import { loginDriver, getDriverProfile } from '../controllers/driverController.js';
import { protect } from '../middleware/authMiddleware.js';
import { driver } from '../middleware/driverMiddleware.js';

const router = express.Router();

// Public route: driver login
router.post('/login', loginDriver);

// Protected route: driver profile (example)
router.get('/profile', protect, driver, getDriverProfile);

export default router;
