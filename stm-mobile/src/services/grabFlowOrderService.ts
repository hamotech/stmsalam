/**
 * Grab-style order lifecycle. Order **creation** is server-only via callable `createGrabOrder`.
 * Optional client updates to existing orders (e.g. admin pipeline) use Firestore where rules allow.
 *
 * **Multi-device:** idempotency keys dedupe per user; **checkout leases** (`claimCheckoutLease` / server
 * `checkout_lease`) stop two devices from both entering create with divergent keys. Offline-queue idempotency
 * (`offline-queue:*`) skips the lease.
 */

import { doc, onSnapshot, updateDoc, type Unsubscribe, Timestamp, type Firestore } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { app, auth, db, CALLABLE_REGION, EXPECTED_FIREBASE_PROJECT_ID, functions } from './firebase';
import { resolveOrderDisplayTotal } from './orderService';
import { ensureSignedInUid } from './ensureSignedInUid';

/** PENDING = COD (no online payment); PENDING_VERIFICATION = Stripe / QR until verified PAID. */
export type GrabPaymentStatus = 'PAID' | 'PENDING_VERIFICATION' | 'PENDING';

export type GrabOrderStatus =
  | 'PLACED'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'READY'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';

export type GrabPaymentMethod = 'paypal' | 'stripe' | 'qr' | 'phone' | 'cod' | 'scanpay';

export type GrabOrderItem = { name: string; qty: number; price: number };

export type GrabOrderDoc = {
  id: string;
  userId: string;
  items: GrabOrderItem[];
  totalAmount: number;
  total?: string;
  paymentMethod?: GrabPaymentMethod;
  paymentStatus?: GrabPaymentStatus;
  orderStatus?: GrabOrderStatus;
  status: string;
  flow?: string;
  createdAt: Timestamp | string;
  estimatedDeliveryAt?: Timestamp | string | null;
  paymentRef?: string;
  customer?: { name?: string; phone?: string; address?: string; notes?: string };
  mode?: 'delivery' | 'pickup';
  orderType?: 'delivery' | 'pickup';
  deliveryFee?: string;
  subtotal?: string;
  customerMarkedPaidAt?: Timestamp | string | null;
  qrCustomerClaimedAt?: Timestamp | string | null;
  lastPushToken?: string | null;
  userLocation?: { lat: number; lng: number } | null;
  distanceKm?: number | null;
};

/** Default ETA window shown to customers (matches older server \`estimatedDeliveryAt\`). */
export const GRAB_ESTIMATED_DELIVERY_MINUTES = 45;

export function makeGrabOrderId(): string {
  return `STM-${Date.now()}`;
}

/** Client-side ETA label for confirmation screen. */
export function grabDefaultEtaIsoFromNow(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() + GRAB_ESTIMATED_DELIVERY_MINUTES);
  return d.toISOString();
}

function toLegacyTrackingStatus(orderStatus: GrabOrderStatus): string {
  if (orderStatus === 'PLACED') return 'PENDING';
  if (orderStatus === 'CANCELLED') return 'CANCELLED';
  return orderStatus;
}

async function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function withRetry<T>(fn: () => Promise<T>, attempts = 3, baseMs = 400): Promise<T> {
  let last: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      last = e;
      console.warn('[grabFlowOrderService] retry', i + 1, e);
      if (i < attempts - 1) await sleep(baseMs * (i + 1));
    }
  }
  throw last instanceof Error ? last : new Error('Operation failed after retries');
}

export type CheckoutPaymentRail = 'cod' | 'stripe' | 'qr';

/** Callable wire format — must match `frontend/functions/index.js`. */
export type CallablePaymentMode = 'COD' | 'ONLINE';

export const ALLOWED_CALLABLE_LEGACY_LABELS: readonly string[] = [
  'cod',
  'scanpay',
  'paypal',
  'stripe',
  'phone',
] as const;

const ALLOWED_LEGACY_SET: ReadonlySet<string> = new Set(ALLOWED_CALLABLE_LEGACY_LABELS);

function toCallablePaymentModeCodOnlineFromNormalizedLegacy(paymentModeNorm: string): CallablePaymentMode {
  if (paymentModeNorm === 'cod') return 'COD';
  return 'ONLINE';
}

