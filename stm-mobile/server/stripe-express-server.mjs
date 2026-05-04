/**
 * STM Stripe PaymentSheet API + verified payment completion (Express + Firebase Admin).
 *
 * NOTE: This is a **local / non-Firebase** Express server. Cloud Functions use Secret Manager
 * (`defineSecret`) only — see `frontend/functions/stripeCheckoutHttp.js`. Do not copy Functions
 * secrets into committed .env files.
 *
 * Routes:
 *   POST /create-checkout-session Body: { orderId, amount, success_url, cancel_url } → hosted Checkout for **web**
 *   POST /verify-checkout-session  Body: { orderId, sessionId } → mark order PAID (same rules as verify-payment)
 *   POST /payment-sheet    Body: { orderId, amount } → PaymentSheet secrets (mobile)
 *   POST /verify-payment   Body: { orderId, paymentIntentId } → orders PAID + mirror
 *   POST /qr-claim-payment Body: { orderId } → orders.qrCustomerClaimedAt (admin sets PAID later)
 *
 * Env:
 *   STRIPE_SECRET_KEY          (required)
 *   STRIPE_API_VERSION         (default 2024-11-20.acacia — match Stripe RN / dashboard)
 *   PORT                       (default 8788)
 *   STRIPE_VERIFY_BEARER_TOKEN (optional; verify-payment + default for qr-claim)
 *   QR_CLAIM_BEARER_TOKEN      (optional; overrides bearer for qr-claim only)
 *   Firebase: same as PayPal server (GOOGLE_APPLICATION_CREDENTIALS or default GCP creds)
 *
 * Run: cd server && node stripe-express-server.mjs
 */

import express from 'express';
import Stripe from 'stripe';
import admin from 'firebase-admin';
import { mirrorGrabOrderToPublicTracking } from './lib/mirrorGrabPublicTracking.mjs';

if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY ?? '';
const STRIPE_API_VERSION = process.env.STRIPE_API_VERSION ?? '2024-11-20.acacia';
const PORT = Number(process.env.PORT ?? 8788);
const VERIFY_BEARER = (process.env.STRIPE_VERIFY_BEARER_TOKEN ?? '').trim();
const QR_CLAIM_BEARER = (process.env.QR_CLAIM_BEARER_TOKEN ?? VERIFY_BEARER).trim();
const CURRENCY = 'sgd';
const ORDERS = 'orders';
const ADMIN_TOKENS = 'admin_push_tokens';

const stripe = STRIPE_SECRET_KEY
  ? new Stripe(STRIPE_SECRET_KEY, { apiVersion: STRIPE_API_VERSION })
  : null;

function logInfo(tag, meta = {}) {
  console.log(JSON.stringify({ level: 'info', tag, t: new Date().toISOString(), ...meta }));
}
function logError(tag, meta = {}) {
  console.error(JSON.stringify({ level: 'error', tag, t: new Date().toISOString(), ...meta }));
}

function normalizeAmountMajor(v) {
  const n = Number(v);
  if (!Number.isFinite(n) || n < 0) return null;
  return Number(n.toFixed(2));
}

function toLegacyTrackingStatus(orderStatus) {
  if (orderStatus === 'PLACED') return 'PENDING';
  if (orderStatus === 'CANCELLED') return 'CANCELLED';
  return orderStatus;
}

function requireVerifyAuth(req, res) {
  if (!VERIFY_BEARER) return true;
  const h = req.headers.authorization ?? '';
  const ok = h === `Bearer ${VERIFY_BEARER}`;
  if (!ok) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }
  return true;
}

function requireQrClaimAuth(req, res) {
  if (!QR_CLAIM_BEARER) return true;
  const h = req.headers.authorization ?? '';
  const ok = h === `Bearer ${QR_CLAIM_BEARER}`;
  if (!ok) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }
  return true;
}

