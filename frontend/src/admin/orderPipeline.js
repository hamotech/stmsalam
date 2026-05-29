/**
 * ⚠️ DOMAIN EXCEPTION FILE
 * Owns order read-model normalization/resolver logic only. Keep UI/render concerns out of this module.
 *
 * Order read-model boundary (admin / Vite client).
 *
 * Prefer `getOrderContext(order)` for screens and analytics; reuse the object for the whole handler.
 * Do not re-mix `readCanonicalOrderStatus` / `normalizeCanonicalPaymentStatus` / queue checks for the same
 * concerns in UI code.
 *
 * Exceptions: `canTransitionTo`, `nextPipelineStep`, `paymentAllowsConfirm` (guards / partial inputs).
 *
 * Versioning / replay: persist `readModelVersion` with analytics payloads. When bumping
 * `ORDER_READ_MODEL_VERSION`, extend **`getOrderContextResolver` only** so version logic stays in one module.
 *
 * `financialStatus` is reporting / analytics only — not the primary driver for fulfilment UI
 * (`canonicalStatus`, `uiStatus`, `isQueueEligible`). Derived last from `isSettled` and normalized
 * payment only; never use `financialStatus` as an input to other derived fields.
 */

import {
  readCanonicalOrderStatus,
  nextAdminLifecycleStatus,
  assertValidOrderTransition,
  coerceAdminIntentToCanonical,
} from '../domain/orderStateMachine.js';
import {
  ORDER_PIPELINE_MODES,
  resolveOrderPipelineMode as resolveOrderPipelineModeFromShared,
  compareOrderContextSubset as compareOrderContextSubsetFromShared,
  createOrderPipelineModeAuditPayload as createOrderPipelineModeAuditPayloadFromShared,
} from '../../../shared/orderPipelineControlPlane.js';
import { normalizeLegacyOrder } from '../lib/orderUtils.js';

/**
 * Current read-model ruleset. When this increments:
 * 1. Add `getOrderContextV{N}` and register it in `getOrderContextResolver`.
 * 2. Append N to `SUPPORTED_ORDER_READ_MODEL_VERSIONS`.
 * Keep in sync with stm-mobile `orderPipeline.ts`.
 */
export const ORDER_READ_MODEL_VERSION = 1;

/** @type {readonly number[]} */
export const SUPPORTED_ORDER_READ_MODEL_VERSIONS = Object.freeze([1]);

/** @deprecated Legacy display order; prefer canonical statuses. */
export const PIPELINE_ORDER = [
  'PLACED',
  'CONFIRMED',
  'PREPARING',
  'READY',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
];

/** Prefer `getOrderContext(order).isQueueEligible` in UI; keep for code that only has a status string. */
export function isNewOrderQueueEligible(canonicalStatus) {
  const s = String(canonicalStatus ?? '')
    .trim()
    .toLowerCase();
  return s === 'paid' || s === 'placed';
}

export function nextPipelineStep(currentOrOrder) {
  const cur =
    typeof currentOrOrder === 'object' && currentOrOrder !== null
      ? readCanonicalOrderStatus(currentOrOrder)
      : readCanonicalOrderStatus({ status: currentOrOrder });
  return nextAdminLifecycleStatus(cur);
}

/**
 * @param {string|object} current — canonical string or order doc
 * @param {string} next — legacy uppercase or canonical
 */
export function canTransitionTo(current, next) {
  const from =
    typeof current === 'object' && current !== null
      ? readCanonicalOrderStatus(current)
      : readCanonicalOrderStatus({ status: current });
  const to = coerceAdminIntentToCanonical(next);
  try {
    assertValidOrderTransition(from, to, 'admin');
    return true;
  } catch {
    return false;
  }
}

/** Low-level; prefer `getOrderContext(order).isCOD` in UI. */
export function normalizePaymentMethod(order) {
  const m = order.paymentMethod ?? order.payment_method ?? '';
  return String(m).toLowerCase().trim();
}

function hasPaidAtField(order) {
  const p = order?.paidAt;
  return p != null && p !== '';
}

/** Same rules as Cloud Run `isOrderFinanciallySettled` (Stripe checkout). */
function isOrderFinanciallySettledDoc(order) {
  const ps = String(order.paymentStatus ?? order.payment_status ?? '').trim().toUpperCase();
  if (ps === 'PAID') return true;
  if (hasPaidAtField(order)) return true;
  const pm = String(order.paymentMethod ?? order.payment_mode ?? '').trim().toUpperCase();
  if (pm === 'COD' || pm === 'CASH') return false;
  const st = String(order.status ?? '').trim().toLowerCase();
  if (st === 'paid') return true;
  return false;
}

