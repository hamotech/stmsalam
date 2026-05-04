/**
 * Example PayPal capture + **server-side verification** (Node 18+).
 *
 * Flow:
 * 1. POST /v2/checkout/orders/{id}/capture (idempotent: if already captured, continue)
 * 2. GET /v2/checkout/orders/{id}
 * 3. Require status === COMPLETED and purchase_units[0].amount matches expected total
 *
 * Env:
 *   PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET
 *   PAYPAL_API_BASE=https://api-m.sandbox.paypal.com  (live: https://api-m.paypal.com)
 *   PORT=8787
 *
 * Run: node paypal-capture-verify.example.mjs
 *
 * Mobile calls: POST /paypal/capture-order
 *   Body: { "paypalOrderId", "expectedAmount": "12.50", "currency": "SGD" }
 */

import http from 'node:http';
import { URL } from 'node:url';

const PAYPAL_API_BASE = (process.env.PAYPAL_API_BASE ?? 'https://api-m.sandbox.paypal.com').replace(/\/$/, '');
const CLIENT_ID = process.env.PAYPAL_CLIENT_ID ?? '';
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET ?? '';
const PORT = Number(process.env.PORT ?? 8787);

let cachedToken = { token: '', expiresAt: 0 };

async function paypalFetch(path, init = {}) {
  const url = path.startsWith('http') ? path : `${PAYPAL_API_BASE}${path}`;
  const res = await fetch(url, init);
  return res;
}

async function getAccessToken() {
  const now = Date.now();
  if (cachedToken.token && cachedToken.expiresAt > now + 5000) {
    return cachedToken.token;
  }
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error('Set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET');
  }
  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const res = await paypalFetch('/v1/oauth2/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`OAuth failed: ${res.status} ${t}`);
  }
  const data = await res.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: now + (data.expires_in ?? 300) * 1000,
  };
  return cachedToken.token;
}

function normalizeAmount(value) {
  const n = parseFloat(String(value ?? ''));
  if (!Number.isFinite(n) || n < 0) return null;
  return n.toFixed(2);
}

/**
 * After capture (or if already captured), load order and verify paid amount.
 */
async function verifyOrderCompletedWithAmount(orderId, expectedAmount, currency) {
  const token = await getAccessToken();
  const res = await paypalFetch(`/v2/checkout/orders/${encodeURIComponent(orderId)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`GET order failed: ${res.status} ${t}`);
  }
  const order = await res.json();
  const status = String(order.status ?? '').toUpperCase();
  if (status !== 'COMPLETED') {
    throw new Error(`PayPal order not COMPLETED after capture (status=${order.status})`);
  }
  const unit = order.purchase_units?.[0];
  if (!unit?.amount) {
    throw new Error('PayPal order missing purchase_units[0].amount');
  }
  const paypalCurrency = String(unit.amount.currency_code ?? '').toUpperCase();
  const wantCurrency = String(currency ?? 'SGD').toUpperCase();
  if (paypalCurrency !== wantCurrency) {
    throw new Error(`Currency mismatch: PayPal=${paypalCurrency} expected=${wantCurrency}`);
  }
  const got = normalizeAmount(unit.amount.value);
  const want = normalizeAmount(expectedAmount);
  if (got === null || want === null || got !== want) {
    throw new Error(
      `Amount mismatch: PayPal purchase_units[0].amount.value=${unit.amount.value} expected=${want}`
    );
  }
  return { orderId: order.id, status: order.status };
}

async function captureOrder(orderId) {
  const token = await getAccessToken();
  const res = await paypalFetch(`/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
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

async function handleCaptureAndVerify(paypalOrderId, expectedAmount, currency) {
  const cap = await captureOrder(paypalOrderId);
  if (!cap.ok) {
    const blob = `${cap.status} ${cap.text}`;
    const maybeAlready =
      /ORDER_ALREADY_CAPTURED|CAPTURE_ALREADY_COMPLETED|ORDER_COMPLETION_IN_PROGRESS/i.test(blob) ||
      /422/.test(String(cap.status));
    if (!maybeAlready) {
      throw new Error(cap.text || `Capture failed: ${cap.status}`);
    }
  }
  // Always verify with GET /v2/checkout/orders/{id} — only success path if COMPLETED + amount OK.
  return verifyOrderCompletedWithAmount(paypalOrderId, expectedAmount, currency);
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (c) => {
      raw += c;
      if (raw.length > 1e6) reject(new Error('body too large'));
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (e) {
        reject(e);
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://${req.headers.host}`);

  if (req.method === 'POST' && url.pathname === '/paypal/capture-order') {
    res.setHeader('Content-Type', 'application/json');
    try {
      const body = await readJson(req);
      const paypalOrderId = String(body.paypalOrderId ?? '').trim();
      const expectedAmount = body.expectedAmount != null ? String(body.expectedAmount) : '';
      const currency = body.currency != null ? String(body.currency) : 'SGD';
      if (!paypalOrderId || !expectedAmount) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'paypalOrderId and expectedAmount required' }));
        return;
      }
      const verified = await handleCaptureAndVerify(paypalOrderId, expectedAmount, currency);
      res.writeHead(200);
      res.end(
        JSON.stringify({
          status: 'COMPLETED',
          paypalOrderId: verified.orderId,
          verified: true,
        })
      );
    } catch (e) {
      console.error('[paypal-capture-verify]', e);
      res.writeHead(400);
      res.end(JSON.stringify({ error: e instanceof Error ? e.message : 'Verification failed' }));
    }
    return;
  }

  if (req.method === 'GET' && url.pathname === '/health') {
    res.writeHead(200);
    res.end('ok');
    return;
  }

  res.writeHead(404);
  res.end('not found');
});

server.listen(PORT, () => {
  console.info(`PayPal capture+verify example listening on :${PORT}`);
});
