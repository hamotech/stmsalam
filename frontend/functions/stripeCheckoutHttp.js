/**
 * Stripe Checkout (HTTPS) + webhook.
 * Secrets ONLY: firebase functions:secrets:set STRIPE_SECRET_KEY | STRIPE_WEBHOOK_SECRET
 * Optional param: STRIPE_PUBLIC_BASE_URL (defineString, not a Stripe API secret)
 * Do not use process.env or .env for Stripe keys in this package.
 */

const admin = require('firebase-admin');
const express = require('express');
const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret, defineString } = require('firebase-functions/params');
const Stripe = require('stripe');

const STRIPE_API_VERSION = '2024-06-20';

const STRIPE_SECRET_KEY = defineSecret('STRIPE_SECRET_KEY');
const STRIPE_WEBHOOK_SECRET = defineSecret('STRIPE_WEBHOOK_SECRET');
const stripePublicBaseUrl = defineString('STRIPE_PUBLIC_BASE_URL', {
  default: 'https://teh-tarik-app-my-own.web.app',
});

const REGION = 'us-central1';

/* ---------------- SAFE STRIPE SECRET HANDLING ---------------- */

function normalizeStripeApiSecret(raw) {
  const key = String(raw || '').trim();

  if (!key) return '';

  // HARD FAIL if corrupted formatting exists
  if (key.includes('\n') || key.includes('\r')) {
    throw new Error(
      'Stripe secret is corrupted (contains newline). Re-save Secret Manager as single-line sk_test_/sk_live_ value.'
    );
  }

  return key;
}

function newStripeClientFromTrimmedSecretKey(trimmedKey) {
  const secret = normalizeStripeApiSecret(trimmedKey);

  if (!secret) {
    const err = new Error(
      'Missing STRIPE_SECRET_KEY: bind defineSecret STRIPE_SECRET_KEY to this function.'
    );
    err.code = 'stripe_config';
    throw err;
  }

  if (!secret.startsWith('sk_')) {
    const err = new Error(
      'Invalid Stripe secret key (must start with sk_). Check Secret Manager value.'
    );
    err.code = 'stripe_config';
    throw err;
  }

  if (secret.length > 512) {
    const err = new Error(
      'STRIPE_SECRET_KEY too long — ensure only one Stripe key is stored.'
    );
    err.code = 'stripe_config';
    throw err;
  }

  return new Stripe(secret.trim(), {
    apiVersion: STRIPE_API_VERSION,
  });
}

/* ---------------- EXISTING LOGIC (UNCHANGED) ---------------- */

function hasPaidAtField(d) {
  const p = d && typeof d === 'object' ? d.paidAt : null;
  return p != null && p !== '';
}

function isOrderFinanciallySettled(d) {
  if (!d || typeof d !== 'object') return false;
  if (d.status === 'paid' || d.paymentStatus === 'PAID') return true;
  if (hasPaidAtField(d)) return true;
  return false;
}

function checkoutSessionUrlReuseAllowed(session, nowSec) {
  if (!session || typeof session !== 'object') return false;
  if (session.status !== 'open' || !session.url) return false;
  if (session.payment_status === 'paid') return false;
  if (typeof session.expires_at !== 'number' || session.expires_at <= nowSec) {
    return false;
  }
  return true;
}

function resolveOrderIdFromStripeEvent(event) {
  const t = event && event.type;
  if (t === 'checkout.session.completed') {
    const s = event.data && event.data.object;
    return (
      String((s && s.metadata && s.metadata.orderId) || '').trim() ||
      String((s && s.client_reference_id) || '').trim()
    );
  }
  if (t === 'payment_intent.succeeded' || t === 'payment_intent.payment_failed') {
    const pi = event.data && event.data.object;
    return String((pi && pi.metadata && pi.metadata.orderId) || '').trim();
  }
  if (t === 'invoice.paid') {
    const inv = event.data && event.data.object;
    return String((inv && inv.metadata && inv.metadata.orderId) || '').trim();
  }
  return '';
}

function extractPaymentIntentIdFromSession(session) {
  if (!session || typeof session !== 'object') return '';
  const raw = session.payment_intent;
  if (typeof raw === 'string') return raw.trim();
  if (raw && typeof raw === 'object' && raw.id) return String(raw.id).trim();
  return '';
}

