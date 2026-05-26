/**
 * Stripe Checkout (hosted) — single entry for card pay in stm-mobile.
 * Same Cloud Run contract as `frontend/src/services/stripeCheckout.js`.
 *
 * SANITIZER PARITY: `sanitizeStripeOrderId` MUST stay byte-identical to
 * `sanitizeStripeOrderIdForCheckoutHttp` in `frontend/functions/stripeCheckoutHttp.js`
 * (see algo v2-parity in both files).
 */

import { Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
  type DocumentSnapshot,
} from 'firebase/firestore';
import { app as firebaseApp, auth, db, EXPECTED_FIREBASE_PROJECT_ID } from '@/src/services/firebase';

/** Gen2 Cloud Run (must match website `STRIPE_CHECKOUT_CLOUD_RUN_URL`). */
const DEFAULT_STRIPE_CHECKOUT_URL = 'https://createstripecheckout-yvytuctrbq-uc.a.run.app';

/** Deterministic short hash for DEV cross-check with Cloud Run (same impl as backend). */
export function hashStripeOrderIdForDebug(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(16);
}

/**
 * Same algorithm as Cloud Run `sanitizeStripeOrderIdForCheckoutHttp` (algo v2-parity).
 * Inline cases:
 *   "abc123" → "abc123"
 *   "abc%20123" → "abc 123" (then rejected by assertValid if whitespace forbidden)
 *   "abc%ZZ" → decode throws → unchanged "abc%ZZ" after failed decode attempt path keeps prior `s`
 */
export function sanitizeStripeOrderId(raw: string): string {
  let s = String(raw ?? '')
    .trim()
    .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, '');
  if (/%[0-9A-Fa-f]{2}/.test(s)) {
    try {
      s = decodeURIComponent(s);
    } catch {
      /* invalid % sequences: keep s (e.g. abc%ZZ) */
    }
    s = String(s)
      .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, '')
      .trim();
  }
  return s;
}

/** After sanitization: length 8–128, no path chars, no whitespace. */
export function assertValidStripeCheckoutOrderId(raw: string): void {
  const s = sanitizeStripeOrderId(raw);
  if (!s) {
    throw new Error('Invalid orderId after sanitization');
  }
  if (s.length < 8 || s.length > 128) {
    throw new Error('Invalid orderId after sanitization');
  }
  if (/[/\\]/.test(s) || /\.\./.test(s)) {
    throw new Error('Invalid orderId after sanitization');
  }
  if (/\s/.test(s)) {
    throw new Error('Invalid orderId after sanitization');
  }
}

/** Display / logs: default when env unset. Does not throw. */
export function getStripeCheckoutHttpUrl(): string {
  const raw = process.env.EXPO_PUBLIC_STRIPE_CHECKOUT_URL?.trim();
  if (!raw) return DEFAULT_STRIPE_CHECKOUT_URL;
  try {
    const u = new URL(raw);
    if (u.protocol === 'https:') return raw;
  } catch {
    /* fall through */
  }
  return DEFAULT_STRIPE_CHECKOUT_URL;
}

/**
 * Resolves checkout POST URL. If `EXPO_PUBLIC_STRIPE_CHECKOUT_URL` is set (non-empty), it MUST be a valid `https` URL or callers fail before fetch.
 * Empty/unset → default Cloud Run URL.
 */
export function requireStripeCheckoutHttpUrlForRequest():
  | { ok: true; url: string; hostname: string }
  | { ok: false; message: string } {
  const raw = process.env.EXPO_PUBLIC_STRIPE_CHECKOUT_URL?.trim();
  if (!raw) {
    try {
      const u = new URL(DEFAULT_STRIPE_CHECKOUT_URL);
      return { ok: true, url: DEFAULT_STRIPE_CHECKOUT_URL, hostname: u.hostname };
    } catch {
      return { ok: false, message: 'Invalid default Stripe checkout URL (build error).' };
    }
  }
  try {
    const u = new URL(raw);
    if (u.protocol !== 'https:') {
      return {
        ok: false,
        message:
          'Possible backend project mismatch: check EXPO_PUBLIC_STRIPE_CHECKOUT_URL (must be https).',
      };
    }
    return { ok: true, url: raw, hostname: u.hostname };
  } catch {
    return {
      ok: false,
      message:
        'Possible backend project mismatch: check EXPO_PUBLIC_STRIPE_CHECKOUT_URL (invalid URL).',
    };
  }
}

