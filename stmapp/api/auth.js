import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../database/models/User.js';
import Driver from '../database/models/Driver.js';
import Admin from '../database/models/Admin.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'stmappsalampremiumsecretkey9876';

// Middleware to verify JWT token and role
export const verifyToken = (roles = []) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: 'Access forbidden. Insufficient permissions.' });
      }

      next();
    } catch (err) {
      res.status(400).json({ error: 'Invalid token.' });
    }
  };
};

// --- CUSTOMER AUTH ---

// Register Customer
router.post('/register', async (req, res) => {
  const { name, email, password, phone, defaultAddress } = req.body;
  if (!name || !email || !password || !phone) {
    return res.status(400).json({ error: 'Missing mandatory fields' });
  }

  try {
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      defaultAddress: defaultAddress || ''
    });

    await user.save();
    const token = jwt.sign({ id: user._id, email: user.email, role: 'customer' }, JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, defaultAddress: user.defaultAddress }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Customer
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing credentials' });

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id, email: user.email, role: 'customer' }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        defaultAddress: user.defaultAddress,
        dietaryPreferences: user.dietaryPreferences,
        notificationPreferences: user.notificationPreferences
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- ADMIN AUTH ---

// Register Admin (Optional secure registration using Admin Secret Key)
router.post('/admin/register', async (req, res) => {
  const { name, email, password, adminSecret } = req.body;
  const SECRET = process.env.ADMIN_SECRET_KEY || 'stmappadminsecuredaccesskey123';
  
  if (adminSecret !== SECRET) {
    return res.status(403).json({ error: 'Forbidden. Invalid admin registration key.' });
  }

  try {
    const existing = await Admin.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ error: 'Admin already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const adminUser = new Admin({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'manager'
    });

    await adminUser.save();
    res.status(201).json({ success: true, message: 'Admin account created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Admin
router.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const adminUser = await Admin.findOne({ email: email.toLowerCase() });
    if (!adminUser) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, adminUser.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: adminUser._id, email: adminUser.email, role: 'admin', adminRole: adminUser.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({
      success: true,
      token,
      user: { id: adminUser._id, name: adminUser.name, email: adminUser.email, role: 'admin', adminRole: adminUser.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- DRIVER AUTH ---

// Register Driver
router.post('/driver/register', async (req, res) => {
  const { name, email, password, phone, vehicleType, vehiclePlate } = req.body;
  if (!name || !email || !password || !phone) {
    return res.status(400).json({ error: 'Missing mandatory fields' });
  }

  try {
    const existing = await Driver.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ error: 'Driver already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const driver = new Driver({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      vehicleType,
      vehiclePlate
    });

    await driver.save();
    res.status(201).json({ success: true, message: 'Driver registered successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Driver
router.post('/driver/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const driver = await Driver.findOne({ email: email.toLowerCase() });
    if (!driver) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, driver.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: driver._id, email: driver.email, role: 'driver' }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      success: true,
      token,
      user: { id: driver._id, name: driver.name, email: driver.email, phone: driver.phone, status: driver.status, earnings: driver.earnings }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
