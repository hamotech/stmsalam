/**
 * STM PayPal payment API — Express + Firestore (production-oriented).
 *
 * // UPDATED /paypal/capture-order — idempotency + timeouts + SGD-only
 * // NEW      /paypal/webhook    — signature verify + order recovery
 *
 * Env:
 *   PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET
 *   PAYPAL_API_BASE (default sandbox)
 *   PAYPAL_WEBHOOK_ID (from PayPal developer dashboard — required for webhook)
 *   PORT (default 8787)
 *   Firebase: GOOGLE_APPLICATION_CREDENTIALS or default credentials on GCP
 *
 * Install: cd server && npm install
 * Run:     npm start
 */

import express from 'express';
import admin from 'firebase-admin';
import { mirrorGrabOrderToPublicTracking } from './lib/mirrorGrabPublicTracking.mjs';

// ── Firebase Admin // NEW ───────────────────────────────────────────────────
if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

// ── Config ───────────────────────────────────────────────────────────────────
const PAYPAL_API_BASE = (process.env.PAYPAL_API_BASE ?? 'https://api-m.sandbox.paypal.com').replace(
  /\/$/,
  ''
);
const CLIENT_ID = process.env.PAYPAL_CLIENT_ID ?? '';
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET ?? '';
const PAYPAL_WEBHOOK_ID = process.env.PAYPAL_WEBHOOK_ID ?? '';
const PORT = Number(process.env.PORT ?? 8787);
const ALLOWED_CURRENCY = 'SGD';
/** PayPal HTTP timeout (ms) */
const PAYPAL_TIMEOUT_MS = Number(process.env.PAYPAL_HTTP_TIMEOUT_MS ?? 10_000);
/** Max retries for safe idempotent GETs / verify; capture uses at most 1 retry only when not already completed */
const PAYPAL_MAX_RETRIES = 2;

const PAYMENTS = 'payments';
const ORDERS = 'orders';

let cachedToken = { token: '', expiresAt: 0 };

// ── Logging (no secrets in responses) // NEW ────────────────────────────────
function logInfo(tag, meta = {}) {
  console.log(JSON.stringify({ level: 'info', tag, t: new Date().toISOString(), ...meta }));
}
function logWarn(tag, meta = {}) {
  console.warn(JSON.stringify({ level: 'warn', tag, t: new Date().toISOString(), ...meta }));
}
function logError(tag, meta = {}) {
  console.error(JSON.stringify({ level: 'error', tag, t: new Date().toISOString(), ...meta }));
}

/**
 * // NEW — Strict money normalization (spec: Number(v).toFixed(2) after validity checks).
 * Rejects NaN, ±Infinity, and negative values (returns null).
 */
function normalizeAmount(v) {
  const n = Number(v);
  if (!Number.isFinite(n) || n < 0) {
    return null;
  }
  return Number(v).toFixed(2);
}

// ── fetchWithTimeout // NEW ─────────────────────────────────────────────────
async function fetchWithTimeout(url, init = {}, timeoutMs = PAYPAL_TIMEOUT_MS) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

async function paypalFetchWithRetry(path, init = {}, options = {}) {
  const timeoutMs = options.timeoutMs ?? PAYPAL_TIMEOUT_MS;
  const maxAttempts = options.maxAttempts ?? PAYPAL_MAX_RETRIES;
  const url = path.startsWith('http') ? path : `${PAYPAL_API_BASE}${path}`;
  let lastErr;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fetchWithTimeout(url, init, timeoutMs);
    } catch (e) {
      lastErr = e;
      const name = e instanceof Error ? e.name : '';
      if (name === 'AbortError') {
        logWarn('paypal_http_timeout', { path: path.slice(0, 80), attempt });
      }
      if (attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, 400 * attempt));
      }
    }
  }
  throw lastErr ?? new Error('PayPal request failed');
}

async function getAccessToken() {
  const now = Date.now();
  if (cachedToken.token && cachedToken.expiresAt > now + 5000) {
    return cachedToken.token;
  }
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error('PayPal credentials not configured');
  }
  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const res = await paypalFetchWithRetry(
    '/v1/oauth2/token',
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    },
    { maxAttempts: PAYPAL_MAX_RETRIES }
  );
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`OAuth failed: ${res.status}`);
  }
  const data = await res.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: now + (data.expires_in ?? 300) * 1000,
  };
  return cachedToken.token;
}

