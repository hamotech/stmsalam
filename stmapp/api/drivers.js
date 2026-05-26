import express from 'express';
import Order from '../database/models/Order.js';
import Driver from '../database/models/Driver.js';
import { verifyToken } from './auth.js';
import { broadcastOrderUpdate } from './orders.js';

const router = express.Router();

// GET available delivery jobs (Orders placed/preparing/ready with mode='delivery' and no driver assigned)
router.get('/available-jobs', verifyToken(['driver']), async (req, res) => {
  try {
    const jobs = await Order.find({
      mode: 'delivery',
      status: { $in: ['placed', 'confirmed', 'preparing', 'ready'] },
      driverId: null
    }).sort({ createdAt: -1 });

    res.json({ success: true, jobs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET driver current status & stats
router.get('/stats', verifyToken(['driver']), async (req, res) => {
  try {
    const driver = await Driver.findById(req.user.id);
    if (!driver) return res.status(404).json({ error: 'Driver profile not found' });
    res.json({
      success: true,
      stats: {
        name: driver.name,
        email: driver.email,
        phone: driver.phone,
        status: driver.status,
        earnings: driver.earnings,
        rating: driver.rating,
        tripCount: driver.tripCount,
        vehicleType: driver.vehicleType,
        vehiclePlate: driver.vehiclePlate
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH Toggle Driver Online/Offline
router.patch('/toggle-status', verifyToken(['driver']), async (req, res) => {
  const { status } = req.body;
  if (!['online', 'offline'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status mode' });
  }

  try {
    const driver = await Driver.findByIdAndUpdate(
      req.user.id,
      { $set: { status } },
      { new: true }
    );
    res.json({ success: true, status: driver.status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST Accept Delivery Job
router.post('/accept-job', verifyToken(['driver']), async (req, res) => {
  const { orderId } = req.body;
  if (!orderId) return res.status(400).json({ error: 'OrderID required' });

  try {
    const order = await Order.findOne({ id: orderId });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    if (order.driverId) return res.status(409).json({ error: 'Delivery already accepted by another driver' });

    order.driverId = req.user.id;
    order.status = 'confirmed';
    await order.save();

    await Driver.findByIdAndUpdate(req.user.id, { $set: { status: 'delivering' } });

    // Populate driver info and broadcast via SSE
    const updatedOrder = await Order.findOne({ id: orderId }).populate('driverId');
    broadcastOrderUpdate(order.id, updatedOrder);

    res.json({ success: true, order: updatedOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST Update Order Status by Driver
router.post('/update-order-status', verifyToken(['driver']), async (req, res) => {
  const { orderId, status } = req.body;
  if (!['ready', 'out_for_delivery'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status update by driver' });
  }

  try {
    const order = await Order.findOneAndUpdate(
      { id: orderId, driverId: req.user.id },
      { $set: { status } },
      { new: true }
    ).populate('driverId');

    if (!order) return res.status(404).json({ error: 'Job not found or unassociated' });

    broadcastOrderUpdate(order.id, order);
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST Stream Live Location / Coordinates update
router.post('/update-coordinates', verifyToken(['driver']), async (req, res) => {
  const { lat, lng, orderId } = req.body;
  if (lat === undefined || lng === undefined) {
    return res.status(400).json({ error: 'Latitude and Longitude required' });
  }

  try {
    // 1. Update Driver profile coords
    await Driver.findByIdAndUpdate(req.user.id, {
      $set: { 'currentLocation.lat': lat, 'currentLocation.lng': lng }
    });

    // 2. If orderId specified, update active order driver Location and broadcast
    if (orderId) {
      const order = await Order.findOneAndUpdate(
        { id: orderId, driverId: req.user.id },
        { $set: { 'driverLocation.lat': lat, 'driverLocation.lng': lng } },
        { new: true }
      ).populate('driverId');
      
      if (order) {
        broadcastOrderUpdate(orderId, order);
      }
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST Complete Delivery Job (using OTP verification)
router.post('/complete-job', verifyToken(['driver']), async (req, res) => {
  const { orderId, otp } = req.body;
  if (!orderId || !otp) return res.status(400).json({ error: 'OrderID and OTP required' });

  try {
    const order = await Order.findOne({ id: orderId, driverId: req.user.id });
    if (!order) return res.status(404).json({ error: 'Active delivery job not found' });

    if (order.otp !== otp.trim()) {
      return res.status(403).json({ error: 'Invalid Delivery OTP verification code' });
    }

    // Order successfully verified and completed
    order.status = 'delivered';
    order.payment.status = 'completed';
    await order.save();

    // Increment driver stats (Trip count and $5 delivery earnings per order)
    await Driver.findByIdAndUpdate(req.user.id, {
      $inc: { earnings: 5.00, tripCount: 1 },
      $set: { status: 'online' }
    });

    const completedOrder = await Order.findOne({ id: orderId }).populate('driverId');
    broadcastOrderUpdate(orderId, completedOrder);

    res.json({ success: true, message: 'Order successfully delivered!', order: completedOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET Completed jobs history
router.get('/history', verifyToken(['driver']), async (req, res) => {
  try {
    const history = await Order.find({
      driverId: req.user.id,
      status: 'delivered'
    }).sort({ createdAt: -1 });

    res.json({ success: true, history });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