async function applyStripeWebhookPaidOrder(db, orderId, patchExtras) {
  const ref = db.collection('orders').doc(orderId);
  const snap = await ref.get();
  if (!snap.exists) {
    console.warn('[stripeWebhook] Order not found:', orderId);
    return;
  }
  const d = snap.data() || {};
  const ps = String(d.paymentStatus || '').toLowerCase();
  if (ps === 'paid') {
    console.log('[stripeWebhook] Skip duplicate paid update:', orderId);
    return;
  }

  const merge = {
    paymentStatus: 'paid',
    status: 'confirmed',
    paidAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  if (patchExtras.stripeCheckoutSessionId) {
    merge.stripeCheckoutSessionId = patchExtras.stripeCheckoutSessionId;
  }
  if (patchExtras.paymentIntentId) {
    merge.paymentIntentId = patchExtras.paymentIntentId;
  }
  await ref.set(merge, { merge: true });
}

async function applyStripeWebhookFailedOrder(db, orderId) {
  const ref = db.collection('orders').doc(orderId);
  const snap = await ref.get();
  if (!snap.exists) {
    console.warn('[stripeWebhook] Order not found:', orderId);
    return;
  }
  const d = snap.data() || {};
  const ps = String(d.paymentStatus || '').toLowerCase();
  if (ps === 'paid') {
    console.log('[stripeWebhook] Skip failure update (already paid):', orderId);
    return;
  }
  await ref.set(
    {
      paymentStatus: 'failed',
      status: 'payment_failed',
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
}

async function handleStripeWebhookEvent(event, db) {
  const orderId = resolveOrderIdFromStripeEvent(event);

  console.log('Webhook event:', event.type);
  console.log('OrderId:', orderId || '(none)');

  if (!orderId) {
    console.warn('[stripeWebhook] No orderId on event:', event.type);
    return;
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const paidOk = session && session.payment_status === 'paid';
    if (!paidOk) {
      console.log(
        '[stripeWebhook] checkout.session.completed but payment not settled yet (payment_status:',
        session && session.payment_status,
        ') — awaiting payment_intent.succeeded'
      );
      return;
    }
    await applyStripeWebhookPaidOrder(db, orderId, {
      stripeCheckoutSessionId: session.id,
      paymentIntentId: extractPaymentIntentIdFromSession(session),
    });
    return;
  }

  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object;
    await applyStripeWebhookPaidOrder(db, orderId, {
      paymentIntentId: pi && pi.id ? pi.id : '',
    });
    return;
  }

  if (event.type === 'payment_intent.payment_failed') {
    await applyStripeWebhookFailedOrder(db, orderId);
  }
}

/* ---------------- STRIPE CHECKOUT (HTTPS) ---------------- */
/* CORS allowlist: http://localhost:5173, http://127.0.0.1:5173, https://*.web.app, https://*.firebaseapp.com */
/* Routing: Gen2 per-function Cloud Run URL uses path "/". Some clients use "/createStripeCheckout" (cloudfunctions.net style). POST is accepted on BOTH — routing only; Stripe logic unchanged. */

const CHECKOUT_ALLOWED_ORIGINS = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://teh-tarik-app-my-own.web.app',
  'https://teh-tarik-app-my-own.firebaseapp.com',
]);

/** Manual CORS (keep cors:false on onRequest to avoid conflicting headers). */
function checkoutCorsAllowOrigin(req) {
  const origin = String(req.headers.origin || '').trim();
  if (!origin) return '';
  if (CHECKOUT_ALLOWED_ORIGINS.has(origin)) return origin;
  try {
    const { hostname } = new URL(origin);
    if (hostname.endsWith('.web.app') || hostname.endsWith('.firebaseapp.com')) {
      return origin;
    }
  } catch {
    return '';
  }
  return '';
}

function applyCreateStripeCheckoutCors(req, res) {
  const allow = checkoutCorsAllowOrigin(req);
  if (!allow) return;
  res.set('Access-Control-Allow-Origin', allow);
  res.set('Vary', 'Origin');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );
  res.set('Access-Control-Max-Age', '3600');
}

function readJsonBody(req) {
  if (req.body == null) return {};
  if (typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return req.body && typeof req.body === 'object' ? req.body : {};
  }
  const raw = Buffer.isBuffer(req.body)
    ? req.body.toString('utf8')
    : String(req.body);
  if (!raw.trim()) return {};
  return JSON.parse(raw);
}

function roundMoney(n) {
  return Math.round(Number(n) * 100) / 100;
}