export type StripeHostedCheckoutSessionResult =
  | {
      ok: true;
      url: string;
      resolvedOrderId: string;
      resolutionSource: StripeOrderResolutionSource;
    }
  | { ok: false; message: string };

export type StripeOrderResolutionSource = 'orders' | 'public_tracking';

/** Lookup key / Cloud Run body id: trim + strip invisible unicode only (no decodeURIComponent). */
function trimOrderIdForLookup(raw: string): string {
  return String(raw ?? '')
    .trim()
    .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, '');
}

/** Stripe POST `orderId` — same normalization as lookup; never use `sanitizeStripeOrderId` here. */
function normalizeOrderIdForStripePost(orderId: string): string {
  return trimOrderIdForLookup(orderId);
}

function readOrderUserId(data: unknown): string | undefined {
  if (!data || typeof data !== 'object') return undefined;
  const u = (data as { userId?: unknown }).userId;
  return typeof u === 'string' && u.trim() ? u.trim() : undefined;
}

/** Per-checkout Firestore snapshot reuse (resolve → ownership → pending check). `getOrderDoc` caches hits only. */
export type StripeCheckoutFirestoreCache = {
  getOrderDoc(id: string): Promise<DocumentSnapshot | undefined>;
  invalidateOrder(id: string): void;
};

export function createStripeCheckoutFirestoreCache(): StripeCheckoutFirestoreCache {
  const orderById = new Map<string, DocumentSnapshot>();

  return {
    invalidateOrder(id: string) {
      orderById.delete(id);
    },
    async getOrderDoc(id: string): Promise<DocumentSnapshot | undefined> {
      const hit = orderById.get(id);
      if (hit) return hit;
      try {
        const s = await getDoc(doc(db, 'orders', id));
        if (s.exists()) {
          orderById.set(id, s);
          return s;
        }
      } catch {
        /* permission / network — treat as missing */
      }
      return undefined;
    },
  };
}

async function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

/** Ownership: ONLY `orders/{id}.userId` — never use `public_tracking` fields for auth. */
function assertOrderUserIdMatches(snap: DocumentSnapshot, uid: string): void {
  const owner = readOrderUserId(snap.data());
  if (owner !== uid) {
    throw new Error('Unauthorized order access');
  }
}

/**
 * STEP 1: cache.getOrderDoc(lookupKey). If doc exists → assertOrderUserIdMatches(doc, uid) or throw Unauthorized → return orders.
 * STEP 2 (race only): if STEP 1 had no doc → sleep(300), invalidate(lookupKey), getOrderDoc once, same ownership rule.
 */
async function steps1And2OrdersByLookupKey(
  lookupKey: string,
  uid: string,
  cache: StripeCheckoutFirestoreCache
): Promise<{ resolvedOrderId: string; source: 'orders' } | null> {
  let docSnap = await cache.getOrderDoc(lookupKey);
  if (docSnap?.exists()) {
    assertOrderUserIdMatches(docSnap, uid);
    return { resolvedOrderId: docSnap.id, source: 'orders' };
  }

  await sleep(300);
  cache.invalidateOrder(lookupKey);
  docSnap = await cache.getOrderDoc(lookupKey);
  if (docSnap?.exists()) {
    assertOrderUserIdMatches(docSnap, uid);
    return { resolvedOrderId: docSnap.id, source: 'orders' };
  }

  return null;
}

/**
 * Pointer path only: load `orders/{resolvedOrderId}` via cache (never trust `public_tracking` for ownership).
 * If orders doc missing → sleep(300), invalidate, retry getOrderDoc once.
 * If still missing → return null (caller continues). If doc exists but userId mismatch → Unauthorized (throws).
 */
async function tryResolveOwnershipFromOrdersDocId(
  resolvedOrderId: string,
  cache: StripeCheckoutFirestoreCache,
  uid: string
): Promise<{ resolvedOrderId: string; source: 'public_tracking' } | null> {
  let orderDoc = await cache.getOrderDoc(resolvedOrderId);
  if (!orderDoc) {
    await sleep(300);
    cache.invalidateOrder(resolvedOrderId);
    orderDoc = await cache.getOrderDoc(resolvedOrderId);
  }
  if (!orderDoc?.exists()) {
    return null;
  }
  assertOrderUserIdMatches(orderDoc, uid);
  return { resolvedOrderId: resolvedOrderId, source: 'public_tracking' };
}