/** // NEW — Idempotency: completed payment doc */
async function getPaymentDoc(paypalOrderId) {
  const snap = await db.collection(PAYMENTS).doc(paypalOrderId).get();
  return snap.exists ? snap.data() : null;
}

/**
 * // NEW — Before capture: if already COMPLETED with same amount/currency, short-circuit.
 * Rejects tampering: same PayPal id but different amount → 409
 */
function assertMatchesStoredPayment(stored, expectedAmountNorm, currencyUpper) {
  if (!stored || stored.status !== 'COMPLETED') return;
  const sa = normalizeAmount(stored.amount);
  const sc = String(stored.currency ?? '').toUpperCase();
  if (sa !== expectedAmountNorm || sc !== currencyUpper) {
    logError('idempotency_amount_mismatch', {
      paypalOrderId: '[redacted]',
      storedAmount: sa,
      requestedAmount: expectedAmountNorm,
    });
    const err = new Error('payment_already_recorded_with_different_amount');
    err.httpStatus = 409;
    throw err;
  }
}

/**
 * // NEW — Transaction: if already COMPLETED (race-safe), return 'SHORT_CIRCUIT'.
 * Otherwise mark CREATED and proceed to PayPal capture.
 */
async function claimOrShortCircuitPayment(paypalOrderId, amountNorm, currencyUpper) {
  const ref = db.collection(PAYMENTS).doc(paypalOrderId);
  return db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const data = snap.exists ? snap.data() : null;
    if (data?.status === 'COMPLETED') {
      assertMatchesStoredPayment(data, amountNorm, currencyUpper);
      return 'SHORT_CIRCUIT';
    }
    tx.set(
      ref,
      {
        status: 'CREATED',
        amount: amountNorm,
        currency: currencyUpper,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    return 'CLAIMED';
  });
}

/** // NEW */
async function finalizePaymentCompleted(paypalOrderId, amountNorm, currencyUpper) {
  const ref = db.collection(PAYMENTS).doc(paypalOrderId);
  await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const existing = snap.exists ? snap.data() : null;
    if (existing?.status === 'COMPLETED') {
      assertMatchesStoredPayment(existing, amountNorm, currencyUpper);
      return;
    }
    tx.set(ref, {
      status: 'COMPLETED',
      amount: amountNorm,
      currency: currencyUpper,
      updatedAt: FieldValue.serverTimestamp(),
    });
  });
}

async function getPayPalOrder(orderId) {
  const token = await getAccessToken();
  const res = await paypalFetchWithRetry(`/v2/checkout/orders/${encodeURIComponent(orderId)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const text = await res.text();
  let body = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    /* ignore */
  }
  return { ok: res.ok, status: res.status, body, text };
}

/**
 * // UPDATED — Verify COMPLETED + amount + currency (strict normalization)
 */
function verifyOrderCompletedWithAmount(order, expectedAmountNorm, currencyUpper) {
  const status = String(order.status ?? '').toUpperCase();
  if (status !== 'COMPLETED') {
    throw new Error(`PayPal order not COMPLETED (status=${order.status})`);
  }
  const unit = order.purchase_units?.[0];
  if (!unit?.amount) {
    throw new Error('PayPal order missing purchase_units[0].amount');
  }
  const paypalCurrency = String(unit.amount.currency_code ?? '').toUpperCase();
  if (paypalCurrency !== currencyUpper) {
    throw new Error(`Currency mismatch: PayPal=${paypalCurrency}`);
  }
  const got = normalizeAmount(unit.amount.value);
  if (got === null || got !== expectedAmountNorm) {
    logWarn('amount_mismatch', {
      paypal: unit.amount.value,
      expected: expectedAmountNorm,
    });
    throw new Error('Amount mismatch after verification');
  }
  return { orderId: order.id, status: order.status, purchaseUnit: unit, order };
}

async function capturePayPalOrder(orderId) {
  const token = await getAccessToken();
  const res = await fetchWithTimeout(
    `${PAYPAL_API_BASE}/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
    PAYPAL_TIMEOUT_MS
  );
  const text = await res.text();
  let body = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    /* ignore */
  }
  return { ok: res.ok, status: res.status, body, text };
}