function normalizeOrderItemsFromDoc(rawItems) {
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    throw new Error('Order has no line items');
  }
  if (rawItems.length > 200) {
    throw new Error('Too many line items');
  }
  return rawItems.map((it, idx) => {
    const row = it && typeof it === 'object' ? it : {};
    const name =
      typeof row.name === 'string' && row.name.trim()
        ? row.name.trim().slice(0, 500)
        : `Item ${idx + 1}`;
    const qtyRaw =
      row.qty !== undefined && row.qty !== null
        ? row.qty
        : row.quantity !== undefined && row.quantity !== null
          ? row.quantity
          : 1;
    const qtyNum = Number(qtyRaw);
    const priceNum = Number(row.price);
    if (!Number.isFinite(priceNum) || priceNum < 0) {
      throw new Error(`Invalid stored price for "${name}"`);
    }
    const qty = Number.isFinite(qtyNum)
      ? Math.max(1, Math.min(999, Math.floor(qtyNum)))
      : 1;
    return { name, qty, price: roundMoney(priceNum) };
  });
}

function buildLineItemsForStripe(items) {
  return items.map((it) => ({
    quantity: it.qty,
    price_data: {
      currency: 'sgd',
      product_data: {
        name: it.name.slice(0, 120),
      },
      unit_amount: Math.round(roundMoney(it.price) * 100),
    },
  }));
}

function getPublicBaseUrl() {
  let base = '';
  try {
    base = String(stripePublicBaseUrl.value() || '').trim();
  } catch {
    base = '';
  }
  if (!base) {
    base = 'https://teh-tarik-app-my-own.web.app';
  }
  return base.replace(/\/$/, '');
}