/** For payment guards / filters; analytics should prefer `getOrderContext(order).financialStatus`. */
export function normalizeCanonicalPaymentStatus(order) {
  const ps = String(order.paymentStatus ?? '').trim();
  const pl = ps.toLowerCase();
  let result;
  if (pl === 'paid' || ps === 'PAID') result = 'PAID';
  // Use NOT_APPLICABLE for all Cash/COD flows.
  else if (pl === 'not_applicable' || ps === 'NOT_APPLICABLE') result = 'NOT_APPLICABLE';
  else if (pl === 'pending_verification' || ps === 'PENDING_VERIFICATION') result = 'PENDING_VERIFICATION';
  else if (pl === 'failed') result = 'FAILED';
  else {
    const legacy = String(order.payment_status ?? '').trim().toLowerCase();
    if (legacy === 'paid') result = 'PAID';
    else if (legacy === 'pending' || legacy === 'pending_verification') result = 'PENDING';
    else result = 'PENDING';
  }
  const method = normalizePaymentMethod(order);
  if (method === 'cod') {
    if (result === 'PENDING' || result === 'PAID') {
      return result;
    }
    return 'NOT_APPLICABLE';
  }
  return result;
}

/**
 * @param {boolean} isSettled
 * @param {string} payNorm
 * @returns {'SETTLED'|'NOT_APPLICABLE'|'UNSETTLED'|'PENDING_VERIFICATION'|'FAILED'}
 */
function resolveFinancialStatus(isSettled, payNorm) {
  if (isSettled) return 'SETTLED';
  if (payNorm === 'FAILED') return 'FAILED';
  // NOT_APPLICABLE = COD (settled offline; not tracked electronically).
  if (payNorm === 'NOT_APPLICABLE') return 'NOT_APPLICABLE';
  if (payNorm === 'PENDING_VERIFICATION') return 'PENDING_VERIFICATION';
  return 'UNSETTLED';
}

/**
 * @typedef {'SETTLED'|'NOT_APPLICABLE'|'UNSETTLED'|'PENDING_VERIFICATION'|'FAILED'} OrderFinancialStatus
 * @typedef {object} GetOrderContextOptions
 * @property {number} [version] — defaults to `ORDER_READ_MODEL_VERSION`
 * @property {'LOCAL'|'DUAL_READ'|'SHARED'} [modeUsed] — rollout execution mode trace
 *
 * @typedef {{
 *   readModelVersion: number,
 *   modeUsed: 'LOCAL'|'DUAL_READ'|'SHARED',
 *   canonicalStatus: string,
 *   paymentMethodNorm: string,
 *   paymentStatusNorm: string,
 *   isCOD: boolean,
 *   isSettled: boolean,
 *   isQueueEligible: boolean,
 *   uiStatus: string,
 *   financialStatus: OrderFinancialStatus
 * }} OrderContext
 *
 * @typedef {(order: Record<string, unknown>|null|undefined) => OrderContext} OrderContextBuilder
 */

/**
 * @param {number} v
 */
function assertSupportedReadModelVersion(v) {
  if (!SUPPORTED_ORDER_READ_MODEL_VERSIONS.includes(v)) {
    throw new Error(
      `Unsupported order read model version: ${v} (supported: ${SUPPORTED_ORDER_READ_MODEL_VERSIONS.join(', ')})`
    );
  }
}

/**
 * Safe rollout mode resolver:
 * - `forceModeRaw` (kill switch) wins if valid
 * - else `modeRaw`
 * - else `defaultMode` (LOCAL)
 *
 * @param {{ modeRaw?: string|null, forceModeRaw?: string|null, defaultMode?: 'LOCAL'|'DUAL_READ'|'SHARED' }} [options]
 * @returns {'LOCAL'|'DUAL_READ'|'SHARED'}
 */
export function resolveOrderPipelineMode(options) {
  return resolveOrderPipelineModeFromShared(options);
}

/**
 * @param {Record<string, unknown>|null|undefined} order
 * @param {number} readModelVersion
 * @param {'LOCAL'|'DUAL_READ'|'SHARED'} modeUsed
 * @returns {OrderContext}
 */
