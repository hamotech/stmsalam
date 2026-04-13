import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

// Firebase Admin
import { db, firebaseReady } from './lib/firebase.js';

// Helper for Firestore with Timeout
const withTimeout = (promise, ms = 2500) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore Timeout')), ms))
  ]);
};

// Menu data (for seeding)
import { menuItems, categories, shopInfo, outlets } from '../frontend/src/data/menuData.js';

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'salam123stm';

// Optional Supabase setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
let supabase = null;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('✅ Supabase Connection: Active (Cloud Persistence)');
}

app.use(cors());
app.use(express.json());

// ============================================================
// SEEDING (Run once or check)
// ============================================================
const seedFirestore = async () => {
  if (!firebaseReady) {
    console.warn('⏩ Skipping Firestore Seeding: No Service Account provided.');
    return;
  }
  try {
    const catsRef = db.collection('categories');
    const catsSnap = await withTimeout(catsRef.limit(1).get());
    if (catsSnap.empty) {
      console.log('🌱 Seeding Categories to Firestore...');
      const batch = db.batch();
      categories.forEach(cat => {
        const docRef = catsRef.doc(cat.id || `cat-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`);
        batch.set(docRef, { ...cat, createdAt: new Date().toISOString() });
      });
      await batch.commit();
    }

    const prodsRef = db.collection('products');
    const prodsSnap = await withTimeout(prodsRef.limit(1).get());
    if (prodsSnap.empty) {
      console.log('🌱 Seeding Products to Firestore...');
      const batch = db.batch();
      menuItems.forEach(item => {
        const docRef = prodsRef.doc(item.id || `prod-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`);
        batch.set(docRef, { ...item, createdAt: new Date().toISOString() });
      });
      await batch.commit();
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
// ORDER ROUTES
// ============================================================

app.post('/api/orders', async (req, res) => {
  const { customer, items, total, mode, payment, notes } = req.body;
  const orderId = `STM-${Date.now()}`;
  
  try {
    const orderData = { 
      id: orderId, customer, items, total, mode, payment, notes, 
      status: 'Pending', order_status: 'pending',
      createdAt: new Date().toISOString() 
    };
    await db.collection('orders').doc(orderId).set(orderData);

    if (supabase) {
      await supabase.from('orders').insert([orderData]);
    }

    console.log(`📦 New Order Received: ${orderId}`);
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
  try {
    await db.collection('orders').doc(req.params.id).update({ 
      status, 
      order_status: status.toLowerCase(),
      updatedAt: new Date().toISOString()
    });
    if (supabase) {
      await supabase.from('orders').update({ status }).eq('id', req.params.id);
    }
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ============================================================
// DATA ROUTES
// ============================================================
app.get('/api/info', (req, res) => res.json({ shopInfo, outlets }));

app.get('/api/menu', async (req, res) => {
  if (!firebaseReady) return res.json(menuItems); // Immediate local fallback
  try {
    const snap = await withTimeout(db.collection('products').get());
    const products = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(products);
  } catch (err) {
    console.warn('⚠️ Firestore Menu Query failed, falling back to local data:', err.message);
    res.json(menuItems); 
  }
});

app.get('/api/categories', async (req, res) => {
  if (!firebaseReady) return res.json(categories); // Immediate local fallback
  try {
    const snap = await withTimeout(db.collection('categories').get());
    const categoriesList = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(categoriesList);
  } catch (err) {
    console.warn('⚠️ Firestore Categories Query failed, falling back to local data:', err.message);
    res.json(categories);
  }
});

app.listen(PORT, () => console.log(`\n🚀 STM Backend (Firestore) Listening on PORT ${PORT}`));