async function notifyAdminsNewPaidOrder(orderId) {
  let tokens = [];
  try {
    const snap = await db.collection(ADMIN_TOKENS).get();
    tokens = snap.docs.map((d) => d.get('token')).filter((t) => typeof t === 'string' && t.length > 8);
  } catch (e) {
    logError('admin_tokens_read', { message: e instanceof Error ? e.message : String(e) });
    return;
  }
  if (!tokens.length) {
    logInfo('admin_fcm_skip', { reason: 'no_tokens' });
    return;
  }
  const short = orderId.length >= 8 ? orderId.slice(-8).toUpperCase() : orderId;
  try {
    const resp = await admin.messaging().sendEachForMulticast({
      tokens,
      notification: {
        title: `New Paid Order #${short}`,
        body: `Order ${orderId} — payment verified`,
      },
      data: { orderId, type: 'order_paid' },
    });
    logInfo('admin_fcm_sent', { success: resp.successCount, failure: resp.failureCount });
  } catch (e) {
    logError('admin_fcm_error', { message: e instanceof Error ? e.message : String(e) });
  }
}

const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  next();
});
app.use(express.json({ limit: '256kb' }));

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'stm-stripe' });
});

/**
 * Stripe Checkout (hosted page) for **website** — redirect customer to `url`.
 * Body: { orderId, amount (SGD major), success_url, cancel_url }
 * success_url should include `{CHECKOUT_SESSION_ID}` where Stripe substitutes the session id.
 */
app.post('/create-checkout-session', async (req, res) => {
  if (!stripe) {
    res.status(503).json({ error: 'Stripe not configured (STRIPE_SECRET_KEY).' });
    return;
  }
  try {
    const orderId = req.body?.orderId != null ? String(req.body.orderId).trim() : '';
    const amountMajor = normalizeAmountMajor(req.body?.amount);
    const success_url = req.body?.success_url != null ? String(req.body.success_url).trim() : '';
    const cancel_url = req.body?.cancel_url != null ? String(req.body.cancel_url).trim() : '';
    if (!orderId || amountMajor == null || !success_url || !cancel_url) {
      res.status(400).json({ error: 'orderId, amount, success_url, cancel_url required' });
      return;
    }
    if (!success_url.includes('{CHECKOUT_SESSION_ID}')) {
      res.status(400).json({ error: 'success_url must include {CHECKOUT_SESSION_ID}' });
      return;
    }
    const amountCents = Math.round(amountMajor * 100);
    if (amountCents < 50) {
      res.status(400).json({ error: 'amount too small' });
      return;
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      success_url,
      cancel_url,
      client_reference_id: orderId,
      metadata: { orderId },
      payment_intent_data: {
        metadata: { orderId },
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            unit_amount: amountCents,
            product_data: {
              name: `STM Salam order ${orderId}`,
            },
          },
        },
      ],
    });

    logInfo('checkout_session_created', { orderId, sessionId: session.id });
    if (!session.url) {
      res.status(500).json({ error: 'no_checkout_url' });
      return;
    }
    res.json({ url: session.url, sessionId: session.id });
  } catch (e) {
    logError('checkout_session_error', { message: e instanceof Error ? e.message : String(e) });
    res.status(500).json({ error: e instanceof Error ? e.message : 'checkout_session_failed' });
  }
});

/**
 * After Checkout redirect — confirms session paid and marks Firestore order (same rules as verify-payment).
 */