/**
 * STEP 1–4: steps1And2OrdersByLookupKey → getDoc(public_tracking/{lookupKey}) → query(where id == lookupKey);
 *            ownership only via tryResolveOwnershipFromOrdersDocId(id, cache, uid).
 * STEP 5: sleep(300), invalidate(lookupKey), rerun STEP 1–4 once.
 * STEP 6: throw Order not found in Firestore.
 */
async function resolveStripeOrderId(
  orderIdRaw: string,
  uid: string,
  cache: StripeCheckoutFirestoreCache
): Promise<{
  resolvedOrderId: string;
  source: StripeOrderResolutionSource;
}> {
  const lookupKey = trimOrderIdForLookup(orderIdRaw);
  if (!lookupKey) {
    throw new Error('Order not found in Firestore');
  }
  if (!uid) {
    throw new Error('Unauthorized order access');
  }

  const runSteps1Through4 = async (): Promise<{
    resolvedOrderId: string;
    source: StripeOrderResolutionSource;
  } | null> => {
    const fromOrders = await steps1And2OrdersByLookupKey(lookupKey, uid, cache);
    if (fromOrders) {
      return fromOrders;
    }

    let pathSnap: DocumentSnapshot | undefined;
    try {
      pathSnap = await getDoc(doc(db, 'public_tracking', lookupKey));
    } catch {
      pathSnap = undefined;
    }
    if (pathSnap?.exists()) {
      const r = await tryResolveOwnershipFromOrdersDocId(pathSnap.id, cache, uid);
      if (r) return r;
    }

    const qRef = query(
      collection(db, 'public_tracking'),
      where('id', '==', lookupKey),
      limit(1)
    );
    const qSnap = await getDocs(qRef);
    if (!qSnap.empty) {
      const r = await tryResolveOwnershipFromOrdersDocId(qSnap.docs[0].id, cache, uid);
      if (r) return r;
    }

    return null;
  };

  let found = await runSteps1Through4();
  if (!found) {
    await sleep(300);
    cache.invalidateOrder(lookupKey);
    found = await runSteps1Through4();
  }

  if (!found) {
    throw new Error('Order not found in Firestore');
  }
  return found;
}

/** Uses cache.getOrderDoc(orderId); if missing → sleep(300) + invalidate + retry once; requires status pending_payment. */
async function ensureOrderPendingPaymentBeforeStripe(
  orderId: string,
  cache: StripeCheckoutFirestoreCache
): Promise<void> {
  let snap = await cache.getOrderDoc(orderId);
  if (!snap) {
    await sleep(300);
    cache.invalidateOrder(orderId);
    snap = await cache.getOrderDoc(orderId);
  }
  if (!snap?.exists()) {
    throw new Error('Order is not ready for Stripe checkout');
  }
  const st = String((snap.data() as { status?: string }).status ?? '').trim();
  if (st !== 'pending_payment') {
    throw new Error('Order is not ready for Stripe checkout');
  }
}

function stripeCheckoutEnvMismatchHint(hostname: string): string | null {
  try {
    const defHost = new URL(DEFAULT_STRIPE_CHECKOUT_URL).hostname;
    if (hostname && hostname !== defHost) {
      return `Checkout hostname (${hostname}) differs from app default (${defHost}). Possible backend project mismatch: check EXPO_PUBLIC_STRIPE_CHECKOUT_URL`;
    }
  } catch {
    return null;
  }
  return null;
}

const MAX_CHECKOUT_FETCH_ATTEMPTS = 4;

/**
 * Compare mobile Expo env vs baked-in web default (`frontend/src/services/stripeCheckout.js` same host as DEFAULT_STRIPE_CHECKOUT_URL).
 * Wrong values usually originate in stm-mobile `.env` (`EXPO_PUBLIC_STRIPE_CHECKOUT_URL`) or `firebase.ts` (`firebaseConfig.projectId`).
 */