function getOrderContextV1(order, readModelVersion, modeUsed) {
  const o = normalizeLegacyOrder(order && typeof order === 'object' ? order : {});
  const method = normalizePaymentMethod(o);
  const isCOD = method === 'cod';
  const canonicalStatus = readCanonicalOrderStatus(o);
  const payNorm = normalizeCanonicalPaymentStatus(o);
  const isSettled = isOrderFinanciallySettledDoc(o);
  const isQueueEligible = isNewOrderQueueEligible(canonicalStatus);
  const uiStatus = String(canonicalStatus)
    .trim()
    .toUpperCase()
    .replace(/-/g, '_');

  const financialStatus = resolveFinancialStatus(isSettled, payNorm);

  return {
    readModelVersion,
    modeUsed,
    canonicalStatus,
    paymentMethodNorm: method,
    paymentStatusNorm: payNorm,
    isCOD,
    isSettled,
    isQueueEligible,
    uiStatus,
    financialStatus,
  };
}

/**
 * Resolver for versioned order interpretation — extend here only when adding v2+.
 * @param {number} version
 * @returns {OrderContextBuilder}
 */
export function getOrderContextResolver(version) {
  assertSupportedReadModelVersion(version);
  if (version === 1) {
    return (order) => getOrderContextV1(order, version, 'LOCAL');
  }
  throw new Error(`Missing order context builder for read model version: ${version}`);
}

/**
 * Single derived read-model for an order document (keeps stm-mobile `orderPipeline.ts` in sync).
 * @param {Record<string, unknown>|null|undefined} order
 * @param {GetOrderContextOptions} [options]
 * @returns {OrderContext}
 *
 * @example Replay a stored analytics row: `getOrderContext(doc, { version: row.readModelVersion })`
 */
export function getOrderContext(order, options) {
  const version = options?.version ?? ORDER_READ_MODEL_VERSION;
  const modeUsed = resolveOrderPipelineMode({
    modeRaw: options?.modeUsed,
    defaultMode: 'LOCAL',
  });
  if (version === 1) {
    return getOrderContextV1(order, version, modeUsed);
  }
  return getOrderContextResolver(version)(order);
}

/**
 * Deterministic dual-read comparator for contract-critical fields only.
 * Ignores metadata/debug/timestamps by design.
 *
 * @param {OrderContext} localCtx
 * @param {OrderContext} sharedCtx
 * @returns {{ match: boolean, diffs: Partial<Record<'canonicalStatus'|'financialStatus'|'isQueueEligible'|'paymentMethodNorm'|'paymentStatusNorm', [unknown, unknown]>> }}
 */
export function compareOrderContextSubset(localCtx, sharedCtx) {
  return compareOrderContextSubsetFromShared(localCtx, sharedCtx);
}

/**
 * Shared observability payload for rollout/audit logs.
 * @param {object} input
 * @returns {{
 *  source: string,
 *  modeUsed: 'LOCAL'|'DUAL_READ'|'SHARED',
 *  orderId: string|null,
 *  readModelVersion: number|null,
 *  comparisonMatch: boolean|null,
 *  comparisonDiffs: Record<string, [unknown, unknown]>,
 *  canonicalStatus: string|null,
 *  financialStatus: string|null,
 *  paymentMethodNorm: string|null,
 *  paymentStatusNorm: string|null,
 *  isQueueEligible: boolean|null
 * }}
 */
export function createOrderPipelineModeAuditPayload(input) {
  return createOrderPipelineModeAuditPayloadFromShared(input);
}

/** Canonical lifecycle — always goes through `getOrderContext` so it cannot drift. */
export function normalizeGrabOrderStatus(order, options) {
  return getOrderContext(order, options).canonicalStatus;
}

export function paymentAllowsConfirm(order) {
  const method = normalizePaymentMethod(order);
  if (method === 'cod' || method === 'phone') {
    return { ok: true };
  }
  const ps = normalizeCanonicalPaymentStatus(order);
  if (ps === 'PAID') return { ok: true };
  return {
    ok: false,
    reason:
      'Payment must be verified (PAID) before confirming. Complete Stripe verification or mark QR/online as PAID.',
  };
}

export function orderMatchesPaymentFilter(order, filter) {
  if (filter === 'all') return true;
  const ctx = getOrderContext(order);
  const method = ctx.paymentMethodNorm;
  const ps = ctx.paymentStatusNorm;
  if (filter === 'cod') return method === 'cod';
  if (filter === 'stripe_paid') return (method === 'stripe' || method === 'paypal') && ps === 'PAID';
  if (filter === 'qr_pending') return method === 'qr' && ps !== 'PAID';
  return true;
}