app.post('/verify-checkout-session', async (req, res) => {
  if (!requireVerifyAuth(req, res)) return;
  if (!stripe) {
    res.status(503).json({ error: 'Stripe not configured.' });
    return;
  }
  const orderId = req.body?.orderId != null ? String(req.body.orderId).trim() : '';
  const sessionId = req.body?.sessionId != null ? String(req.body.sessionId).trim() : '';
  if (!orderId || !sessionId || !sessionId.startsWith('cs_')) {
    res.status(400).json({ error: 'orderId and sessionId (cs_...) required' });
    return;
  }

  let shouldNotifyAdmin = false;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ['payment_intent'] });
    const metaOrder =
      session.metadata?.orderId != null ? String(session.metadata.orderId).trim() : '';
    if (metaOrder !== orderId) {
      res.status(400).json({ error: 'session_order_mismatch' });
      return;
    }
    if (session.payment_status !== 'paid') {
      res.status(400).json({ error: 'payment_not_complete', status: session.payment_status });
      return;
    }

    const paymentIntentId =
      typeof session.payment_intent === 'string'
        ? session.payment_intent
        : session.payment_intent && typeof session.payment_intent === 'object'
          ? session.payment_intent.id
          : '';
    if (!paymentIntentId || !paymentIntentId.startsWith('pi_')) {
      res.status(400).json({ error: 'missing_payment_intent' });
      return;
    }

    const existing = await db.collection(ORDERS).doc(orderId).get();
    if (existing.exists) {
      const ex = existing.data() ?? {};
      if (ex.paymentStatus === 'PAID' && ex.stripePaymentIntentId === paymentIntentId) {
        logInfo('verify_checkout_session_idempotent', { orderId, paymentIntentId });
        await mirrorGrabOrderToPublicTracking(db, orderId);
        res.json({ ok: true, orderId, idempotent: true });
        return;
      }
      if (ex.paymentStatus === 'PAID') {
        res.status(409).json({ error: 'already_paid' });
        return;
      }
    }

    const pi = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (pi.status !== 'succeeded') {
      res.status(400).json({ error: 'payment_not_succeeded', status: pi.status });
      return;
    }
    const metaOrderPi = pi.metadata?.orderId != null ? String(pi.metadata.orderId).trim() : '';
    if (metaOrderPi !== orderId) {
      res.status(400).json({ error: 'payment_intent_order_mismatch' });
      return;
    }
    if ((pi.currency || '').toLowerCase() !== CURRENCY) {
      res.status(400).json({ error: 'currency_mismatch' });
      return;
    }

    const piCents =
      typeof pi.amount_received === 'number' && pi.amount_received > 0
        ? pi.amount_received
        : pi.amount;

    await db.runTransaction(async (t) => {
      const oRef = db.collection(ORDERS).doc(orderId);
      const oSnap = await t.get(oRef);
      if (!oSnap.exists) {
        throw new Error('ORDER_NOT_FOUND');
      }
      const o = oSnap.data() ?? {};
      if (o.flow !== 'grab') {
        throw new Error('INVALID_ORDER_FLOW');
      }
      if (o.paymentMethod !== 'stripe') {
        throw new Error('ORDER_NOT_STRIPE');
      }
      if (o.paymentStatus === 'PAID') {
        if (o.stripePaymentIntentId === paymentIntentId) {
          return;
        }
        throw new Error('ALREADY_PAID');
      }

      const totalNum = Number(o.totalAmount ?? o.total ?? 0);
      if (!Number.isFinite(totalNum)) {
        throw new Error('ORDER_TOTAL_INVALID');
      }
      const orderCents = Math.round(Number(totalNum.toFixed(2)) * 100);
      if (orderCents !== piCents) {
        throw new Error('AMOUNT_MISMATCH');
      }

      const orderStatus = 'PLACED';
      const legacy = toLegacyTrackingStatus(orderStatus);

      const patch = {
        paymentStatus: 'PAID',
        orderStatus,
        status: legacy,
        stripePaymentIntentId: paymentIntentId,
        paymentVerifiedAt: FieldValue.serverTimestamp(),
        isNewForAdmin: true,
      };

      t.update(oRef, patch);

      shouldNotifyAdmin = true;
    });

    await mirrorGrabOrderToPublicTracking(db, orderId);

    if (shouldNotifyAdmin) {
      void notifyAdminsNewPaidOrder(orderId);
    }

    logInfo('verify_checkout_session_ok', { orderId, paymentIntentId });
    res.json({ ok: true, orderId });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg === 'ORDER_NOT_FOUND') {
      res.status(404).json({ error: 'order_not_found' });
      return;
    }
    if (msg === 'ALREADY_PAID') {
      res.status(409).json({ error: 'already_paid' });
      return;
    }
    if (
      msg === 'INVALID_ORDER_FLOW' ||
      msg === 'ORDER_NOT_STRIPE' ||
      msg === 'ORDER_TOTAL_INVALID' ||
      msg === 'AMOUNT_MISMATCH'
    ) {
      res.status(400).json({ error: msg.toLowerCase() });
      return;
    }
    logError('verify_checkout_session_error', { message: msg });
    res.status(500).json({ error: 'verify_failed' });
  }
});

