import express from 'express';
import Order from '../database/models/Order.js';
import Promo from '../database/models/Promo.js';
import Driver from '../database/models/Driver.js';
import { verifyToken } from './auth.js';

const router = express.Router();

// Seed initial promos if DB is empty
const seedInitialPromos = async () => {
  const count = await Promo.countDocuments();
  if (count === 0) {
    console.log('🌱 Seeding default promotions...');
    await Promo.create({
      code: 'STMSALAM2',
      discountType: 'flat',
      discountValue: 2.00,
      minOrder: 10.00,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year
    });
  }
};
seedInitialPromos();

// List of SSE active clients
let activeClients = [];

// Broadcast status/location changes to active streams
export const broadcastOrderUpdate = (orderId, orderData) => {
  activeClients.forEach(client => {
    if (client.orderId === orderId) {
      client.res.write(`data: ${JSON.stringify(orderData)}\n\n`);
    }
  });
};

// PLACE new order
router.post('/', async (req, res) => {
  const { customer, items, subtotal, deliveryFee, discount, total, mode, payment, notes } = req.body;
  
  if (!customer || !items || !items.length || subtotal === undefined || total === undefined) {
    return res.status(400).json({ error: 'Missing order parameters' });
  }

  // Generate order tracking ID & 4 digit OTP
  const orderId = 'STM-' + Math.floor(100000 + Math.random() * 900000);
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  try {
    const isCod = payment?.method === 'cash';
    const order = new Order({
      id: orderId,
      customer,
      items,
      subtotal,
      deliveryFee,
      discount,
      total,
      mode,
      payment: {
        method: payment?.method || 'paynow',
        status: isCod ? 'pending' : 'completed', // Assume online is completed mock for checkout
        transactionId: payment?.transactionId || `TXN-${Date.now()}`
      },
      notes,
      status: 'placed',
      otp
    });

    await order.save();
    console.log(`✨ Order ${orderId} created with OTP ${otp}`);

    res.status(201).json({ success: true, orderId, order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET customer orders
router.get('/customer', verifyToken(['customer']), async (req, res) => {
  try {
    const orders = await Order.find({ 'customer.email': req.user.email }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single order details
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findOne({ id: req.params.id }).populate('driverId', 'name phone vehicleType vehiclePlate status currentLocation');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Real-time tracking stream (SSE)
router.get('/:id/tracking-stream', (req, res) => {
  const orderId = req.params.id;

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });

  const client = { orderId, res };
  activeClients.push(client);

  req.on('close', () => {
    activeClients = activeClients.filter(c => c !== client);
  });
});

// VALIDATE Promo Code
router.post('/validate-promo', async (req, res) => {
  const { code, amount } = req.body;
  if (!code) return res.status(400).json({ error: 'Promo code required' });

  try {
    const promo = await Promo.findOne({ code: code.toUpperCase(), active: true });
    if (!promo) return res.status(404).json({ error: 'Promo code invalid or inactive' });

    if (new Date() > promo.expiresAt) {
      return res.status(410).json({ error: 'Promo code expired' });
    }

    if (amount < promo.minOrder) {
      return res.status(422).json({ error: `Minimum subtotal required is SGD ${promo.minOrder.toFixed(2)}` });
    }

    res.json({
      success: true,
      discountType: promo.discountType,
      discountValue: promo.discountValue,
      code: promo.code
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADMIN/DRIVER status patch
router.patch('/:id/status', async (req, res) => {
  const { status, driverId } = req.body;
  if (!status) return res.status(400).json({ error: 'Status required' });

  try {
    const updateFields = { status };
    if (driverId) updateFields.driverId = driverId;

    const order = await Order.findOneAndUpdate(
      { id: req.params.id },
      { $set: updateFields },
      { new: true }
    ).populate('driverId', 'name phone vehicleType vehiclePlate status currentLocation');

    if (!order) return res.status(404).json({ error: 'Order not found' });

    // Push to SSE streams
    broadcastOrderUpdate(order.id, order);

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
