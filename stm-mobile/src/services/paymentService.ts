/**
 * // UPDATED — Grab-style payment helpers (PayPal hardened).
 *
 * PayPal Orders v2 requires a **server** (client secret must never ship in the app).
 * Set `EXPO_PUBLIC_PAYMENT_API_URL` to your HTTPS backend base.
 */

import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

const paymentApiBase = (process.env.EXPO_PUBLIC_PAYMENT_API_URL ?? '').replace(/\/$/, '');

export type PayPalCreateOrderResponse = {
  paypalOrderId: string;
  approvalUrl: string;
};

export type PayPalCaptureResponse = {
  status: string;
  paypalOrderId: string;
  verified?: boolean;
};

/** In-flight dedupe: one verified capture per (paypalOrderId, amount, currency). */
const captureInFlight = new Map<string, Promise<PayPalCaptureResponse>>();

export const backendContract = `
# PayPal helper (server-only) — example: stm-mobile/server/paypal-capture-verify.example.mjs

POST \${PAYMENT_API}/paypal/create-order
Body: { "amount": "12.50", "currency": "SGD", "referenceId": "STM-1730..." }
Response: { "paypalOrderId": "...", "approvalUrl": "https://..." }

POST \${PAYMENT_API}/paypal/capture-order
Body: {
  "paypalOrderId": "...",
  "expectedAmount": "12.50",
  "currency": "SGD"
}
Server MUST:
1) POST /v2/checkout/orders/{id}/capture
2) GET /v2/checkout/orders/{id}
3) Return 200 only if status === "COMPLETED" AND purchase_units[0].amount matches expectedAmount + currency
Otherwise return 4xx — client will NOT create Firestore order.
Response: { "status": "COMPLETED", "paypalOrderId": "...", "verified": true }
`;

function assertPaymentApi(): void {
  if (!paymentApiBase) {
    throw new Error(
      'PayPal backend URL missing. Set EXPO_PUBLIC_PAYMENT_API_URL to your API that wraps PayPal REST.'
    );
  }
}

/** // NEW */
function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

/** // NEW — Abortable fetch for create/capture timeouts. */
async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs: number
): Promise<Response> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

export async function createPayPalOrderOnBackend(params: {
  amount: string;
  currency?: string;
  referenceId: string;
  /** // NEW */
  timeoutMs?: number;
}): Promise<PayPalCreateOrderResponse> {
  assertPaymentApi();
  const timeoutMs = params.timeoutMs ?? 25_000;
  const res = await fetchWithTimeout(
    `${paymentApiBase}/paypal/create-order`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        amount: params.amount,
        currency: params.currency ?? 'SGD',
        referenceId: params.referenceId,
      }),
    },
    timeoutMs
  );
  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || `create-order failed (${res.status})`);
  }
  const data = (await res.json()) as PayPalCreateOrderResponse;
  if (!data.approvalUrl || !data.paypalOrderId) {
    throw new Error('Invalid create-order response');
  }
  return data;
}

export async function capturePayPalOrderOnBackend(params: {
  paypalOrderId: string;
  /** Must match the order total you showed the customer (same as create-order amount). */
  expectedAmount: string;
  currency?: string;
  timeoutMs?: number;
}): Promise<PayPalCaptureResponse> {
  assertPaymentApi();
  const timeoutMs = params.timeoutMs ?? 25_000;
  const id = params.paypalOrderId.trim();
  if (!id) throw new Error('Missing PayPal order id');
  const amt = String(params.expectedAmount ?? '').trim();
  if (!amt) throw new Error('Missing expectedAmount for server verification');
  const res = await fetchWithTimeout(
    `${paymentApiBase}/paypal/capture-order`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        paypalOrderId: id,
        expectedAmount: amt,
        currency: params.currency ?? 'SGD',
      }),
    },
    timeoutMs
  );
  if (!res.ok) {
    const t = await res.text();
    const err = new Error(t || `capture-order failed (${res.status})`) as Error & {
      status?: number;
    };
    err.status = res.status;
    throw err;
  }
  const data = (await res.json()) as PayPalCaptureResponse;
  if (String(data.status).toUpperCase() !== 'COMPLETED') {
    throw new Error(`Server returned non-COMPLETED status: ${data.status}`);
  }
  if (data.verified !== true) {
    throw new Error(
      'Server must set verified:true after GET /v2/checkout/orders/{id} validation (see paypal-capture-verify.example.mjs).'
    );
  }
  return data;
}

