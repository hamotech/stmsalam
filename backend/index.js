import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

// Firebase Admin
import admin, { db, rtdb, firebaseReady } from './lib/firebase.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const orderStateMachine = require('../frontend/functions/shared/orderStateMachine.core.cjs');
const createOrderStateGuard = require('../frontend/functions/shared/orderStateGuard.cjs');
const createOrderTransitionService = require('../frontend/functions/shared/orderTransitionService.cjs');
const { PAYMENT_MODE, normalizePaymentMode } = require('../frontend/functions/shared/paymentConstants.cjs');

const orderStateGuard = createOrderStateGuard({
  assertValidOrderTransition: orderStateMachine.assertValidOrderTransition,
  assertPaymentConsistency: orderStateMachine.assertPaymentConsistency,
});

const transitionService = createOrderTransitionService({
  admin,
  readCanonicalOrderStatusStrict: orderStateMachine.readCanonicalOrderStatusStrict,
  normalizeOrderStateForRead: orderStateMachine.normalizeOrderStateForRead,
  assertPaymentConsistency: orderStateMachine.assertPaymentConsistency,
  assertTransitionAuthorized: orderStateGuard.assertTransitionAuthorized,
});

const performOrderTransition = transitionService.performOrderTransition;

// Menu data & Parser (Now using local standalone copies for production)
import dynamicMenu from './data/dynamicMenu.js';
import { menuItems, categories, shopInfo, outlets } from './data/menuData.js';

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'salam123stm';

// Helper for Firestore with Timeout
const withTimeout = (promise, ms = 2500) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore Timeout')), ms))
  ]);
};

// Helper to parse filename (Duplicate of frontend logic for backend use)
const parseFileName = (fileName) => {
    const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
    const priceMatch = nameWithoutExt.match(/(\d+\.\d+)/);
    const price = priceMatch ? parseFloat(priceMatch[0]) : 0.00;
    let name = nameWithoutExt
        .replace(/\(.*?\)/g, '')
        .replace(/SGD|SDG/gi, '')
        .replace(/(\d+\.\d+)/g, '')
        .replace(/_/g, ' ')
        .trim();
    name = name.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    return { name: name || "Delicious Item", price: price };
};

// Process dynamicMenu into flat arrays for immediate use
const allDynamicItems = [];
const dynamicCategoriesList = [];
let _pCount = 0;

Object.entries(dynamicMenu).forEach(([catName, fileList]) => {
    const catId = catName.toLowerCase().replace(/\s+/g, '-');
    dynamicCategoriesList.push({
        id: catId,
        name: catName,
        image: `/SMT FOOD/SMT FOOD/${catName}/${fileList[0]}`,
        emoji: '🍽️',
        active: true
    });
    fileList.forEach(file => {
        const { name, price } = parseFileName(file);
        allDynamicItems.push({
            id: `dp-${_pCount++}`,
            categoryId: catId,
            name: name,
            price: price,
            image: `/SMT FOOD/SMT FOOD/${catName}/${file}`,
            description: `Authentic ${name} - prepared fresh.`,
            prepTime: 15,
            active: true
        });
    });
});

// Optional Supabase setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
let supabase = null;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('✅ Supabase Connection: Active (Cloud Persistence)');
}