/**
 * PaymentSheet secrets for mobile.
 */
app.post('/payment-sheet', async (req, res) => {
  if (!stripe) {
    res.status(503).json({ error: 'Stripe not configured (STRIPE_SECRET_KEY).' });
    return;
  }
  try {
    const orderId = req.body?.orderId != null ? String(req.body.orderId).trim() : '';
    const amountMajor = normalizeAmountMajor(req.body?.amount);
    if (!orderId || amountMajor == null) {
      res.status(400).json({ error: 'orderId and amount (SGD) required' });
      return;
    }
    const amountCents = Math.round(amountMajor * 100);
    if (amountCents < 50) {
      res.status(400).json({ error: 'amount too small' });
      return;
    }

    const customer = await stripe.customers.create({
      metadata: { orderId },
    });

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: STRIPE_API_VERSION }
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: CURRENCY,
      customer: customer.id,
      automatic_payment_methods: { enabled: true },
      metadata: { orderId },
    });

    logInfo('payment_sheet_created', { orderId, amountCents });

    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      paymentIntentId: paymentIntent.id,
    });
  } catch (e) {
    logError('payment_sheet_error', { message: e instanceof Error ? e.message : String(e) });
    res.status(500).json({ error: e instanceof Error ? e.message : 'payment_sheet_failed' });
  }
});

/**
 * Server-side verification — only path that marks order PAID for Stripe.
 */
app.post('/verify-payment', async (req, res) => {
  if (!requireVerifyAuth(req, res)) return;
  if (!stripe) {
    res.status(503).json({ error: 'Stripe not configured.' });
    return;
  }

  const orderId = req.body?.orderId != null ? String(req.body.orderId).trim() : '';
  const paymentIntentId =
    req.body?.paymentIntentId != null ? String(req.body.paymentIntentId).trim() : '';
  if (!orderId || !paymentIntentId || !paymentIntentId.startsWith('pi_')) {
    res.status(400).json({ error: 'orderId and paymentIntentId required' });
    return;
  }

  let shouldNotifyAdmin = false;

  try {
    const existing = await db.collection(ORDERS).doc(orderId).get();
    if (existing.exists) {
      const ex = existing.data() ?? {};
      if (ex.paymentStatus === 'PAID' && ex.stripePaymentIntentId === paymentIntentId) {
        logInfo('verify_payment_idempotent', { orderId, paymentIntentId });
        await mirrorGrabOrderToPublicTracking(db, orderId);
        res.json({ ok: true, orderId, idempotent: true });
        return;
      }
      if (ex.paymentStatus === 'PAID') {
        res.status(409).json({ error: 'already_paid' });
        return;
      }
    }

    const pi = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (pi.status !== 'succeeded') {
      res.status(400).json({ error: 'payment_not_succeeded', status: pi.status });
      return;
    }
    const metaOrder = pi.metadata?.orderId != null ? String(pi.metadata.orderId).trim() : '';
    if (metaOrder !== orderId) {
      res.status(400).json({ error: 'payment_intent_order_mismatch' });
      return;
    }
    if ((pi.currency || '').toLowerCase() !== CURRENCY) {
      res.status(400).json({ error: 'currency_mismatch' });
      return;
    }

    const piCents =
      typeof pi.amount_received === 'number' && pi.amount_received > 0
        ? pi.amount_received
        : pi.amount;

    await db.runTransaction(async (t) => {
      const oRef = db.collection(ORDERS).doc(orderId);
      const oSnap = await t.get(oRef);
      if (!oSnap.exists) {
        throw new Error('ORDER_NOT_FOUND');
      }
      const o = oSnap.data() ?? {};
      if (o.flow !== 'grab') {
        throw new Error('INVALID_ORDER_FLOW');
      }
      if (o.paymentMethod !== 'stripe') {
        throw new Error('ORDER_NOT_STRIPE');
      }
      if (o.paymentStatus === 'PAID') {
        if (o.stripePaymentIntentId === paymentIntentId) {
          return;
        }
        throw new Error('ALREADY_PAID');
      }

      const totalNum = Number(o.totalAmount ?? o.total ?? 0);
      if (!Number.isFinite(totalNum)) {
        throw new Error('ORDER_TOTAL_INVALID');
      }
      const orderCents = Math.round(Number(totalNum.toFixed(2)) * 100);
      if (orderCents !== piCents) {
        throw new Error('AMOUNT_MISMATCH');
      }

      const orderStatus = 'PLACED';
      const legacy = toLegacyTrackingStatus(orderStatus);

      const patch = {
        paymentStatus: 'PAID',
        orderStatus,
        status: legacy,
        stripePaymentIntentId: paymentIntentId,
        paymentVerifiedAt: FieldValue.serverTimestamp(),
        isNewForAdmin: true,
      };

      t.update(oRef, patch);

      shouldNotifyAdmin = true;
    });

    await mirrorGrabOrderToPublicTracking(db, orderId);

    if (shouldNotifyAdmin) {
      void notifyAdminsNewPaidOrder(orderId);
    }

    logInfo('verify_payment_ok', { orderId, paymentIntentId });
    res.json({ ok: true, orderId });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg === 'ORDER_NOT_FOUND') {
      res.status(404).json({ error: 'order_not_found' });
      return;
    }
    if (msg === 'ALREADY_PAID') {
      res.status(409).json({ error: 'already_paid' });
      return;
    }
    if (
      msg === 'INVALID_ORDER_FLOW' ||
      msg === 'ORDER_NOT_STRIPE' ||
      msg === 'ORDER_TOTAL_INVALID' ||
      msg === 'AMOUNT_MISMATCH'
    ) {
      res.status(400).json({ error: msg.toLowerCase() });
      return;
    }
    logError('verify_payment_error', { message: msg });
    res.status(500).json({ error: 'verify_failed' });
  }
});