function captureFailureMaybeRecoverable(cap) {
  const blob = `${cap.status} ${cap.text}`;
  return (
    /ORDER_ALREADY_CAPTURED|CAPTURE_ALREADY_COMPLETED|ORDER_COMPLETION_IN_PROGRESS/i.test(blob) ||
    /422/.test(String(cap.status))
  );
}

// ── Webhook signature // NEW ────────────────────────────────────────────────
async function verifyPayPalWebhook(headers, webhookEvent) {
  if (!PAYPAL_WEBHOOK_ID) {
    logWarn('webhook_no_webhook_id');
    return false;
  }
  const transmissionId = headers['paypal-transmission-id'];
  const transmissionTime = headers['paypal-transmission-time'];
  const certUrl = headers['paypal-cert-url'];
  const authAlgo = headers['paypal-auth-algo'];
  const transmissionSig = headers['paypal-transmission-sig'];
  if (!transmissionId || !transmissionTime || !certUrl || !authAlgo || !transmissionSig) {
    logWarn('webhook_missing_headers');
    return false;
  }
  const token = await getAccessToken();
  const res = await paypalFetchWithRetry(
    '/v1/notifications/verify-webhook-signature',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transmission_id: transmissionId,
        transmission_time: transmissionTime,
        cert_url: certUrl,
        auth_algo: authAlgo,
        transmission_sig: transmissionSig,
        webhook_id: PAYPAL_WEBHOOK_ID,
        webhook_event: webhookEvent,
      }),
    },
    { maxAttempts: PAYPAL_MAX_RETRIES }
  );
  if (!res.ok) {
    const t = await res.text();
    logError('webhook_verify_http', { status: res.status });
    return false;
  }
  const data = await res.json();
  const ok = data.verification_status === 'SUCCESS';
  if (!ok) {
    logWarn('webhook_verify_failed', { status: data.verification_status });
  }
  return ok;
}

/** // NEW — Extract PayPal order id from webhook event */
function extractOrderIdFromWebhook(event) {
  const type = event?.event_type;
  const res = event?.resource;
  if (!type || !res) return null;
  if (type === 'CHECKOUT.ORDER.APPROVED') {
    return res.id ?? null;
  }
  if (type === 'PAYMENT.CAPTURE.COMPLETED') {
    const sup = res.supplementary_data?.related_ids;
    if (sup?.order_id) return sup.order_id;
    const links = res.links ?? [];
    const up = links.find((l) => l.rel === 'up' && l.href?.includes('/checkout/orders/'));
    if (up?.href) {
      const m = up.href.match(/checkout\/orders\/([^/?]+)/);
      if (m) return decodeURIComponent(m[1]);
    }
  }
  return null;
}

function toLegacyTrackingStatus(orderStatus) {
  if (orderStatus === 'PLACED') return 'PENDING';
  return orderStatus;
}

function deliveryEtaDate() {
  const d = new Date();
  d.setMinutes(d.getMinutes() + 45);
  return admin.firestore.Timestamp.fromDate(d);
}

/**
 * // NEW — Recovery order if webhook proves payment but Firestore order missing
 */