function logMobileStripeEnvironmentBeforeStripeApi(orderId: string, effectiveCheckoutHostname: string): void {
  if (Platform.OS === 'web') return;
  const mobileProjectId = firebaseApp.options.projectId ?? '';
  console.log('MOBILE_ORDER_ID:', orderId);
  console.log('MOBILE_URL:', process.env.EXPO_PUBLIC_STRIPE_CHECKOUT_URL ?? '(unset)');
  console.log('MOBILE_PROJECT_ID:', mobileProjectId);

  const webReferenceHost = new URL(DEFAULT_STRIPE_CHECKOUT_URL).hostname;
  console.log('WEB_REFERENCE_CHECKOUT_HOST:', webReferenceHost);
  console.log('MOBILE_EFFECTIVE_CHECKOUT_HOST:', effectiveCheckoutHostname);

  const hostMismatch = effectiveCheckoutHostname !== webReferenceHost;
  const projectMismatch = mobileProjectId !== EXPECTED_FIREBASE_PROJECT_ID;
  if (hostMismatch || projectMismatch) {
    console.warn('Environment mismatch: mobile is calling wrong backend', {
      hostMismatch,
      projectMismatch,
      mobileProjectId,
      expectedProjectId: EXPECTED_FIREBASE_PROJECT_ID,
      effectiveCheckoutHostname,
      webReferenceHost,
      wrongValueOrigin:
        hostMismatch && projectMismatch
          ? 'stm-mobile/.env EXPO_PUBLIC_STRIPE_CHECKOUT_URL AND firebase.ts firebaseConfig.projectId'
          : hostMismatch
            ? 'stm-mobile/.env EXPO_PUBLIC_STRIPE_CHECKOUT_URL (must match web STRIPE_CHECKOUT_CLOUD_RUN_URL host)'
            : projectMismatch
              ? 'firebase.ts firebaseConfig.projectId / EXPECTED_FIREBASE_PROJECT_ID'
              : undefined,
      referenceFiles: 'stripeHostedCheckout.ts (DEFAULT_STRIPE_CHECKOUT_URL); frontend/src/services/stripeCheckout.js (STRIPE_CHECKOUT_CLOUD_RUN_URL)',
    });
  }
}

/* Firestore validation is intentionally server-side only to avoid mobile cache/project mismatch issues. */