// Configured CORS for production and development
const allowedOrigins = [
  'https://stmsalam.sg',
  'https://teh-tarik-app-my-own.web.app',
  'https://teh-tarik-app-my-own.firebaseapp.com',
  'http://10.0.2.2',
  'http://10.0.2.2:5000',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
];
const envOrigins = (process.env.ALLOWED_ORIGIN || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const isLocalhostDev = /^http:\/\/localhost:\d+$/.test(origin);
    const isAllowed =
      allowedOrigins.includes(origin) ||
      envOrigins.includes(origin) ||
      isLocalhostDev;

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ============================================================
// SEEDING (Comprehensive from Dynamic Menu)
// ============================================================
const seedFirestore = async () => {
  if (!firebaseReady) {
    console.warn('⏩ Skipping Firestore Seeding: No Service Account provided.');
    return;
  }
  try {
    const catsRef = db.collection('categories');
    const prodsRef = db.collection('products');

    const catsSnap = await withTimeout(catsRef.limit(1).get());
    const prodsSnap = await withTimeout(prodsRef.limit(1).get());

    if (catsSnap.empty || prodsSnap.empty) {
      console.log('🌱 Starting Comprehensive Seeding from Dynamic Menu...');
      
      const catBatch = db.batch();
      const prodBatch = db.batch();
      
      let prodCount = 0;

      for (const [catName, fileList] of Object.entries(dynamicMenu)) {
        const catId = catName.toLowerCase().replace(/\s+/g, '-');
        
        // Use the first item's image as the category image
        const firstItemFile = fileList[0];
        const catImg = `/SMT FOOD/SMT FOOD/${catName}/${firstItemFile}`;

        // Add Category
        const catDoc = catsRef.doc(catId);
        catBatch.set(catDoc, {
          id: catId,
          name: catName,
          image: catImg,
          emoji: '🍽️',
          active: true,
          createdAt: new Date().toISOString()
        });

        // Add Products for this category
        fileList.forEach(file => {
          const { name, price } = parseFileName(file);
          const prodId = `p-${Date.now()}-${prodCount++}`;
          const prodDoc = prodsRef.doc(prodId);
          prodBatch.set(prodDoc, {
            id: prodId,
            categoryId: catId,
            name: name,
            price: price,
            image: `/SMT FOOD/SMT FOOD/${catName}/${file}`,
            description: `Authentic ${name} - prepared fresh.`,
            prepTime: 15,
            active: true,
            badge: null,
            createdAt: new Date().toISOString()
          });
        });
      }

      await catBatch.commit();
      await prodBatch.commit();
      console.log('✅ Seeding Complete: Categories and Products synced.');
    }
  } catch (err) {
    console.error('❌ Firestore Seeding error:', err.message);
  }
};
seedFirestore();

// ============================================================
// AUTH ROUTES
// ============================================================

app.post('/api/auth/register', async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });

  try {
    const userRef = db.collection('users').doc(email);
    const existing = await userRef.get();
    if (existing.exists) return res.status(409).json({ error: 'User exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { name, email, phone, password: hashedPassword, createdAt: new Date().toISOString() };
    await userRef.set(userData);

    if (supabase) {
      await supabase.from('users').insert([userData]);
    }

    const { password: _, ...user } = userData;
    return res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing credentials' });

  try {
    const userRef = db.collection('users').doc(email);
    const userDoc = await userRef.get();
    if (!userDoc.exists) return res.status(401).json({ error: 'Invalid credentials' });

    const user = userDoc.data();
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const { password: _, ...safeUser } = user;
    const token = jwt.sign({ id: email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, user: safeUser, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// MIDDLEWARE
// ============================================================
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 9999;
  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;
  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; 
}

const sendPushNotification = async (token, title, body) => {
  if (!token) return;
  try {
    await admin.messaging().send({
      token,
      notification: { title, body }
    });
  } catch(err) {
    console.error('FCM Send Error:', err);
  }
}

// ============================================================
// ADMIN DRIVER MANAGEMENT ROUTES
// ============================================================

app.post('/api/admin/drivers', async (req, res) => {
  const { name, phone, password, role, vehicleDetails, activeStatus } = req.body;
  let { email } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
  email = email.trim().toLowerCase();

  try {
    const userRef = db.collection('users').doc(email);
    const existing = await userRef.get();
    if (existing.exists) return res.status(409).json({ error: 'User exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      name, email, phone, password: hashedPassword,
      role: role || 'driver',
      vehicleDetails: vehicleDetails || '',
      activeStatus: activeStatus !== false,
      isActive: true, // as requested
      status: activeStatus !== false ? 'active' : 'inactive',
      createdAt: new Date().toISOString()
    };
    await userRef.set(userData);

    const { password: _, ...user } = userData;
    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/admin/drivers/:email', async (req, res) => {
  const { name, phone, password, role, vehicleDetails, activeStatus } = req.body;
  const email = req.params.email.trim().toLowerCase();
  try {
    const userRef = db.collection('users').doc(email);
    const existing = await userRef.get();
    if (!existing.exists) return res.status(404).json({ error: 'User not found' });

    const updates = { name, phone, role, vehicleDetails, activeStatus, status: activeStatus ? 'active' : 'inactive' };
    if (password) {
      updates.password = await bcrypt.hash(password, 10);
    }
    
    await userRef.update(updates);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/drivers/:email', async (req, res) => {
  try {
    await db.collection('users').doc(req.params.email).delete();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin/fleet', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Unauthorized' });
  try {
    const locSnap = await rtdb.ref('live_locations').once('value');
    const locations = locSnap.val() || {};
    
    const ridersSnap = await db.collection('riders').get();
    const riders = {};
    ridersSnap.forEach(doc => { riders[doc.id] = doc.data() });

    const usersSnap = await db.collection('users').where('role', 'in', ['driver', 'rider']).get();
    const users = {};
    usersSnap.forEach(doc => { users[doc.id] = doc.data() });

    const fleet = [];
    Object.keys(locations).forEach(driverId => {
      fleet.push({
        driverId,
        location: locations[driverId],
        profile: riders[driverId] || {},
        user: users[driverId] || {}
      });
    });
    return res.json({ success: true, orderId, status });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post('/api/driver/reject', authenticateToken, async (req, res) => {
  const { orderId, driverId } = req.body;
  if (req.user.id !== driverId) return res.status(403).json({ error: 'Unauthorized' });
  if (!orderId) return res.status(400).json({ error: 'orderId required' });
  
  try {
    const orderRef = db.collection('orders').doc(orderId);
    const doc = await orderRef.get();
    if (!doc.exists) return res.status(404).json({ error: 'Order not found' });
    
    const data = doc.data();
    const dispatchState = data.dispatchState || { rejectedBy: [] };
    
    if (dispatchState.offeredTo === driverId) {
      dispatchState.rejectedBy = [...(dispatchState.rejectedBy || []), driverId];
      dispatchState.offeredTo = null;
      dispatchState.offeredAt = null;
      await orderRef.update({ dispatchState });
    }
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// ============================================================
// AUTO DISPATCH BACKGROUND TASK
// ============================================================

setInterval(async () => {
  try {
    const ordersSnap = await db.collection('orders')
      .where('status', 'in', ['placed', 'preparing', 'ready_for_pickup'])
      .get();
      
    if (ordersSnap.empty) return;

    let onlineRiders = null;
    let liveLocations = null;

    for (const doc of ordersSnap.docs) {
      const data = doc.data();
      if (data.assignedRiderId) continue;
      
      const dispatchState = data.dispatchState || { rejectedBy: [], fallback: false };
      if (dispatchState.fallback) continue; // Already in manual fallback

      let needsNewDriver = false;

      if (dispatchState.offeredTo) {
        const elapsed = Date.now() - (dispatchState.offeredAt || 0);
        if (elapsed > 25000) { // 25s timeout
          dispatchState.rejectedBy.push(dispatchState.offeredTo);
          dispatchState.offeredTo = null;
          dispatchState.offeredAt = null;
          needsNewDriver = true;
        }
      } else {
        needsNewDriver = true;
      }

      if (needsNewDriver) {
        if (!onlineRiders) {
          const ridersSnap = await db.collection('riders').where('status', '==', 'online').get();
          onlineRiders = ridersSnap.docs.map(d => ({ id: d.id, ...d.data() }));
          const locSnap = await rtdb.ref('live_locations').once('value');
          liveLocations = locSnap.val() || {};
        }

        const restaurantLat = 1.3521; // Hardcoded default for STM Salam
        const restaurantLng = 103.8198; 
        
        let nearestDriver = null;
        let minDistance = Infinity;

        for (const rider of onlineRiders) {
          if (dispatchState.rejectedBy.includes(rider.id)) continue;
          
          const loc = liveLocations[rider.id];
          if (!loc) continue; // Skip drivers without GPS

          const dist = calculateDistance(restaurantLat, restaurantLng, loc.latitude, loc.longitude);
          if (dist < minDistance) {
            minDistance = dist;
            nearestDriver = rider;
          }
        }

        if (nearestDriver) {
          dispatchState.offeredTo = nearestDriver.id;
          dispatchState.offeredAt = Date.now();
          await doc.ref.update({ dispatchState });
          
          if (nearestDriver.fcmToken) {
            await sendPushNotification(nearestDriver.fcmToken, 'New Delivery Assigned!', 'You have 25 seconds to accept.');
          }
        } else {
          // No more drivers available, fallback to manual board
          dispatchState.fallback = true;
          await doc.ref.update({ dispatchState });
        }
      }
    }
  } catch (err) {
    console.error('Auto Dispatch Error:', err);
  }
}, 10000); // run every 10 seconds

// ============================================================
// START SERVER & RIDER ROUTES (Live Tracking & Auth)
// ============================================================

app.post('/api/driver/login', async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing credentials' });
  email = email.trim().toLowerCase();

  try {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', email).limit(1).get();
    if (snapshot.empty) {
      // Fallback: try checking by document ID just in case the email field is missing but ID is email
      const docFallback = await db.collection('users').doc(email).get();
      if (!docFallback.exists) return res.status(401).json({ error: 'Invalid credentials' });
      var userDoc = docFallback;
    } else {
      var userDoc = snapshot.docs[0];
    }
    
    const userRef = db.collection('users').doc(userDoc.id);

    const user = userDoc.data();
    if (user.role !== 'driver' && user.role !== 'rider') {
      return res.status(403).json({ error: 'Access Denied. Not a driver.' });
    }
    if (user.activeStatus === false || user.status === 'inactive' || user.isActive === false) {
      return res.status(403).json({ error: 'Access Denied. Contact Admin.' });
    }

    let isMatch = false;
    
    console.log('[DEBUG] Login attempt for driver:', email);
    console.log('[DEBUG] Located driver:', !!userDoc.exists);

    try {
      isMatch = await bcrypt.compare(password, user.password);
      console.log('[DEBUG] bcrypt.compare result:', isMatch);
    } catch (err) {
      console.log('[DEBUG] bcrypt error (could be plain-text):', err.message);
    }

    // Temporary compatibility logic for old plain-text passwords
    if (!isMatch && password === user.password) {
      console.log('[DEBUG] Plain-text password matched. Migrating to bcrypt...');
      isMatch = true;
      const newHashedPassword = await bcrypt.hash(password, 10);
      await userRef.update({ password: newHashedPassword });
      console.log('[DEBUG] Database silently updated with new hashed password.');
    }

    if (!isMatch) {
      console.log('[DEBUG] Password validation failed.');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('[DEBUG] JWT token generated successfully.');

    const { password: _, ...safeUser } = user;
    const token = jwt.sign({ id: email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, user: safeUser, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/admin/login', async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing credentials' });
  email = email.trim().toLowerCase();

  try {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', email).limit(1).get();
    if (snapshot.empty) {
      // Fallback: try checking by document ID just in case the email field is missing but ID is email
      const docFallback = await db.collection('users').doc(email).get();
      if (!docFallback.exists) return res.status(401).json({ error: 'Invalid credentials' });
      var userDoc = docFallback;
    } else {
      var userDoc = snapshot.docs[0];
    }
    
    const userRef = db.collection('users').doc(userDoc.id);

    const user = userDoc.data();
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Access Denied. Not an admin.' });
    }
    
    // Admins may not have activeStatus defined, but if they do, check it
    if (user.activeStatus === false || user.status === 'inactive' || user.isActive === false) {
      return res.status(403).json({ error: 'Access Denied. Account inactive.' });
    }

    let isMatch = false;
    try {
      isMatch = await bcrypt.compare(password, user.password);
    } catch (err) {
      console.log('[DEBUG] bcrypt error (could be plain-text):', err.message);
    }

    if (!isMatch && password === user.password) {
      isMatch = true;
      const newHashedPassword = await bcrypt.hash(password, 10);
      await userRef.update({ password: newHashedPassword });
    }

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const { password: _, ...safeUser } = user;
    const token = jwt.sign({ id: email, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, user: safeUser, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/driver/location', authenticateToken, async (req, res) => {
  const { driverId, latitude, longitude } = req.body;
  
  if (req.user.id !== driverId) {
    return res.status(403).json({ error: 'Unauthorized location update' });
  }

  if (!driverId || latitude === undefined || longitude === undefined) {
    return res.status(400).json({ error: 'Missing location data' });
  }
  try {
    const locRef = rtdb.ref(`live_locations/${driverId}`);
    await locRef.set({
      latitude,
      longitude,
      updatedAt: admin.database.ServerValue.TIMESTAMP
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/driver/location/:id', async (req, res) => {
  try {
    const locRef = rtdb.ref(`live_locations/${req.params.id}`);
    const snapshot = await locRef.once('value');
    if (!snapshot.exists()) return res.status(404).json({ error: 'Location not found' });
    res.json({ success: true, data: snapshot.val() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/driver/status', authenticateToken, async (req, res) => {
  const { orderId, status, driverId } = req.body;

  if (req.user.id !== driverId && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Unauthorized status update' });
  }

  if (!orderId || !status) return res.status(400).json({ error: 'orderId and status required' });
  try {
    // Map to existing endpoint logic if needed, or update firestore directly for simplicity
    const orderRef = db.collection('orders').doc(orderId);
    
    const EVENT_MAP = {
      placed: 'ORDER_ACCEPTED',
      preparing: 'ORDER_PREPARING',
      ready_for_pickup: 'ORDER_READY_FOR_PICKUP',
      out_for_delivery: 'ORDER_OUT_FOR_DELIVERY',
      delivered: 'ORDER_DELIVERED',
      cancelled: 'ORDER_CANCELLED',
      refunded: 'ADMIN_REFUND_APPROVED'
    };
    
    const eventType = EVENT_MAP[status.trim().toLowerCase()] || status;
    
    await performOrderTransition({
      db,
      orderRef,
      actor: 'driver',
      actorUid: req.body.driverId || 'unknown',
      event: { type: eventType },
      metadata: { source: 'driver_api_status_update', patch: {} }
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// ORDER ROUTES
// ============================================================

app.post('/api/orders', async (req, res) => {
  const { customer, items, total, mode, payment, notes } = req.body;
  const orderId = `STM-${Date.now()}`;
  
  try {
    const rawMethod = String(payment?.method ?? payment?.mode ?? payment ?? '').trim();
    const canonicalMethod = normalizePaymentMode(rawMethod);

    const orderData = { 
      id: orderId, customer, items, total, mode, payment, notes,
      // Canonical FSM initial state — single source of truth.
      status: (canonicalMethod === PAYMENT_MODE.COD || canonicalMethod === PAYMENT_MODE.SCANNER) ? 'placed' : 'pending_payment',
      paymentStatus: (canonicalMethod === PAYMENT_MODE.COD) ? 'NOT_APPLICABLE' : 'PENDING',
      paymentMethod: canonicalMethod,
      paymentMode: canonicalMethod,
      createdAt: new Date().toISOString() 
    };
    await db.collection('orders').doc(orderId).set(orderData);

    if (supabase) {
      await supabase.from('orders').insert([orderData]);
    }

    console.log(`📦 New Order Received: ${orderId} (${canonicalMethod})`);
    res.status(201).json({ success: true, orderId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const snap = await db.collection('orders').orderBy('createdAt', 'desc').get();
    const orders = snap.docs.map(doc => doc.data());
    res.json({ total: orders.length, orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const doc = await db.collection('orders').doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: 'Not found' });
    res.json(doc.data());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/orders/:id/status', async (req, res) => {
  const { status } = req.body;
  if (!status || typeof status !== 'string') {
    return res.status(400).json({ error: 'status is required' });
  }
  const nextStatus = status.trim().toLowerCase();
  
  const EVENT_MAP = {
    placed: 'ORDER_ACCEPTED',
    preparing: 'ORDER_PREPARING',
    ready_for_pickup: 'ORDER_READY_FOR_PICKUP',
    out_for_delivery: 'ORDER_OUT_FOR_DELIVERY',
    delivered: 'ORDER_DELIVERED',
    cancelled: 'ORDER_CANCELLED',
    refunded: 'ADMIN_REFUND_APPROVED'
  };

  const eventType = EVENT_MAP[nextStatus];
  if (!eventType) {
    return res.status(400).json({ error: `Invalid status. Allowed: ${Object.keys(EVENT_MAP).join(', ')}` });
  }
  
  try {
    const orderRef = db.collection('orders').doc(req.params.id);
    
    // Use the canonical FSM transition service for ALL status updates.
    // This enforces atomic reads, transition validation, and consistency guards.
    await performOrderTransition({
      db,
      orderRef,
      actor: 'admin',
      actorUid: null, // Admin API context
      event: { type: eventType },
      metadata: {
        source: 'backend_api_patch',
        patch: {} // No direct field mutations allowed for admin via patch metadata
      }
    });

    if (supabase) {
      await supabase.from('orders').update({ status: nextStatus }).eq('id', req.params.id);
    }
    res.json({ success: true });
  } catch (err) {
    console.error('[PATCH ORDER ERROR]', err);
    res.status(400).json({ error: err.message });
  }
});

// ============================================================
// DATA ROUTES
// ============================================================
app.get('/api/info', (req, res) => res.json({ shopInfo, outlets }));

app.get('/api/menu', async (req, res) => {
  if (!firebaseReady) return res.json(allDynamicItems); // Use full dynamic menu
  try {
    const snap = await withTimeout(db.collection('products').get());
    const products = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(products);
  } catch (err) {
    console.warn('⚠️ Firestore Menu Query failed, falling back to local data:', err.message);
    res.json(allDynamicItems); 
  }
});

app.get('/api/categories', async (req, res) => {
  if (!firebaseReady) return res.json(dynamicCategoriesList); // Use fall dynamic categories
  try {
    const snap = await withTimeout(db.collection('categories').get());
    const categoriesList = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(categoriesList);
  } catch (err) {
    console.warn('⚠️ Firestore Categories Query failed, falling back to local data:', err.message);
    res.json(dynamicCategoriesList);
  }
});

app.post('/api/products', async (req, res) => {
  const prod = req.body;
  if (!prod.id) prod.id = `stm-prod-${Date.now()}`;
  try {
    if (firebaseReady) {
      await db.collection('products').doc(prod.id).set({ ...prod, createdAt: new Date().toISOString() });
    } else {
      allDynamicItems.unshift({ ...prod, createdAt: new Date().toISOString() });
    }
    
    if (supabase) {
      await supabase.from('products').insert([prod]);
    }
    res.status(201).json({ success: true, product: prod });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/products/:id', async (req, res) => {
  try {
    if (firebaseReady) {
      await db.collection('products').doc(req.params.id).update({ ...req.body, updatedAt: new Date().toISOString() });
    } else {
      const idx = allDynamicItems.findIndex(p => p.id === req.params.id);
      if (idx !== -1) {
        allDynamicItems[idx] = { ...allDynamicItems[idx], ...req.body, updatedAt: new Date().toISOString() };
      }
    }
    
    if (supabase) {
      await supabase.from('products').update(req.body).eq('id', req.params.id);
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    if (firebaseReady) {
      await db.collection('products').doc(req.params.id).delete();
    } else {
      const idx = allDynamicItems.findIndex(p => p.id === req.params.id);
      if (idx > -1) allDynamicItems.splice(idx, 1);
    }
    
    if (supabase) {
      await supabase.from('products').delete().eq('id', req.params.id);
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => console.log(`\n🚀 STM Backend (Firestore) Listening on PORT ${PORT}`));
