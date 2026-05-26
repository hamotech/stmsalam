// backend/controllers/menuController.js
import asyncHandler from 'express-async-handler';
import Menu from '../models/Menu.js';
import generateToken from '../utils/generateToken.js'; // not used here but keep for consistency

// @desc    Create a menu item (admin only)
// @route   POST /api/menu
// @access  Private (admin)
export const createMenu = asyncHandler(async (req, res) => {
  const { name, description, category, image, price, halalStatus, availability, tags } = req.body;
  const menu = await Menu.create({ name, description, category, image, price, halalStatus, availability, tags });
  res.status(201).json(menu);
});

// @desc    Update a menu item (admin only)
// @route   PUT /api/menu/:id
// @access  Private (admin)
export const updateMenu = asyncHandler(async (req, res) => {
  const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!menu) {
    return res.status(404).json({ message: 'Menu item not found' });
  }
  res.json(menu);
});

// @desc    Delete a menu item (admin only)
// @route   DELETE /api/menu/:id
// @access  Private (admin)
export const deleteMenu = asyncHandler(async (req, res) => {
  const menu = await Menu.findByIdAndDelete(req.params.id);
  if (!menu) {
    return res.status(404).json({ message: 'Menu item not found' });
  }
  res.json({ message: 'Menu item removed' });
});

// @desc    Get all menu items (public) with filtering, search, pagination
// @route   GET /api/menu
// @access  Public
export const getMenus = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, category, search } = req.query;
  const query = {};
  if (category) query.category = category;
  if (search) query.name = { $regex: search, $options: 'i' };

  const menus = await Menu.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  const total = await Menu.countDocuments(query);
  res.json({ total, page: parseInt(page), pages: Math.ceil(total / limit), menus });
});

// @desc    Get single menu item by ID (public)
// @route   GET /api/menu/:id
// @access  Public
export const getMenuById = asyncHandler(async (req, res) => {
  const menu = await Menu.findById(req.params.id);
  if (!menu) {
    return res.status(404).json({ message: 'Menu item not found' });
  }
  res.json(menu);
});
