// backend/controllers/adminController.js
import asyncHandler from 'express-async-handler';
import Admin from '../database/models/Admin.js';
import generateToken from '../utils/generateToken.js';

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const match = await admin.matchPassword(password);
  if (!match) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = generateToken(admin._id, admin.role);
  res.json({ token, admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
});

// @desc    Admin dashboard placeholder (protected)
// @route   GET /api/admin/dashboard
// @access  Private (admin only)
export const adminDashboard = asyncHandler(async (req, res) => {
  // In a real app you would pull analytics, stats, etc.
  res.json({ message: 'Welcome to the admin dashboard', adminId: req.user.id });
});