/**
 * Customer tapped "I have paid" for QR — records intent on orders only; admin sets PAID after verification.
 */
app.post('/qr-claim-payment', async (req, res) => {
  if (!requireQrClaimAuth(req, res)) return;
  const orderId = req.body?.orderId != null ? String(req.body.orderId).trim() : '';
  if (!orderId) {
    res.status(400).json({ error: 'orderId required' });
    return;
  }
  try {
    const oRef = db.collection(ORDERS).doc(orderId);
    const snap = await oRef.get();
    if (!snap.exists) {
      res.status(404).json({ error: 'order_not_found' });
      return;
    }
    const o = snap.data() ?? {};
    if (o.flow !== 'grab' || o.paymentMethod !== 'qr') {
      res.status(400).json({ error: 'invalid_order' });
      return;
    }
    if (o.paymentStatus !== 'PENDING_VERIFICATION') {
      res.status(400).json({ error: 'invalid_payment_state' });
      return;
    }
    if (o.qrCustomerClaimedAt) {
      await mirrorGrabOrderToPublicTracking(db, orderId);
      res.json({ ok: true, orderId, idempotent: true });
      return;
    }
    await oRef.update({
      qrCustomerClaimedAt: FieldValue.serverTimestamp(),
    });
    await mirrorGrabOrderToPublicTracking(db, orderId);
    logInfo('qr_claim_ok', { orderId });
    res.json({ ok: true, orderId });
  } catch (e) {
    logError('qr_claim_error', { message: e instanceof Error ? e.message : String(e) });
    res.status(500).json({ error: 'qr_claim_failed' });
  }
});

app.listen(PORT, () => {
  logInfo('stripe_server_listen', {
    port: PORT,
    verifyAuth: Boolean(VERIFY_BEARER),
    qrClaimAuth: Boolean(QR_CLAIM_BEARER),
  });
});