async function createStripeCheckoutPostHandler(req, res) {
  console.log('METHOD:', req.method);
  console.log('URL:', req.url);

  let body;
  try {
    body = readJsonBody(req);
  } catch {
    res.status(400).json({ error: 'Invalid JSON body' });
    return;
  }

  const orderId =
      typeof body.orderId === 'string' ? body.orderId.trim() : '';
    const customerName =
      typeof body.customerName === 'string'
        ? body.customerName.trim().slice(0, 200)
        : '';
    if (!orderId || !customerName) {
      res.status(400).json({ error: 'Missing orderId or customerName' });
      return;
    }

    const authHeader = req.headers.authorization || '';
    const bearerMatch = authHeader.match(/^Bearer\s+(.+)$/i);
    if (!bearerMatch) {
      res.status(401).json({ error: 'Missing Authorization Bearer token' });
      return;
    }

    let uid;
    try {
      const decoded = await admin.auth().verifyIdToken(bearerMatch[1]);
      uid = decoded.uid;
    } catch (e) {
      res.status(401).json({ error: 'Invalid or expired token' });
      return;
    }

    let stripeKeyRaw;
    try {
      void String(STRIPE_WEBHOOK_SECRET.value() || '').trim();
      stripeKeyRaw = String(STRIPE_SECRET_KEY.value() || '').trim();
    } catch (secErr) {
      console.error('[createStripeCheckout]', {
        orderId,
        errorReason: 'stripe_secret_read_failed',
        message: secErr?.message,
      });
      res.status(503).json({ error: 'Stripe configuration unavailable' });
      return;
    }

    let stripe;
    try {
      stripe = newStripeClientFromTrimmedSecretKey(stripeKeyRaw);
    } catch (e) {
      console.error('[createStripeCheckout]', {
        orderId,
        errorReason: 'stripe_client_init_failed',
        message: e?.message,
      });
      res.status(503).json({ error: e.message || 'Stripe misconfigured' });
      return;
    }

    const db = admin.firestore();
    const orderRef = db.collection('orders').doc(orderId);

    let orderSnap;
    try {
      orderSnap = await orderRef.get();
    } catch (e) {
      console.error('[createStripeCheckout]', {
        orderId,
        errorReason: 'firestore_read_failed',
        message: e?.message,
      });
      res.status(500).json({ error: 'Could not load order' });
      return;
    }

    if (!orderSnap.exists) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    const order = orderSnap.data() || {};

    if (order.userId !== uid) {
      res.status(403).json({ error: 'Order does not belong to this user' });
      return;
    }

    const base = getPublicBaseUrl();
    const encodedOid = encodeURIComponent(orderId);
    const stripeSuccessRedirectUrl = `${base}/order-tracking/${encodedOid}?payment=success`;
    const stripeCancelRedirectUrl = `${base}/order-tracking/${encodedOid}?payment=cancel`;

    if (isOrderFinanciallySettled(order)) {
      res.status(200).json({ url: stripeSuccessRedirectUrl });
      return;
    }

    if (order.status !== 'pending_payment') {
      res.status(400).json({ error: 'Order is not awaiting payment' });
      return;
    }

    const orderCustomer = String(order.customerName || '').trim();
    if (
      orderCustomer &&
      orderCustomer.toLowerCase() !== customerName.toLowerCase()
    ) {
      res.status(400).json({ error: 'Customer name mismatch' });
      return;
    }

    let lineItemsSource;
    try {
      lineItemsSource = normalizeOrderItemsFromDoc(order.items);
    } catch (e) {
      res.status(400).json({ error: e.message || 'Invalid order items' });
      return;
    }

    const backendTotal = roundMoney(
      lineItemsSource.reduce(
        (sum, it) => sum + roundMoney(it.qty * it.price),
        0
      )
    );
    const storedTotal = roundMoney(Number(order.totalAmount));
    if (
      !Number.isFinite(storedTotal) ||
      Math.abs(backendTotal - storedTotal) > 0.02
    ) {
      res.status(400).json({ error: 'Order total mismatch' });
      return;
    }

    const line_items = buildLineItemsForStripe(lineItemsSource);

    let session;
    try {
      session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items,
        success_url: stripeSuccessRedirectUrl,
        cancel_url: stripeCancelRedirectUrl,
        client_reference_id: orderId,
        metadata: { orderId },
        payment_intent_data: {
          metadata: { orderId },
        },
      });
    } catch (e) {
      console.error('[createStripeCheckout]', {
        orderId,
        errorReason: 'stripe_session_create_failed',
        message: e?.message,
        code: e?.code,
      });
      res.status(502).json({
        error: e.message || 'Could not create Stripe Checkout session',
      });
      return;
    }

    if (!session.url) {
      res.status(502).json({ error: 'Stripe returned no checkout URL' });
      return;
    }

    try {
      await orderRef.set(
        {
          stripeCheckoutSessionId: session.id,
          stripeCheckoutLock: false,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    } catch (e) {
      console.error('[createStripeCheckout]', {
        orderId,
        sessionId: session.id,
        errorReason: 'firestore_update_failed',
        message: e?.message,
      });
      res.status(500).json({ error: 'Could not save checkout session' });
      return;
    }

    console.log('[createStripeCheckout]', {
      orderId,
      sessionId: session.id,
      amount: backendTotal,
    });

  res.status(200).json({ url: session.url });
}

const createStripeCheckoutApp = express();
createStripeCheckoutApp.disable('x-powered-by');
createStripeCheckoutApp.use((req, res, next) => {
  applyCreateStripeCheckoutCors(req, res);
  next();
});
createStripeCheckoutApp.options(['/', '/createStripeCheckout'], (req, res) => {
  res.status(204).send('');
});
createStripeCheckoutApp.post(
  ['/', '/createStripeCheckout'],
  express.json({ limit: '512kb' }),
  createStripeCheckoutPostHandler
);

const createStripeCheckout = onRequest(
  {
    region: REGION,
    cors: false,
    invoker: 'public',
    memory: '256MiB',
    timeoutSeconds: 60,
    secrets: [STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET],
  },
  createStripeCheckoutApp
);

/* ---------------- WEBHOOK (Stripe → Firestore) ---------------- */

const stripeWebhookApp = express();

stripeWebhookApp.post(
  '/',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    let webhookSecret;
    let apiSecret;

    try {
      webhookSecret = String(STRIPE_WEBHOOK_SECRET.value() || '').trim();
      apiSecret = String(STRIPE_SECRET_KEY.value() || '').trim();
    } catch (e) {
      console.error('Webhook error:', e && e.message ? e.message : e);
      res.status(503).send('Service unavailable');
      return;
    }

    const stripe = newStripeClientFromTrimmedSecretKey(apiSecret);

    let event;
    try {
      const rawBody =
        Buffer.isBuffer(req.body) ? req.body : Buffer.from(String(req.body || ''), 'utf8');
      event = stripe.webhooks.constructEvent(
        rawBody,
        req.headers['stripe-signature'],
        String(webhookSecret || '').trim()
      );
    } catch (err) {
      console.error('Webhook error:', err && err.message ? err.message : err);
      res.status(400).send(`Webhook signature verification failed: ${err.message}`);
      return;
    }

    const db = admin.firestore();

    try {
      await handleStripeWebhookEvent(event, db);
    } catch (err) {
      console.error('Webhook error:', err && err.message ? err.message : err);
    }

    res.status(200).send('OK');
  }
);

const stripeWebhook = onRequest(
  {
    region: REGION,
    cors: false,
    invoker: 'public',
    memory: '256MiB',
    timeoutSeconds: 60,
    secrets: [STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET],
  },
  stripeWebhookApp
);

module.exports = {
  createStripeCheckout,
  stripeWebhook,
};