export async function requestStripeCheckoutSessionUrl(
  orderIdRaw: string,
  customerName: string
): Promise<StripeHostedCheckoutSessionResult> {
  await auth.authStateReady();
  const authed = auth.currentUser;
  if (!authed) {
    return { ok: false, message: 'User not authenticated' };
  }
  const uid = authed.uid;

  /** Single cache: resolve → pending_payment (no duplicate orders reads). */
  const checkoutFirestoreCache = createStripeCheckoutFirestoreCache();

  let orderId: string;
  let resolutionSource: StripeOrderResolutionSource;
  try {
    const r = await resolveStripeOrderId(orderIdRaw, uid, checkoutFirestoreCache);
    orderId = r.resolvedOrderId;
    resolutionSource = r.source;
  } catch (e) {
    const m = e instanceof Error ? e.message : String(e);
    if (m === 'Unauthorized order access') {
      return { ok: false, message: 'Unauthorized order access' };
    }
    return { ok: false, message: 'Order not found in Firestore' };
  }

  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    try {
      assertValidStripeCheckoutOrderId(orderId);
    } catch {
      console.warn(
        '[stripeHostedCheckout] resolved orderId format check (dev only, non-blocking):',
        orderId
      );
    }
  }

  try {
    await ensureOrderPendingPaymentBeforeStripe(orderId, checkoutFirestoreCache);
  } catch (e) {
    const m = e instanceof Error ? e.message : String(e);
    return { ok: false, message: m };
  }

  const endpointResolved = requireStripeCheckoutHttpUrlForRequest();
  if (!endpointResolved.ok) {
    return { ok: false, message: endpointResolved.message };
  }
  const { url: endpoint, hostname: checkoutHostname } = endpointResolved;

  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    console.log('rawOrderId:', orderIdRaw);
    console.log('resolvedOrderId:', orderId);
    console.log('resolutionSource:', resolutionSource);
    console.log('FIREBASE_PROJECT_ID:', firebaseApp.options.projectId);
    console.log('AUTH_UID:', uid);
    console.log('stripe endpoint:', endpoint);
    const hint = stripeCheckoutEnvMismatchHint(checkoutHostname);
    if (hint) console.warn('[stripeHostedCheckout]', hint);
  }

  const clientKind = Platform.OS === 'web' ? 'web' : 'expo-native';
  const trimmedName = customerName.trim();

  logMobileStripeEnvironmentBeforeStripeApi(orderId, checkoutHostname);

  if (!endpoint || typeof endpoint !== 'string' || !endpoint.startsWith('https')) {
    return { ok: false, message: 'Invalid checkout endpoint (mobile env misconfiguration)' };
  }

  try {
    let lastMsg = 'Checkout failed';
    for (let attempt = 0; attempt < MAX_CHECKOUT_FETCH_ATTEMPTS; attempt += 1) {
      if (attempt > 0) {
        const delayMs = 300 * 2 ** (attempt - 1);
        await new Promise((r) => setTimeout(r, delayMs));
      }
      const user = auth.currentUser;
      if (!user) {
        return { ok: false, message: 'User not authenticated' };
      }
      const token =
        attempt === 0
          ? await user.getIdToken()
          : await user.getIdToken(true);
      if (!token) {
        return { ok: false, message: 'Missing Firebase auth token' };
      }
      if (typeof __DEV__ !== 'undefined' && __DEV__) {
        console.log('TOKEN_STATUS:', token ? 'present' : 'missing');
      }
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId: normalizeOrderIdForStripePost(orderId),
          customerName: trimmedName,
          clientKind,
        }),
        cache: 'no-store',
        mode: 'cors',
      });
      const raw = await res.text();
      let data: Record<string, unknown> = {};
      if (raw) {
        try {
          data = JSON.parse(raw) as Record<string, unknown>;
        } catch {
          data = { error: raw.slice(0, 400) };
        }
      }
      if (typeof __DEV__ !== 'undefined' && __DEV__) {
        console.log('BACKEND_DEBUG:', data.debug);
        const dbg = data.debug;
        const backendProj =
          dbg &&
          typeof dbg === 'object' &&
          typeof (dbg as { project?: unknown }).project === 'string'
            ? (dbg as { project: string }).project
            : undefined;
        const mobileProj = firebaseApp.options?.projectId;
        if (
          backendProj !== undefined &&
          mobileProj !== undefined &&
          backendProj !== mobileProj
        ) {
          console.warn('⚠️ FIREBASE PROJECT MISMATCH DETECTED');
        }
      }
      const url = typeof data.url === 'string' ? data.url.trim() : '';
      if (res.ok && url) {
        return { ok: true, url, resolvedOrderId: orderId, resolutionSource };
      }
      const msg =
        (typeof data.error === 'string' && data.error.trim()) ||
        `Checkout failed (${res.status})`;
      lastMsg = msg;

      /** Retry ONLY 404 + body referencing missing order — never 401 / 403 / 429 / 500. */
      const isOrderMissing = res.status === 404 && /not\s*found/i.test(msg);
      if (isOrderMissing && attempt < MAX_CHECKOUT_FETCH_ATTEMPTS - 1) {
        continue;
      }
      if (isOrderMissing) {
        const envHint = stripeCheckoutEnvMismatchHint(checkoutHostname);
        return {
          ok: false,
          message: [
            `${msg}.`,
            `Firestore project expected: ${EXPECTED_FIREBASE_PROJECT_ID}.`,
            envHint ||
              'Possible backend project mismatch: check EXPO_PUBLIC_STRIPE_CHECKOUT_URL',
          ].join(' '),
        };
      }
      return { ok: false, message: msg };
    }
    return { ok: false, message: lastMsg };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return {
      ok: false,
      message: /failed to fetch|networkerror|load failed/i.test(msg)
        ? 'Network error: could not reach checkout. Check your connection.'
        : msg,
    };
  }
}

/**
 * Dev-only: POST to createStripeCheckout with a known `orderId` (Cloud Run enforces state / ownership).
 */