/** Pre-callable: lowercase, trim, map UI aliases — never trust raw input. */
export function normalizePaymentModeForCallable(raw: unknown): string {
  let p = typeof raw === 'string' ? raw.trim().toLowerCase() : String(raw ?? '').trim().toLowerCase();
  if (p === 'qr') p = 'scanpay';
  if (p === 'cash') p = 'cod';
  return p;
}

/** Validates UI / legacy input; returns strict `COD` | `ONLINE` for the callable. */
export function assertCallablePaymentMode(raw: unknown): CallablePaymentMode {
  if (typeof raw === 'string') {
    const u = raw.trim();
    if (u === 'COD') return 'COD';
    if (u === 'ONLINE') return 'ONLINE';
  }
  const paymentModeNorm = normalizePaymentModeForCallable(raw);
  if (!paymentModeNorm) {
    throw new Error('Missing paymentMode before checkout');
  }
  if (!ALLOWED_LEGACY_SET.has(paymentModeNorm)) {
    throw new Error(`Invalid paymentMode: ${paymentModeNorm}`);
  }
  return toCallablePaymentModeCodOnlineFromNormalizedLegacy(paymentModeNorm);
}

const CHECKOUT_IDEMPOTENCY_STORAGE_KEY = 'stm_checkout_idempotency_v1';
/** Persisted fence: must match server `checkout_lease` for this checkout attempt (Option A). */
const CHECKOUT_SESSION_FENCE_STORAGE_KEY = 'stm_checkout_session_fence_v1';
/** Survives process kill: order created but nav not completed — never mix with `offline-queue:*`. */
const PENDING_CHECKOUT_RESOLUTION_KEY = 'stm_checkout_pending_resolution_v1';
const PENDING_RESOLUTION_MAX_AGE_MS = 60 * 60 * 1000;

type PendingCheckoutResolution = {
  idempotencyKey: string;
  orderId: string;
  ts: number;
  resumeRail: 'cod' | 'stripe' | 'qr';
  qrTotal?: string;
};

export type PendingCheckoutResumeNav =
  | { kind: 'orderTracking'; orderId: string }
  | { kind: 'grabStripePayment'; orderId: string }
  | { kind: 'grabPaymentQr'; orderId: string; total: string };

function inferResumeRailFromPayload(payload: {
  paymentMode?: unknown;
  paymentMethod?: unknown;
  totalAmount?: number;
}): 'cod' | 'stripe' | 'qr' {
  const raw = String(payload.paymentMode ?? payload.paymentMethod ?? 'cod').toLowerCase();
  if (raw === 'stripe' || raw === 'paypal') return 'stripe';
  if (raw === 'qr' || raw === 'scanpay' || raw === 'paynow') return 'qr';
  return 'cod';
}

async function persistPendingCheckoutResolution(
  idem: string,
  orderId: string,
  payload: {
    paymentMode?: unknown;
    paymentMethod?: unknown;
    totalAmount?: number;
  }
): Promise<void> {
  if (isOfflineQueueScopedIdempotencyKey(idem)) return;
  try {
    const resumeRail = inferResumeRailFromPayload(payload);
    const rec: PendingCheckoutResolution = {
      idempotencyKey: idem,
      orderId: orderId.trim(),
      ts: Date.now(),
      resumeRail,
    };
    if (resumeRail === 'qr') {
      rec.qrTotal = String(Number(payload.totalAmount) ?? 0);
    }
    await AsyncStorage.setItem(PENDING_CHECKOUT_RESOLUTION_KEY, JSON.stringify(rec));
  } catch {
    /* ignore */
  }
}

async function readCachedOrderIdForIdempotencyKey(idem: string): Promise<string> {
  if (isOfflineQueueScopedIdempotencyKey(idem)) return '';
  try {
    const raw = await AsyncStorage.getItem(PENDING_CHECKOUT_RESOLUTION_KEY);
    if (!raw) return '';
    const o = JSON.parse(raw) as PendingCheckoutResolution;
    if (Date.now() - (o.ts || 0) > PENDING_RESOLUTION_MAX_AGE_MS) {
      await AsyncStorage.removeItem(PENDING_CHECKOUT_RESOLUTION_KEY);
      return '';
    }
    if (o.idempotencyKey === idem && typeof o.orderId === 'string' && o.orderId.trim()) {
      return o.orderId.trim();
    }
  } catch {
    /* ignore */
  }
  return '';
}