/** Dedupe key: same PayPal id + amount must hit one in-flight verified capture. */
function captureDedupeKey(paypalOrderId: string, expectedAmount: string, currency: string): string {
  return `${paypalOrderId.trim()}|${String(expectedAmount).trim()}|${(currency || 'SGD').toUpperCase()}`;
}

/**
 * Single in-flight capture per (orderId, amount); always requires **server** verification — never
 * returns COMPLETED from client heuristics alone.
 */
export async function capturePayPalOrderDeduped(
  paypalOrderId: string,
  options: {
    expectedAmount: string;
    currency?: string;
    timeoutMs?: number;
    maxRetries?: number;
    retryDelayMs?: number;
  }
): Promise<PayPalCaptureResponse> {
  const id = paypalOrderId.trim();
  if (!id) throw new Error('Missing PayPal order id');
  const currency = options.currency ?? 'SGD';
  const dedupeKey = captureDedupeKey(id, options.expectedAmount, currency);

  const existing = captureInFlight.get(dedupeKey);
  if (existing) return existing;

  const timeoutMs = options.timeoutMs ?? 25_000;
  const maxRetries = options.maxRetries ?? 3;
  const retryDelayMs = options.retryDelayMs ?? 900;

  const task = (async (): Promise<PayPalCaptureResponse> => {
    let lastErr: unknown;
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await capturePayPalOrderOnBackend({
          paypalOrderId: id,
          expectedAmount: options.expectedAmount,
          currency,
          timeoutMs,
        });
      } catch (e) {
        lastErr = e;
        if (attempt < maxRetries - 1) {
          await sleep(retryDelayMs * (attempt + 1));
        }
      }
    }
    console.error('[paymentService] capture failed after retries', lastErr);
    throw lastErr instanceof Error ? lastErr : new Error('Capture failed');
  })();

  captureInFlight.set(dedupeKey, task);
  try {
    return await task;
  } finally {
    captureInFlight.delete(dedupeKey);
  }
}

export function getPayPalReturnUrl(): string {
  const custom = process.env.EXPO_PUBLIC_PAYPAL_RETURN_SCHEME?.trim();
  if (custom) return custom;
  return Linking.createURL('paypal-return');
}

/** // NEW */
export type OpenPayPalSessionResult =
  | { kind: 'success'; returnUrl: string }
  | { kind: 'cancel' }
  | { kind: 'dismiss' }
  | { kind: 'web_opened' };

/**
 * // UPDATED — Opens PayPal approval; classifies cancel vs success for callers.
 */
export async function openPayPalApprovalSession(approvalUrl: string): Promise<OpenPayPalSessionResult> {
  const returnUrl = getPayPalReturnUrl();

  if (Platform.OS === 'web') {
    try {
      await Linking.openURL(approvalUrl);
    } catch (e) {
      console.warn('[paymentService] openURL', e);
    }
    return { kind: 'web_opened' };
  }

  try {
    const result = await WebBrowser.openAuthSessionAsync(approvalUrl, returnUrl);
    if (result.type === 'success' && result.url) {
      return { kind: 'success', returnUrl: result.url };
    }
    if (result.type === 'cancel') {
      return { kind: 'cancel' };
    }
    return { kind: 'dismiss' };
  } catch (e) {
    console.warn('[paymentService] openAuthSession', e);
    try {
      await Linking.openURL(approvalUrl);
    } catch {
      /* ignore */
    }
    return { kind: 'dismiss' };
  }
}

/** @deprecated Use openPayPalApprovalSession for cancel handling */
export async function openPayPalApprovalUrl(approvalUrl: string): Promise<string | null> {
  const r = await openPayPalApprovalSession(approvalUrl);
  if (r.kind === 'success') return r.returnUrl;
  return null;
}