export async function devManualStripeCheckoutProbe(orderIdRaw: string): Promise<{
  ok: boolean;
  status: number;
  body: string;
}> {
  if (typeof __DEV__ === 'undefined' || !__DEV__) {
    throw new Error('devManualStripeCheckoutProbe: dev builds only');
  }
  await auth.authStateReady();
  const u = auth.currentUser;
  if (!u) throw new Error('User not authenticated');
  const probeCache = createStripeCheckoutFirestoreCache(); /* shared: resolve + ensure */
  let orderId: string;
  let probeResolutionSource: StripeOrderResolutionSource;
  try {
    const r = await resolveStripeOrderId(orderIdRaw, u.uid, probeCache);
    orderId = r.resolvedOrderId;
    probeResolutionSource = r.source;
  } catch (e) {
    const m = e instanceof Error ? e.message : String(e);
    if (m === 'Unauthorized order access') throw e;
    throw new Error('Order not found in Firestore');
  }
  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    try {
      assertValidStripeCheckoutOrderId(orderId);
    } catch {
      console.warn('[devManualStripeCheckoutProbe] orderId format (dev only):', orderId);
    }
  }
  await ensureOrderPendingPaymentBeforeStripe(orderId, probeCache);
  const ep = requireStripeCheckoutHttpUrlForRequest();
  if (!ep.ok) throw new Error(ep.message);
  const endpoint = ep.url;
  if (!endpoint || typeof endpoint !== 'string' || !endpoint.startsWith('https')) {
    throw new Error('Invalid checkout endpoint (mobile env misconfiguration)');
  }
  const token = await u.getIdToken();
  if (!token) {
    throw new Error('Missing Firebase auth token');
  }
  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    console.log('rawOrderId:', orderIdRaw);
    console.log('resolvedOrderId:', orderId);
    console.log('resolutionSource:', probeResolutionSource);
    console.log('FIREBASE_PROJECT_ID:', firebaseApp.options.projectId);
    console.log('AUTH_UID:', u.uid);
    console.log('stripe endpoint:', endpoint);
    console.log('TOKEN_STATUS:', token ? 'present' : 'missing');
  }
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      orderId: normalizeOrderIdForStripePost(orderId),
      customerName: 'Customer',
      clientKind: Platform.OS === 'web' ? 'web' : 'expo-native',
    }),
    cache: 'no-store',
    mode: 'cors',
  });
  const body = await res.text();
  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    try {
      const json = JSON.parse(body) as Record<string, unknown>;
      console.log('BACKEND_DEBUG:', json.debug);
      const dbg = json.debug;
      const backendProj =
        dbg &&
        typeof dbg === 'object' &&
        typeof (dbg as { project?: unknown }).project === 'string'
          ? (dbg as { project: string }).project
          : undefined;
      const mobileProj = firebaseApp.options?.projectId;
      if (
        backendProj !== undefined &&
        mobileProj !== undefined &&
        backendProj !== mobileProj
      ) {
        console.warn('⚠️ FIREBASE PROJECT MISMATCH DETECTED');
      }
    } catch {
      /* non-JSON */
    }
  }
  console.log('[devManualStripeCheckoutProbe]', { status: res.status, body: body.slice(0, 600) });
  return { ok: res.ok, status: res.status, body };
}

export type OpenStripeHostedCheckoutResult =
  | { kind: 'success' }
  | { kind: 'cancel' }
  | { kind: 'dismiss' }
  | { kind: 'opened_web' }
  | { kind: 'error'; message: string };

export async function openStripeHostedCheckout(
  orderId: string,
  customerName: string
): Promise<OpenStripeHostedCheckoutResult> {
  const sess = await requestStripeCheckoutSessionUrl(orderId, customerName);
  if (!sess.ok) {
    return { kind: 'error', message: sess.message };
  }

  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined') {
      window.location.href = sess.url;
      return { kind: 'opened_web' };
    }
    return { kind: 'error', message: 'Browser environment not available.' };
  }

  const encoded = encodeURIComponent(normalizeOrderIdForStripePost(sess.resolvedOrderId));
  const returnUrl = `stmmobile://order-tracking/${encoded}`;

  const result = await WebBrowser.openAuthSessionAsync(sess.url, returnUrl);
  if (result.type === 'success') {
    const u = result.url || '';
    if (u.includes('payment=cancel')) return { kind: 'cancel' };
    return { kind: 'success' };
  }
  if (result.type === 'cancel') {
    return { kind: 'cancel' };
  }
  return { kind: 'dismiss' };
}