/** Exposed for crash resume UI (FullCheckout / Payment). */
export async function readPendingCheckoutResolution(): Promise<PendingCheckoutResolution | null> {
  try {
    const raw = await AsyncStorage.getItem(PENDING_CHECKOUT_RESOLUTION_KEY);
    if (!raw) return null;
    const o = JSON.parse(raw) as PendingCheckoutResolution;
    if (Date.now() - (o.ts || 0) > PENDING_RESOLUTION_MAX_AGE_MS) {
      await AsyncStorage.removeItem(PENDING_CHECKOUT_RESOLUTION_KEY);
      return null;
    }
    if (!o.orderId?.trim()) return null;
    return o;
  } catch {
    return null;
  }
}

export async function readPendingCheckoutForResume(): Promise<PendingCheckoutResumeNav | null> {
  const p = await readPendingCheckoutResolution();
  if (!p?.orderId?.trim()) return null;

  const storedIdem = (await readPersistedCheckoutIdempotencyKey()).trim();
  const pendingIdem = (p.idempotencyKey || '').trim();
  if (storedIdem && pendingIdem && storedIdem !== pendingIdem) {
    try {
      await AsyncStorage.removeItem(PENDING_CHECKOUT_RESOLUTION_KEY);
    } catch {
      /* ignore */
    }
    return null;
  }

  const orderId = p.orderId.trim();
  if (p.resumeRail === 'stripe') return { kind: 'grabStripePayment', orderId };
  if (p.resumeRail === 'qr') return { kind: 'grabPaymentQr', orderId, total: p.qrTotal ?? '0' };
  return { kind: 'orderTracking', orderId };
}

function isOfflineQueueScopedIdempotencyKey(k: string): boolean {
  return k.startsWith('offline-queue:');
}

async function readPersistedCheckoutIdempotencyKey(): Promise<string> {
  try {
    const v = await AsyncStorage.getItem(CHECKOUT_IDEMPOTENCY_STORAGE_KEY);
    const s = typeof v === 'string' ? v.trim() : '';
    if (!s || isOfflineQueueScopedIdempotencyKey(s)) return '';
    return s;
  } catch {
    return '';
  }
}

async function persistCheckoutIdempotencyKey(key: string): Promise<void> {
  try {
    const k = key.trim();
    if (k && !isOfflineQueueScopedIdempotencyKey(k)) {
      await AsyncStorage.setItem(CHECKOUT_IDEMPOTENCY_STORAGE_KEY, k);
    }
  } catch {
    /* ignore */
  }
}

async function getOrCreateCheckoutSessionFence(): Promise<string> {
  try {
    const v = await AsyncStorage.getItem(CHECKOUT_SESSION_FENCE_STORAGE_KEY);
    const s = typeof v === 'string' ? v.trim() : '';
    if (s) return s;
  } catch {
    /* ignore */
  }
  const f =
    globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  try {
    await AsyncStorage.setItem(CHECKOUT_SESSION_FENCE_STORAGE_KEY, f);
  } catch {
    /* ignore */
  }
  return f;
}

/** Drop only the retry key after a successful `createGrabOrder` but before navigation lands (see `PENDING_CHECKOUT_RESOLUTION_KEY`). */
export async function clearCheckoutIdempotencyKeyOnly(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([CHECKOUT_IDEMPOTENCY_STORAGE_KEY, CHECKOUT_SESSION_FENCE_STORAGE_KEY]);
  } catch {
    /* ignore */
  }
}

/**
 * Called when the user has reached the post-checkout screen for this `orderId`.
 * Avoid clearing while still on checkout — otherwise a crash mid-nav loses crash-resume.
 */
export async function clearPendingCheckoutResolutionIfMatchesOrder(orderId: string): Promise<void> {
  const id = orderId.trim();
  if (!id) return;
  try {
    const raw = await AsyncStorage.getItem(PENDING_CHECKOUT_RESOLUTION_KEY);
    if (!raw) return;
    const o = JSON.parse(raw) as PendingCheckoutResolution;
    if (typeof o.orderId === 'string' && o.orderId.trim() === id) {
      await AsyncStorage.removeItem(PENDING_CHECKOUT_RESOLUTION_KEY);
    }
  } catch {
    /* ignore */
  }
}

/** After checkout is fully committed (order confirmed to user / navigation). */
export async function clearCheckoutIdempotencyPersistence(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([
      CHECKOUT_IDEMPOTENCY_STORAGE_KEY,
      PENDING_CHECKOUT_RESOLUTION_KEY,
      CHECKOUT_SESSION_FENCE_STORAGE_KEY,
    ]);
  } catch {
    /* ignore */
  }
  void releaseServerCheckoutLease();
}

