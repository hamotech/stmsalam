// backend/controllers/authController.js
import asyncHandler from 'express-async-handler';
import User from '../database/models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register new customer
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const user = await User.create({ name, email, phone, password, role: 'customer' });
  const token = generateToken(user._id, user.role);
  res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role } });
});

// @desc    Login user (customer, admin or driver)
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const match = await user.matchPassword(password);
  if (!match) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = generateToken(user._id, user.role);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

// @desc    Logout (client should discard token)
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {
  // Stateless JWT – just inform client to delete token
  res.json({ message: 'Logged out' });
});

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private (any authenticated user)
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});
