import { httpsCallable } from 'firebase/functions';
import { signInAnonymously } from 'firebase/auth';
import { auth, functions } from '../lib/firebase';

const createGrabOrder = httpsCallable(functions, 'createGrabOrder');

/* ---------------- AUTH ---------------- */

async function ensureAuthBeforeCallable() {
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

/* ---------------- PAYMENT ---------------- */

/**
 * Maps UI payment method to canonical payload fields.
 * ENSURES single source of truth for paymentStatus/Method.
 */
export function buildPaymentPayload(method) {
  const m = String(method || '').trim().toUpperCase();
  if (m === 'COD' || m === 'CASH') {
    return {
      paymentMethod: 'COD',
      paymentStatus: 'NOT_APPLICABLE',
    };
  }
  return {
    paymentMethod: 'ONLINE',
    paymentStatus: 'PENDING',
  };
}

/* ---------------- IDENTITY ---------------- */

function jsonSafeForCallable(value) {
  try {
    return JSON.parse(JSON.stringify(value));
  } catch (err) {
    console.error('[grabCheckout] jsonSafeForCallable', err);
    throw new Error('Invalid order data. Please refresh and try again.');
  }
}

export function createCheckoutIdempotencyKey() {
  return (
    globalThis.crypto?.randomUUID?.() ??
    `${Date.now()}-${Math.random().toString(16).slice(2)}`
  );
}

/* ---------------- STORAGE ---------------- */

const SESSION_IDEMPOTENCY_KEY = 'stm_checkout_idempotency_key';
const SESSION_RESOLVED_ORDER = 'stm_checkout_idem_resolved';

export function readPersistedCheckoutIdempotencyKey() {
  try {
    const v = sessionStorage.getItem(SESSION_IDEMPOTENCY_KEY);
    return v?.trim() || '';
  } catch {
    return '';
  }
}

export function persistCheckoutIdempotencyKey(key) {
  try {
    if (key) {
      sessionStorage.setItem(SESSION_IDEMPOTENCY_KEY, key);
    }
  } catch {}
}

function readResolvedOrderIdForIdempotencyKey(idem) {
  try {
    const raw = sessionStorage.getItem(SESSION_RESOLVED_ORDER);
    if (!raw) return '';

    const o = JSON.parse(raw);

    if (o.idempotencyKey !== idem) return '';
    return o.orderId || '';
  } catch {
    return '';
  }
}

export function persistResolvedOrderForIdempotency(idem, orderId) {
  try {
    sessionStorage.setItem(
      SESSION_RESOLVED_ORDER,
      JSON.stringify({ idempotencyKey: idem, orderId, ts: Date.now() })
    );
  } catch {}
}

/* ---------------- LINE ITEMS + UI → CALLABLE ---------------- */

export function cartItemsToGrabLineItems(cartItems) {
  return (Array.isArray(cartItems) ? cartItems : []).map((item) => {
    const qty = Math.max(1, Math.floor(Number(item.qty) || 1));
    const price = Math.max(0, Number(item.price) || 0);
    const name = String(item.name || 'Item').trim().slice(0, 500) || 'Item';
    return { name, qty, price };
  });
}



export function clearPersistedCheckoutIdempotencyKey() {
  try {
    sessionStorage.removeItem(SESSION_IDEMPOTENCY_KEY);
    sessionStorage.removeItem(SESSION_RESOLVED_ORDER);
  } catch {
    /* ignore */
  }
}

/* ---------------- CROSS-TAB LOCK (soft) ---------------- */

const LOCAL_CHECKOUT_ACTIVE_LOCK_KEY = 'checkout_active_idempotency';
const SESSION_TAB_INSTANCE_ID_KEY = 'stm_tab_instance_id';
const SESSION_CHECKOUT_FENCE_KEY = 'stm_checkout_session_fence';
const CHECKOUT_LOCK_TTL_MS = 30 * 60 * 1000;
const CHECKOUT_LOCK_LIVENESS_STALE_MS = 2 * 60 * 1000;

function parseCheckoutLock(raw) {
  try {
    const o = JSON.parse(raw);
    return {
      tabId: typeof o.tabId === 'string' ? o.tabId : '',
      ts: Number(o.ts) || 0,
      fence: typeof o.fence === 'string' ? o.fence.trim() : '',
      lastActiveAt: Number(o.lastActiveAt) || Number(o.ts) || 0,
    };
  } catch {
    return null;
  }
}

function getOrCreateWebTabId() {
  try {
    let id = sessionStorage.getItem(SESSION_TAB_INSTANCE_ID_KEY);
    if (!id) {
      id =
        globalThis.crypto?.randomUUID?.() ??
        `t-${Date.now()}-${Math.random().toString(16).slice(2)}`;
      sessionStorage.setItem(SESSION_TAB_INSTANCE_ID_KEY, id);
    }
    return id;
  } catch {
    return `tab-${Date.now()}`;
  }
}

function getOrCreateCheckoutSessionFence() {
  try {
    let f = sessionStorage.getItem(SESSION_CHECKOUT_FENCE_KEY);
    const t = typeof f === 'string' ? f.trim() : '';
    if (!t) {
      f =
        globalThis.crypto?.randomUUID?.() ??
        `f-${Date.now()}-${Math.random().toString(16).slice(2)}`;
      sessionStorage.setItem(SESSION_CHECKOUT_FENCE_KEY, f);
    }
    return String(f).trim();
  } catch {
    return `f-${Date.now()}`;
  }
}

export function tryAcquireCheckoutTabLock() {
  try {
    if (typeof localStorage === 'undefined') return true;
    const tabId = getOrCreateWebTabId();
    const fence = getOrCreateCheckoutSessionFence();
    const now = Date.now();
    const raw = localStorage.getItem(LOCAL_CHECKOUT_ACTIVE_LOCK_KEY);
    if (raw) {
      const o = parseCheckoutLock(raw);
      if (o && o.tabId && o.tabId !== tabId) {
        const tsStale = now - o.ts >= CHECKOUT_LOCK_TTL_MS;
        const liveStale =
          now - (o.lastActiveAt || o.ts || 0) >= CHECKOUT_LOCK_LIVENESS_STALE_MS;
        if (!tsStale && !liveStale) {
          return false;
        }
      }
    }
    localStorage.setItem(
      LOCAL_CHECKOUT_ACTIVE_LOCK_KEY,
      JSON.stringify({ tabId, ts: now, fence, lastActiveAt: now })
    );
    return true;
  } catch {
    return true;
  }
}

export function releaseCheckoutTabLock() {
  try {
    if (typeof localStorage === 'undefined') return;
    const tabId = getOrCreateWebTabId();
    const fence = getOrCreateCheckoutSessionFence();
    const raw = localStorage.getItem(LOCAL_CHECKOUT_ACTIVE_LOCK_KEY);
    if (!raw) return;
    const o = parseCheckoutLock(raw);
    if (o && o.tabId === tabId && (!o.fence || !fence || o.fence === fence)) {
      localStorage.removeItem(LOCAL_CHECKOUT_ACTIVE_LOCK_KEY);
    }
  } catch {
    /* ignore */
  }
}

export function heartbeatCheckoutTabLock() {
  try {
    if (typeof localStorage === 'undefined') return;
    const tabId = getOrCreateWebTabId();
    const fence = getOrCreateCheckoutSessionFence();
    const raw = localStorage.getItem(LOCAL_CHECKOUT_ACTIVE_LOCK_KEY);
    if (!raw) return;
    const o = parseCheckoutLock(raw);
    if (!o || o.tabId !== tabId || (o.fence && fence && o.fence !== fence)) return;
    localStorage.setItem(
      LOCAL_CHECKOUT_ACTIVE_LOCK_KEY,
      JSON.stringify({ ...o, ts: o.ts, lastActiveAt: Date.now(), fence })
    );
  } catch {
    /* ignore */
  }
}

export function validateCheckoutSessionController() {
  try {
    const tabId = getOrCreateWebTabId();
    const fence = getOrCreateCheckoutSessionFence();
    const raw = localStorage.getItem(LOCAL_CHECKOUT_ACTIVE_LOCK_KEY);
    if (!raw) return true;
    const o = parseCheckoutLock(raw);
    if (!o || !o.tabId) return true;
    if (o.tabId !== tabId) return false;
    if (o.fence && fence && o.fence !== fence) return false;
    return true;
  } catch {
    return true;
  }
}

/* ---------------- MAIN CHECKOUT ---------------- */

export async function placeGrabOrderAtCheckout({
  items,
  totalAmount,
  paymentMethod,
  idempotencyKey,
}) {
  const finalPaymentMethod = String(paymentMethod || '').trim().toUpperCase() || 'ONLINE';
  console.log('CHECKOUT_TRIGGER_PAYMENT_METHOD', finalPaymentMethod);
  console.log('[CHECKOUT] START');

  if (!items?.length) throw new Error('Your cart is empty.');

  await ensureAuthBeforeCallable();

  const total = Number(totalAmount);

  if (!Number.isFinite(total) || total <= 0) {
    throw new Error('Invalid totalAmount');
  }

  const paymentInfo = buildPaymentPayload(finalPaymentMethod);

  const idemRaw =
    typeof idempotencyKey === 'string' ? idempotencyKey.trim() : '';
  const idem =
    idemRaw ||
    readPersistedCheckoutIdempotencyKey() ||
    createCheckoutIdempotencyKey();

  if (!idem || !String(idem).trim()) {
    throw new Error('Missing idempotency key');
  }

  persistCheckoutIdempotencyKey(idem);

  const cached = readResolvedOrderIdForIdempotencyKey(idem);
  if (cached) {
    console.log('[CHECKOUT] cache hit');
    return cached;
  }

  const safeMethod = String(paymentInfo?.paymentMethod || 'ONLINE').trim().toUpperCase() || 'ONLINE';
  const safeStatus = String(paymentInfo?.paymentStatus || 'PENDING').trim().toUpperCase() || 'PENDING';

  const payload = jsonSafeForCallable({
    items,
    totalAmount: total,
    paymentMethod: finalPaymentMethod,
    paymentStatus: safeStatus,
    idempotencyKey: idem,
  });

  console.log("PAYMENT_METHOD_OUTGOING", safeMethod);

  if (import.meta.env.DEV) {
    console.log('PAYLOAD_BEFORE_SEND', payload);
  }
  console.log('[CHECKOUT] BEFORE FUNCTION');

  let callableResult;
  try {
    /* SINGLE CALL ONLY (NO RETRY, NO LEASE) */
    callableResult = await createGrabOrder(payload);
  } catch (err) {
    const code = typeof err?.code === 'string' ? err.code : '';
    const msg = String(err?.message || '');
    const detailsMsg =
      typeof err?.details === 'string'
        ? err.details
        : typeof err?.details?.message === 'string'
          ? err.details.message
          : '';
    const joined = `${msg} ${detailsMsg}`.toLowerCase();
    if (
      code === 'functions/unauthenticated' ||
      /unauthenticated|not authenticated/.test(joined)
    ) {
      throw new Error(
        'Checkout auth token is missing or expired. Please refresh and try again.'
      );
    }
    if (
      code === 'functions/permission-denied' ||
      /not authorized to invoke|cloud run|401|403/.test(joined)
    ) {
      throw new Error(
        'Order service is blocked by Cloud Run IAM. Set createGrabOrder invoker to public and redeploy.'
      );
    }
    throw err;
  }
  const { data } = callableResult;

  console.log('[CHECKOUT] SUCCESS', data);

  const orderId = data?.orderId?.trim?.() || '';

  if (!orderId) {
    throw new Error('Order service returned no order id.');
  }

  persistResolvedOrderForIdempotency(idem, orderId);

  return orderId;
}

/* ---------------- LEGACY (NO-OP) ---------------- */

export async function releaseServerCheckoutLease() {
  // intentionally removed (backend no longer uses lease system)
}