async function ensureOrderForVerifiedPayPalPayment(paypalOrderId, orderPayloadFromGet) {
  const unit = orderPayloadFromGet.purchase_units?.[0];
  const amountNorm = normalizeAmount(unit?.amount?.value);
  const currency = String(unit?.amount?.currency_code ?? '').toUpperCase();
  if (!amountNorm || currency !== ALLOWED_CURRENCY) {
    logWarn('recovery_skip_bad_amount_currency');
    return;
  }

  const q = await db.collection(ORDERS).where('paymentRef', '==', paypalOrderId).limit(5).get();
  if (!q.empty) {
    logInfo('recovery_order_exists', { count: q.size });
    return;
  }

  const customId = String(unit?.custom_id ?? unit?.reference_id ?? '').trim();
  const orderId =
    customId && /^STM-/.test(customId) ? customId : `STM-WEBHOOK-${Date.now()}`;

  const oRef = db.collection(ORDERS).doc(orderId);

  await db.runTransaction(async (tx) => {
    const existing = await tx.get(oRef);
    if (existing.exists) {
      return;
    }
    const totalNum = parseFloat(amountNorm);
    const orderStatus = 'PLACED';
    const paymentStatus = 'PAID';
    const items = [
      {
        name: 'Paid via PayPal (recovered)',
        qty: 1,
        price: totalNum,
      },
    ];

    tx.set(oRef, {
      id: orderId,
      userId: 'anonymous',
      items,
      totalAmount: totalNum,
      total: amountNorm,
      subtotal: amountNorm,
      deliveryFee: '0.00',
      paymentMethod: 'paypal',
      paymentStatus,
      orderStatus,
      status: toLegacyTrackingStatus(orderStatus),
      flow: 'grab',
      createdAt: FieldValue.serverTimestamp(),
      estimatedDeliveryAt: deliveryEtaDate(),
      customer: {},
      mode: 'delivery',
      notes: 'Created from PayPal webhook recovery',
      paymentRef: paypalOrderId,
      webhookRecovered: true,
      trackingToken:
        Math.random().toString(36).slice(2, 15) + Math.random().toString(36).slice(2, 15),
      isNewForAdmin: true,
      chatEnabled: true,
      unreadAdmin: 0,
      unreadCustomer: 0,
    });
  });

  await mirrorGrabOrderToPublicTracking(db, orderId);

  logInfo('recovery_order_created', { orderId });
}

// ── Express // NEW ──────────────────────────────────────────────────────────
const app = express();

/** Raw body for webhook signature verification */
app.use('/paypal/webhook', express.raw({ type: 'application/json', limit: '256kb' }));

app.use(express.json({ limit: '256kb' }));

app.get('/', (_req, res) => {
  res.json({
    service: 'stm-paypal-payment-server',
    routes: {
      'GET /': 'this help',
      'GET /health': 'liveness',
      'POST /paypal/capture-order':
        'body: { paypalOrderId, expectedAmount, currency? } → { status, paypalOrderId, verified }',
      'POST /paypal/webhook': 'PayPal webhook (raw JSON + signature headers)',
    },
  });
});

app.get('/health', (_req, res) => {
  res.send('ok');
});

/**
 * // UPDATED — Contract unchanged: 200 { status, paypalOrderId, verified: true }
 */
