/**
 * Stripe Checkout (HTTPS) — single fixed Cloud Run endpoint only.
 *
 * Flow: handleStripePayment → createStripeCheckout (Cloud Run) → { url } → redirect.
 * No env-based URL switching, no alternate hosts.
 */

import { httpsCallable } from 'firebase/functions';
import { signInAnonymously } from 'firebase/auth';
import { auth, functions } from '../lib/firebase';

/**
 * Gen2 Cloud Run service root (no trailing slash — avoids extra redirects; backend accepts POST on `/`).
 */
export const STRIPE_CHECKOUT_CLOUD_RUN_URL =
  'https://createstripecheckout-yvytuctrbq-uc.a.run.app';

const STRIPE_CHECKOUT_ALLOWED_ORIGIN = new URL(
  STRIPE_CHECKOUT_CLOUD_RUN_URL
).origin;

export const STRIPE_CHECKOUT_CLOUD_RUN_HOST = new URL(
  STRIPE_CHECKOUT_CLOUD_RUN_URL
).hostname;

/**
 * Runtime guard: URL must be exactly the Cloud Run service origin (https, root path, no query/hash).
 * @param {string} url
 */
function assertStripeCheckoutUrlIsCloudRun(url) {
  const raw = String(url || '').trim();
  let parsed;
  try {
    parsed = new URL(raw);
  } catch {
    throw new Error(
      '[stripeCheckout] Invalid checkout URL (expected Gen2 Cloud Run endpoint).'
    );
  }
  if (parsed.protocol !== 'https:') {
    throw new Error('[stripeCheckout] Checkout URL must use HTTPS only.');
  }
  if (parsed.origin !== STRIPE_CHECKOUT_ALLOWED_ORIGIN) {
    throw new Error(
      `[stripeCheckout] Disallowed checkout endpoint (expected origin ${STRIPE_CHECKOUT_ALLOWED_ORIGIN}).`
    );
  }
  const path = parsed.pathname === '' ? '/' : parsed.pathname;
  if (path !== '/') {
    throw new Error('[stripeCheckout] Checkout URL must be the service root (path / only).');
  }
  if (parsed.search || parsed.hash) {
    throw new Error(
      '[stripeCheckout] Checkout URL must not include query or hash.'
    );
  }
}

function summarizeErrorForLog(err) {
  if (!err || typeof err !== 'object') {
    return { message: String(err) };
  }
  return {
    name: err.name,
    message: err.message,
    cause: err.cause,
    stack: err.stack,
  };
}

const createStripePendingOrderCallable = httpsCallable(
  functions,
  'createStripePendingOrder'
);

async function ensureAuthForStripe() {
  await auth.authStateReady?.();
  if (!auth.currentUser) {
    await signInAnonymously(auth);
  }
  const user = auth.currentUser;
  if (!user?.uid) {
    throw new Error('Could not start checkout. Enable Anonymous sign-in or log in.');
  }
  await user.getIdToken(true);
}

function jsonSafe(value) {
  return JSON.parse(JSON.stringify(value));
}

/**
 * Creates a Firestore order with status pending_payment (callable).
 * @param {object} order - payload for createStripePendingOrder (items, totalAmount, idempotencyKey, customerName, ...)
 */
export async function createStripePendingOrder(order) {
  await ensureAuthForStripe();

  const payload = jsonSafe(order);

  const { data } = await createStripePendingOrderCallable(payload);
  const orderId = data?.orderId?.trim?.() || '';
  if (!orderId) {
    throw new Error('Order service returned no order id.');
  }
  return orderId;
}

function parseHttpErrorMessage(res, data) {
  if (typeof data?.error === 'string' && data.error.trim()) return data.error.trim();
  if (data?.error && typeof data.error.message === 'string') {
    return data.error.message.trim();
  }
  if (res.status === 429) {
    return 'Too many attempts. Please wait a few seconds and try again.';
  }
  if (res.status === 0 || res.status >= 500) {
    return 'Server error or network issue. Check your connection and try again.';
  }
  return `Checkout failed (${res.status})`;
}

/** Returns the only allowed checkout URL; throws if the constant or derived origin is invalid. */
export function getCreateStripeCheckoutHttpUrl() {
  assertStripeCheckoutUrlIsCloudRun(STRIPE_CHECKOUT_CLOUD_RUN_URL);
  return STRIPE_CHECKOUT_CLOUD_RUN_URL;
}

const RESPONSE_PREVIEW_LEN = 300;

/**
 * POSTs to createStripeCheckout; amounts come from Firestore only (no items in body).
 * Redirects with window.location.href to session.url.
 */
export async function handleStripePayment(order) {
  const orderId =
    typeof order?.orderId === 'string'
      ? order.orderId.trim()
      : typeof order === 'string'
        ? order.trim()
        : '';
  const customerName =
    typeof order?.customerName === 'string'
      ? order.customerName.trim()
      : '';

  if (!orderId) {
    throw new Error('Missing orderId');
  }
  if (!customerName) {
    throw new Error('Missing customerName');
  }

  await ensureAuthForStripe();
  const user = auth.currentUser;
  const token = await user.getIdToken();

  const url = getCreateStripeCheckoutHttpUrl();
  const requestPayload = { orderId, customerName };

  const CHECKOUT_HTTP_METHOD = 'POST';
  const fetchInit = {
    method: CHECKOUT_HTTP_METHOD,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestPayload),
    cache: 'no-store',
    mode: 'cors',
  };

  if (String(fetchInit.method).toUpperCase() !== 'POST') {
    throw new Error('Stripe checkout must use POST request');
  }

  console.log('[StripeCheckout] POST request', { url, orderId });
  console.log('[stripeCheckout] createStripeCheckout request', {
    url,
    orderId,
    customerName,
    method: fetchInit.method,
  });

  const httpRequest = new Request(url, fetchInit);
  if (String(httpRequest.method).toUpperCase() !== 'POST') {
    throw new Error('Stripe checkout must use POST request');
  }

  let res;
  try {
    res = await fetch(httpRequest);
  } catch (netErr) {
    console.error('[stripeCheckout] fetch failed', {
      url,
      orderId,
      customerName,
      errorMessage: netErr?.message,
      errorName: netErr?.name,
      errorCause: netErr?.cause,
      ...summarizeErrorForLog(netErr),
      error: netErr,
    });
    const msg =
      netErr && typeof netErr.message === 'string'
        ? netErr.message
        : 'Network error';
    throw new Error(
      /failed to fetch|networkerror|load failed/i.test(msg)
        ? 'Network error: could not reach checkout. Check your connection.'
        : msg
    );
  }

  const rawText = await res.text();
  let data = {};
  if (rawText) {
    try {
      data = JSON.parse(rawText);
    } catch {
      data = { error: rawText.slice(0, RESPONSE_PREVIEW_LEN) };
    }
  }

  const preview =
    typeof rawText === 'string' ? rawText.slice(0, RESPONSE_PREVIEW_LEN) : '';

  if (!res.ok || !data.url) {
    console.error('[stripeCheckout] HTTP response error', {
      url,
      orderId,
      customerName,
      status: res.status,
      statusText: res.statusText,
      responseBodyPreview: preview,
      parsedBody: data,
      message: parseHttpErrorMessage(res, data),
    });
    throw new Error(parseHttpErrorMessage(res, data));
  }

  window.location.href = data.url;
  return { redirected: true };
}