function createIdempotencyKey(): string {
  return (
    globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`
  );
}

/** Same as web `createCheckoutIdempotencyKey` — reuse one value per checkout attempt across retries. */
export function createCheckoutIdempotencyKey(): string {
  return createIdempotencyKey();
}

/** Callables must not receive `undefined` keys (SDK / encoding issues). */
function jsonSafeForCallable(value: Record<string, unknown>): Record<string, unknown> {
  try {
    return JSON.parse(JSON.stringify(value)) as Record<string, unknown>;
  } catch {
    throw new Error('Invalid order data. Please refresh and try again.');
  }
}

export const createGrabOrder = httpsCallable(functions, 'createGrabOrder', { timeout: 90_000 });
const claimCheckoutLease = httpsCallable(functions, 'claimCheckoutLease', { timeout: 60_000 });
const releaseCheckoutLease = httpsCallable(functions, 'releaseCheckoutLease', { timeout: 30_000 });

export type PlaceGrabOrderPayload = {
  items: GrabOrderItem[];
  totalAmount: number;
  paymentMode?: GrabPaymentMethod | CheckoutPaymentRail | CallablePaymentMode | string;
  /** Alias for legacy / alternate payloads (mirrors Cloud Function). */
  paymentMethod?: string;
  /** Reuse the same key for all retries of one checkout attempt. */
  idempotencyKey?: string;
  metaData?: Record<string, unknown>;
};

function callableErrorCode(e: unknown): string {
  if (!e || typeof e !== 'object') return '';
  const o = e as Record<string, unknown>;
  if (typeof o.code === 'string' && o.code.length > 0) {
    return o.code;
  }
  const msg = typeof o.message === 'string' ? o.message : '';
  if (/not-found|^NOT_FOUND$/i.test(msg)) return 'functions/not-found';
  if (/unauthenticated|not authenticated|auth\/internal-error/i.test(msg)) return 'functions/unauthenticated';
  return '';
}

function callableErrorMessage(e: unknown): string {
  if (!e || typeof e !== 'object') return '';
  const m = (e as { message?: string }).message;
  return typeof m === 'string' ? m.trim() : '';
}

function callableErrorDetailsMessage(e: unknown): string {
  if (!e || typeof e !== 'object') return '';
  const d = (e as { details?: unknown }).details;
  if (typeof d === 'object' && d !== null && 'message' in d) {
    const m = (d as { message?: unknown }).message;
    if (typeof m === 'string' && m.trim()) return m.trim();
  }
  if (typeof d === 'string' && d.trim()) return d.trim();
  const c = (e as { customData?: unknown }).customData;
  if (typeof c === 'object' && c !== null && 'message' in c) {
    const m = (c as { message?: unknown }).message;
    if (typeof m === 'string' && m.trim()) return m.trim();
  }
  return '';
}

/**
 * Maps Cloud Function / client errors to a short user-facing explanation (detail in console).
 */
function mapCallableFailureToUserMessage(e: unknown): string {
  const code = callableErrorCode(e);
  const raw = callableErrorMessage(e);
  const detail = callableErrorDetailsMessage(e);

  if (code === 'functions/unauthenticated') {
    return raw || detail || 'User not authenticated';
  }
  if (code === 'functions/invalid-argument') {
    return raw || detail || 'Invalid order. Please refresh your cart and try again.';
  }
  if (code === 'functions/failed-precondition') {
    return raw || detail || 'Could not save order. Please try again.';
  }
  if (
    code === 'functions/not-found' ||
    code === 'not-found' ||
    (code && code.endsWith('/not-found'))
  ) {
    return 'Order service is not available. Deploy createGrabOrder to project teh-tarik-app-my-own in region us-central1.';
  }
  if (code === 'functions/deadline-exceeded' || /deadline/i.test(raw)) {
    return 'The order request timed out. Check your connection and try again.';
  }
  if (code === 'functions/unavailable' || code === 'functions/resource-exhausted') {
    return 'Order service is busy or temporarily unavailable. Try again in a moment.';
  }
  if (code === 'functions/permission-denied') {
    return 'Could not reach order service. Check deployment permissions and try again.';
  }
  if (code === 'functions/internal') {
    if (/corrupted idempotency state/i.test(raw) || /corrupted idempotency state/i.test(detail)) {
      return 'Corrupted idempotency state';
    }
    if (detail && !/^internal\.?$/i.test(detail)) {
      return detail;
    }
    return raw || 'Order service error (internal). Check logs [CF][CREATE_ORDER_ERROR].';
  }

  if (raw) {
    return `Could not place order: ${raw}`;
  }
  return 'Could not place order. Check your connection and try again.';
}

/** Pre-callable checks only: locked projectId + CALLABLE_REGION (no env). */
function assertFirebaseCallableBinding(): void {
  const pid = app.options?.projectId;
  if (!pid || pid !== EXPECTED_FIREBASE_PROJECT_ID) {
    throw new Error(
      `Firebase project mismatch detected. Expected ${EXPECTED_FIREBASE_PROJECT_ID} but got ${pid ?? '(missing)'}`
    );
  }
  if (CALLABLE_REGION !== 'us-central1') {
    throw new Error(`Invalid callable region: ${CALLABLE_REGION}. Expected us-central1.`);
  }
  console.log('[CHECKOUT] PROJECT:', pid);
  console.log('[CHECKOUT] REGION:', CALLABLE_REGION);
}

/**
 * Ensures a real Firebase user (email or anonymous) so callables send Authorization.
 * Does not replace email sessions — only signs in anonymously when no user exists.
 */
export async function prepareCallableAuthSession(): Promise<string> {
  await ensureSignedInUid();
  await auth.authStateReady();
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Could not start checkout session. Check your connection and try again.');
  }
  return user.getIdToken(true);
}

function isTransientCallableFailure(e: unknown): boolean {
  const c = callableErrorCode(e);
  return (
    c === 'functions/unavailable' ||
    c === 'functions/internal' ||
    c === 'functions/deadline-exceeded' ||
    c === 'functions/resource-exhausted'
  );
}

async function createGrabOrderWithAuthRetry(
  callablePayload: Record<string, unknown>
): Promise<Awaited<ReturnType<typeof createGrabOrder>>> {
  try {
    return await createGrabOrder(callablePayload);
  } catch (first: unknown) {
    if (callableErrorCode(first) === 'functions/unauthenticated') {
      try {
        await prepareCallableAuthSession();
        await sleep(400);
        return await createGrabOrder(callablePayload);
      } catch (second: unknown) {
        console.error('[ORDER_CREATE_FAIL]', {
          phase: 'retry_after_unauthenticated',
          code: callableErrorCode(second),
        });
        throw second;
      }
    }
    throw first;
  }
}

async function claimCheckoutLeaseWithAuthRetry(
  payload: Record<string, unknown>
): Promise<void> {
  try {
    await claimCheckoutLease(payload);
  } catch (first: unknown) {
    if (callableErrorCode(first) === 'functions/unauthenticated') {
      await prepareCallableAuthSession();
      await sleep(400);
      await claimCheckoutLease(payload);
      return;
    }
    throw first;
  }
}

/** Release server checkout lease (Option A). Safe to no-op on failure. */
export async function releaseServerCheckoutLease(): Promise<void> {
  try {
    await auth.authStateReady();
    if (!auth.currentUser) return;
    await releaseCheckoutLease({});
  } catch (e) {
    console.warn('[grabFlowOrderService] releaseCheckoutLease', e);
  }
}

/**
 * Places an order via callable `createGrabOrder` only.
 * Payload: `items`, `totalAmount` (number), `paymentMode` (`COD`|`ONLINE`), `idempotencyKey`.
 */
export async function placeGrabOrderAtCheckout(payload: PlaceGrabOrderPayload): Promise<string> {
  await prepareCallableAuthSession();

  if (!auth.currentUser?.uid?.trim()) {
    throw new Error('Could not start checkout session. Check your connection and try again.');
  }

  const totalAmount = Number(payload.totalAmount);
  if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
    throw new Error('Invalid totalAmount');
  }
  const paymentModeCodOnline = assertCallablePaymentMode(
    payload.paymentMode ?? payload.paymentMethod ?? 'cod'
  );

  assertFirebaseCallableBinding();

  const passed = typeof payload.idempotencyKey === 'string' ? payload.idempotencyKey.trim() : '';
  let idempotencyKey: string;
  if (passed && isOfflineQueueScopedIdempotencyKey(passed)) {
    idempotencyKey = passed;
  } else {
    const stored = await readPersistedCheckoutIdempotencyKey();
    idempotencyKey = passed || stored || createIdempotencyKey();
    await persistCheckoutIdempotencyKey(idempotencyKey);
  }

  if (!isOfflineQueueScopedIdempotencyKey(idempotencyKey)) {
    const cachedOid = await readCachedOrderIdForIdempotencyKey(idempotencyKey);
    if (cachedOid) {
      console.log('[CHECKOUT] resolved-order cache hit (pending resolution)');
      return cachedOid;
    }
  }

  const checkoutFence = await getOrCreateCheckoutSessionFence();
  if (!isOfflineQueueScopedIdempotencyKey(idempotencyKey)) {
    await claimCheckoutLeaseWithAuthRetry(
      jsonSafeForCallable({
        idempotencyKey,
        checkoutFence,
      })
    );
  }

  const callablePayload = jsonSafeForCallable({
    items: payload.items,
    totalAmount,
    paymentMode: paymentModeCodOnline,
    idempotencyKey,
    checkoutFence,
  });

  const itemsCount = Array.isArray(payload.items) ? payload.items.length : 0;
  console.log('[CHECKOUT_FIREBASE_CALL]', {
    itemsCount,
    totalAmount,
    paymentMode: paymentModeCodOnline,
    hasIdempotencyKey: Boolean(callablePayload.idempotencyKey),
  });

  let result: Awaited<ReturnType<typeof createGrabOrder>> | undefined;
  let lastErr: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) await sleep(700 * attempt);
    try {
      console.log('[ORDER_CREATE_START]', { attempt: attempt + 1 });
      result = await createGrabOrderWithAuthRetry(callablePayload);
      break;
    } catch (e: unknown) {
      lastErr = e;
      console.error('[ORDER_CREATE_FAIL]', {
        attempt: attempt + 1,
        code: callableErrorCode(e),
        message: callableErrorMessage(e),
        transient: isTransientCallableFailure(e),
      });
      if (!isTransientCallableFailure(e) || attempt === 2) {
        throw new Error(mapCallableFailureToUserMessage(e));
      }
    }
  }
  if (!result) {
    console.error('[ORDER_CREATE_FAIL]', { reason: 'exhausted_retries' });
    throw new Error(mapCallableFailureToUserMessage(lastErr));
  }

  const data = result.data as { orderId?: string };
  const orderId = typeof data?.orderId === 'string' ? data.orderId.trim() : '';
  if (!orderId) {
    console.error('[ORDER_CREATE_FAIL]', { reason: 'missing_orderId_in_response' });
    throw new Error('createGrabOrder: missing orderId');
  }

  await persistPendingCheckoutResolution(idempotencyKey, orderId, payload);

  console.log('[ORDER_CREATE_SUCCESS]', { orderId });
  return orderId;
}

export async function updateGrabPipelineStatus(
  firestore: Firestore,
  orderId: string,
  orderStatus: GrabOrderStatus,
  extra?: Record<string, unknown>
): Promise<void> {
  const legacy = toLegacyTrackingStatus(orderStatus);
  await withRetry(async () => {
    await updateDoc(doc(firestore, 'orders', orderId), {
      orderStatus,
      status: legacy,
      ...(extra && Object.keys(extra).length ? extra : {}),
    });
  });
}

/**
 * Live customer tracking: subscribes to `public_tracking` (world-readable mirror of `orders/{id}`).
 */
export function subscribeGrabOrderDoc(
  orderId: string,
  onData: (order: GrabOrderDoc | null) => void,
  onError?: (e: Error) => void
): Unsubscribe {
  if (!orderId?.trim()) {
    onData(null);
    return () => {};
  }
  /** Avoid false "missing order" before `syncOrderToPublicTracking` creates the mirror; still notify null after a real delete. */
  let sawExistingDoc = false;
  return onSnapshot(
    doc(db, 'public_tracking', orderId.trim()),
    (snap) => {
      if (snap.exists()) {
        sawExistingDoc = true;
        const raw = snap.data();
        const merged = { id: snap.id, ...raw } as GrabOrderDoc;
        merged.totalAmount = resolveOrderDisplayTotal(merged as unknown as Record<string, unknown>);
        onData(merged);
        return;
      }
      if (sawExistingDoc) {
        onData(null);
      }
    },
    (err) => {
      console.error('[grabFlowOrderService]', err);
      onError?.(err as Error);
    }
  );
}