app.post('/paypal/capture-order', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const paypalOrderId = String(req.body?.paypalOrderId ?? '').trim();
    const expectedRaw = req.body?.expectedAmount;
    const currencyRaw = req.body?.currency != null ? String(req.body.currency) : ALLOWED_CURRENCY;
    const currencyUpper = currencyRaw.trim().toUpperCase();

    if (!paypalOrderId || expectedRaw == null || String(expectedRaw).trim() === '') {
      return res.status(400).json({ error: 'paypalOrderId and expectedAmount required' });
    }
    if (currencyUpper !== ALLOWED_CURRENCY) {
      logWarn('reject_currency', { currency: currencyUpper });
      return res.status(400).json({ error: 'unsupported_currency' });
    }

    const expectedAmountNorm = normalizeAmount(expectedRaw);
    if (expectedAmountNorm === null) {
      return res.status(400).json({ error: 'invalid_expectedAmount' });
    }

    const existing = await getPaymentDoc(paypalOrderId);
    if (existing?.status === 'COMPLETED') {
      try {
        assertMatchesStoredPayment(existing, expectedAmountNorm, currencyUpper);
      } catch (e) {
        const code = typeof e.httpStatus === 'number' ? e.httpStatus : 400;
        return res.status(code).json({ error: e instanceof Error ? e.message : 'conflict' });
      }
      logInfo('capture_idempotent_hit', { paypalOrderIdLen: paypalOrderId.length });
      return res.status(200).json({
        status: 'COMPLETED',
        paypalOrderId,
        verified: true,
      });
    }

    const claimPhase = await claimOrShortCircuitPayment(
      paypalOrderId,
      expectedAmountNorm,
      currencyUpper
    );
    if (claimPhase === 'SHORT_CIRCUIT') {
      logInfo('capture_short_circuit_tx', { paypalOrderIdLen: paypalOrderId.length });
      return res.status(200).json({
        status: 'COMPLETED',
        paypalOrderId,
        verified: true,
      });
    }

    logInfo('capture_attempt', { paypalOrderIdLen: paypalOrderId.length });

    const cap = await capturePayPalOrder(paypalOrderId);
    if (!cap.ok && !captureFailureMaybeRecoverable(cap)) {
      logError('capture_failed', { status: cap.status });
      return res.status(400).json({ error: 'capture_failed' });
    }

    const got = await getPayPalOrder(paypalOrderId);
    if (!got.ok || !got.body) {
      return res.status(400).json({ error: 'get_order_failed' });
    }

    try {
      verifyOrderCompletedWithAmount(got.body, expectedAmountNorm, currencyUpper);
    } catch (e) {
      logError('verify_failed', { message: e instanceof Error ? e.message : 'error' });
      return res.status(400).json({ error: e instanceof Error ? e.message : 'verify_failed' });
    }

    await finalizePaymentCompleted(paypalOrderId, expectedAmountNorm, currencyUpper);
    logInfo('capture_completed', { paypalOrderIdLen: paypalOrderId.length });

    return res.status(200).json({
      status: 'COMPLETED',
      paypalOrderId,
      verified: true,
    });
  } catch (e) {
    const status = typeof e.httpStatus === 'number' ? e.httpStatus : 400;
    logError('capture_order_error', { message: e instanceof Error ? e.message : 'error' });
    return res.status(status).json({
      error: e instanceof Error ? e.message : 'error',
    });
  }
});

/** // NEW */
app.post('/paypal/webhook', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  let event;
  try {
    const raw = req.body instanceof Buffer ? req.body.toString('utf8') : String(req.body ?? '');
    event = JSON.parse(raw);
  } catch {
    return res.status(400).json({ error: 'invalid_json' });
  }

  const okSig = await verifyPayPalWebhook(req.headers, event);
  if (!okSig) {
    return res.status(401).json({ error: 'invalid_signature' });
  }

  const type = event.event_type;
  logInfo('webhook_received', { type });

  if (type !== 'CHECKOUT.ORDER.APPROVED' && type !== 'PAYMENT.CAPTURE.COMPLETED') {
    return res.status(200).json({ received: true });
  }

  const orderId = extractOrderIdFromWebhook(event);
  if (!orderId) {
    logWarn('webhook_no_order_id', { type });
    return res.status(200).json({ received: true });
  }

  try {
    const got = await getPayPalOrder(orderId);
    if (!got.ok || !got.body) {
      logError('webhook_get_order_failed', { status: got.status });
      return res.status(200).json({ received: true });
    }

    const o = got.body;
    const status = String(o.status ?? '').toUpperCase();
    if (status !== 'COMPLETED') {
      logInfo('webhook_order_not_completed', { status: o.status });
      return res.status(200).json({ received: true });
    }

    const unit = o.purchase_units?.[0];
    const amountNorm = normalizeAmount(unit?.amount?.value);
    const currency = String(unit?.amount?.currency_code ?? '').toUpperCase();
    if (!amountNorm || currency !== ALLOWED_CURRENCY) {
      logWarn('webhook_bad_amount_currency');
      return res.status(200).json({ received: true });
    }

    await finalizePaymentCompleted(orderId, amountNorm, currency);
    await ensureOrderForVerifiedPayPalPayment(orderId, o);
    logInfo('webhook_processed', { type, orderIdLen: orderId.length });
  } catch (e) {
    logError('webhook_handler_error', { message: e instanceof Error ? e.message : 'error' });
  }

  return res.status(200).json({ received: true });
});

app.use((req, res) => {
  res.status(404).json({ error: 'not_found' });
});

app.listen(PORT, () => {
  logInfo('server_listen', { port: PORT });
});