/**
 * // UPDATED — Robust token extraction (query, hash, legacy keys).
 */
export function parsePayPalReturnToken(returnUrl: string | null | undefined): string | null {
  if (returnUrl == null || typeof returnUrl !== 'string') return null;
  const s = returnUrl.trim();
  if (!s) return null;

  const fromQueryParams = (q: Linking.QueryParams | null | undefined): string | null => {
    if (!q) return null;
    for (const key of ['token', 'paymentId', 'orderId', 'ba_token']) {
      const raw = q[key];
      const v = Array.isArray(raw) ? raw[0] : raw;
      if (typeof v === 'string' && v.trim().length > 4) return v.trim();
    }
    return null;
  };

  const tryUrl = (u: string): string | null => {
    try {
      const parsed = Linking.parse(u);
      let t = fromQueryParams(parsed.queryParams);
      if (t) return t;
    } catch {
      /* fall through */
    }
    const m = u.match(/[?&#](?:token|paymentId|ba_token)=([^&]+)/i);
    if (m?.[1]) {
      try {
        return decodeURIComponent(m[1]);
      } catch {
        return m[1];
      }
    }
    return null;
  };

  let token = tryUrl(s);
  if (token) return token;

  const hashIdx = s.indexOf('#');
  if (hashIdx >= 0) {
    const hash = s.slice(hashIdx + 1);
    token = tryUrl(`p://x?${hash}`);
    if (token) return token;
  }

  return null;
}

export type PayPalCheckoutFlowResult =
  | { ok: true; paypalOrderId: string; captureStatus: string }
  | { ok: false; reason: 'cancelled' | 'timeout' | 'error' | 'web_pending'; message?: string };

/**
 * // NEW — End-to-end: create → browser → capture (deduped), with explicit cancel handling.
 */
export async function executePayPalCheckoutFlow(params: {
  amount: string;
  currency?: string;
  referenceId: string;
  createTimeoutMs?: number;
  captureTimeoutMs?: number;
  maxCaptureRetries?: number;
}): Promise<PayPalCheckoutFlowResult> {
  assertPaymentApi();
  try {
    const { approvalUrl, paypalOrderId } = await createPayPalOrderOnBackend({
      amount: params.amount,
      currency: params.currency,
      referenceId: params.referenceId,
      timeoutMs: params.createTimeoutMs ?? 25_000,
    });

    const session = await openPayPalApprovalSession(approvalUrl);
    if (session.kind === 'cancel') {
      return { ok: false, reason: 'cancelled', message: 'Payment cancelled.' };
    }
    if (session.kind === 'dismiss') {
      return { ok: false, reason: 'cancelled', message: 'Payment window closed.' };
    }
    if (session.kind === 'web_opened') {
      return {
        ok: false,
        reason: 'web_pending',
        message: 'Complete PayPal in the browser, then confirm capture from your backend or retry on mobile.',
      };
    }

    const parsed = parsePayPalReturnToken(session.returnUrl);
    const captureId = parsed ?? paypalOrderId;

    const capture = await capturePayPalOrderDeduped(captureId, {
      expectedAmount: params.amount,
      currency: params.currency ?? 'SGD',
      timeoutMs: params.captureTimeoutMs ?? 25_000,
      maxRetries: params.maxCaptureRetries ?? 3,
    });

    const st = String(capture.status).toUpperCase();
    if (st !== 'COMPLETED') {
      return { ok: false, reason: 'error', message: `Payment status: ${capture.status}` };
    }

    return { ok: true, paypalOrderId: capture.paypalOrderId, captureStatus: capture.status };
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Payment failed';
    const name = e instanceof Error ? e.name : '';
    if (name === 'AbortError') {
      return { ok: false, reason: 'timeout', message: 'Request timed out. Try again.' };
    }
    console.error('[paymentService] executePayPalCheckoutFlow', e);
    return { ok: false, reason: 'error', message };
  }
}
