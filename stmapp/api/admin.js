import express from 'express';
import Order from '../database/models/Order.js';
import User from '../database/models/User.js';
import Driver from '../database/models/Driver.js';
import Promo from '../database/models/Promo.js';
import { verifyToken } from './auth.js';

const router = express.Router();

// GET Admin Dashboard aggregated statistics
router.get('/dashboard-stats', verifyToken(['admin']), async (req, res) => {
  try {
    // 1. Total revenue (completed online payments + delivered COD orders)
    const ordersPaid = await Order.find({ 'payment.status': 'completed', status: { $ne: 'cancelled' } });
    const totalRevenue = ordersPaid.reduce((acc, o) => acc + o.total, 0);

    // 2. Counts
    const totalOrdersCount = await Order.countDocuments();
    const pendingOrdersCount = await Order.countDocuments({ status: { $in: ['placed', 'confirmed', 'preparing', 'ready', 'out_for_delivery'] } });
    const onlineDriversCount = await Driver.countDocuments({ status: { $in: ['online', 'delivering'] } });
    const totalCustomersCount = await User.countDocuments();

    // 3. Recent 5 orders for dashboard table
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // 4. Category-wise sales volumes for charts
    const categorySales = await Order.aggregate([
      { $match: { status: 'delivered' } },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.name',
          totalQty: { $sum: '$items.qty' },
          totalSales: { $sum: { $multiply: ['$items.price', '$items.qty'] } }
        }
      },
      { $sort: { totalSales: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      success: true,
      stats: {
        totalRevenue,
        totalOrdersCount,
        pendingOrdersCount,
        onlineDriversCount,
        totalCustomersCount
      },
      recentOrders,
      categorySales
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET All orders (with query status support)
router.get('/orders', verifyToken(['admin']), async (req, res) => {
  const { status } = req.query;
  try {
    const filter = {};
    if (status) filter.status = status;
    const orders = await Order.find(filter).sort({ createdAt: -1 }).populate('driverId', 'name phone');
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET All registered customers
router.get('/users', verifyToken(['admin']), async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET All drivers and locations
router.get('/drivers', verifyToken(['admin']), async (req, res) => {
  try {
    const drivers = await Driver.find({}, '-password').sort({ createdAt: -1 });
    res.json({ success: true, drivers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET active promo codes
router.get('/promos', verifyToken(['admin']), async (req, res) => {
  try {
    const promos = await Promo.find().sort({ createdAt: -1 });
    res.json({ success: true, promos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create promo code
router.post('/promos', verifyToken(['admin']), async (req, res) => {
  const { code, discountType, discountValue, minOrder, expiresAt } = req.body;
  if (!code || !discountValue || !expiresAt) {
    return res.status(400).json({ error: 'Missing promo inputs' });
  }

  try {
    const existing = await Promo.findOne({ code: code.toUpperCase() });
    if (existing) return res.status(409).json({ error: 'Promo code already exists' });

    const promo = new Promo({
      code: code.toUpperCase(),
      discountType,
      discountValue: parseFloat(discountValue),
      minOrder: parseFloat(minOrder || 0),
      expiresAt: new Date(expiresAt)
    });

    await promo.save();
    res.status(201).json({ success: true, promo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE promo code
router.delete('/promos/:id', verifyToken(['admin']), async (req, res) => {
  try {
    const deleted = await Promo.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Promo code not found' });
    res.json({ success: true, message: 'Promo code deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
