/**
 * ⚠️ DOMAIN EXCEPTION FILE
 * Owns order read-model normalization/resolver logic only. Keep UI/render concerns out of this module.
 *
 * Order read-model boundary (client + admin).
 *
 * **Preferred:** screens, analytics, and customer UI derive behaviour from `getOrderContext(order)` only.
 * Reuse the returned object for the whole render / handler — do not mix in separate
 * `readCanonicalOrderStatus` / `normalizeCanonicalPaymentStatus` / queue checks for the same concerns,
 * or semantics can drift when those helpers change.
 *
 * **Exceptions (keep using specialized exports):** transition guards — `canTransitionTo`,
 * `nextPipelineStep`, `paymentAllowsConfirm`, `assertValidOrderTransition` — need raw rules or
 * partial inputs (e.g. status string only).
 *
 * **Versioning / replay:** persist `readModelVersion` with analytics payloads. When bumping
 * `ORDER_READ_MODEL_VERSION`, extend **`getOrderContextResolver` only** (keep v1/v2/… builders here)
 * so version logic never spreads across modules. Prior rulesets stay callable via `{ version: N }`.
 *
 * `financialStatus` is **reporting / analytics** (settlement bucket). Do not use it as the primary
 * driver for fulfilment UI; use `canonicalStatus`, `uiStatus`, and `isQueueEligible`.
 * It is derived **last** from `isSettled` and normalized payment only — never use `financialStatus`
 * as an input to any other derived field.
 */

import {
  readCanonicalOrderStatus,
  nextAdminLifecycleStatus,
  assertValidOrderTransition,
  coerceAdminIntentToCanonical,
} from '@/src/domain/orderStateMachine';
import {
  ORDER_PIPELINE_MODES as SHARED_ORDER_PIPELINE_MODES,
  resolveOrderPipelineMode as resolveOrderPipelineModeFromShared,
  compareOrderContextSubset as compareOrderContextSubsetFromShared,
  createOrderPipelineModeAuditPayload as createOrderPipelineModeAuditPayloadFromShared,
} from '../../../shared/orderPipelineControlPlane.js';

/**
 * Current read-model ruleset. When this increments:
 * 1. Add `getOrderContextV{N}` and register it in `getOrderContextResolver` (keep previous builders).
 * 2. Append `N` to `SUPPORTED_ORDER_READ_MODEL_VERSIONS`.
 * 3. Dashboards replaying stored events pass the `readModelVersion` saved on the event.
 */
export const ORDER_READ_MODEL_VERSION = 1 as const;

/** Versions that `getOrderContext` must be able to interpret (extend when adding v2, v3, …). */
export const SUPPORTED_ORDER_READ_MODEL_VERSIONS = [1] as const;

export type SupportedOrderReadModelVersion = (typeof SUPPORTED_ORDER_READ_MODEL_VERSIONS)[number];

export type GetOrderContextOptions = {
  /**
   * Ruleset to apply. Defaults to `ORDER_READ_MODEL_VERSION` (latest).
   * Use a lower number only when replaying analytics / exports that recorded `readModelVersion`.
   */
  version?: number;
  /** Rollout mode trace for observability (e.g. LOCAL, DUAL_READ, SHARED). */
  modeUsed?: OrderPipelineMode;
};

export const ORDER_PIPELINE_MODES = SHARED_ORDER_PIPELINE_MODES as readonly [
  'LOCAL',
  'DUAL_READ',
  'SHARED'
];
export type OrderPipelineMode = (typeof ORDER_PIPELINE_MODES)[number];

export type ResolveOrderPipelineModeOptions = {
  modeRaw?: string | null | undefined;
  forceModeRaw?: string | null | undefined;
  defaultMode?: OrderPipelineMode;
};

export const PIPELINE_ORDER = [
  'PLACED',
  'CONFIRMED',
  'PREPARING',
  'READY',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
] as const;

export type GrabOrderStatus = (typeof PIPELINE_ORDER)[number] | 'CANCELLED';

/**
 * Ops queue: new orders awaiting kitchen accept.
 * Prefer `getOrderContext(order).isQueueEligible` in UI; keep this for transitions that only have a status string.
 */
export function isNewOrderQueueEligible(canonicalStatus: string): boolean {
  const s = String(canonicalStatus ?? '')
    .trim()
    .toLowerCase();
  return s === 'paid' || s === 'placed';
}

export function nextPipelineStep(currentOrOrder: string | Record<string, unknown>): string | null {
  const cur =
    typeof currentOrOrder === 'object' && currentOrOrder !== null
      ? readCanonicalOrderStatus(currentOrOrder)
      : readCanonicalOrderStatus({ status: currentOrOrder });
  return nextAdminLifecycleStatus(cur);
}

export function canTransitionTo(current: string | Record<string, unknown>, next: string): boolean {
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

/** @internal Low-level field read; prefer `getOrderContext(order).isCOD` in UI/analytics. */
export function normalizePaymentMethod(order: Record<string, unknown>): string {
  const m = order.paymentMethod ?? order.payment_method ?? '';
  return String(m).toLowerCase().trim();
}

/** Aligns with Cloud Run `isOrderFinanciallySettled` (Stripe checkout short-circuit). */
function hasPaidAtField(order: Record<string, unknown>): boolean {
  const p = order.paidAt;
  return p != null && p !== '';
}

function isOrderFinanciallySettledDoc(order: Record<string, unknown>): boolean {
  const ps = String(order.paymentStatus ?? order.payment_status ?? '').trim().toUpperCase();
  if (ps === 'PAID') return true;
  if (hasPaidAtField(order)) return true;
  const pm = String(order.paymentMethod ?? order.payment_mode ?? '').trim().toUpperCase();
  if (pm === 'COD' || pm === 'CASH') return false;
  const st = String(order.status ?? '').trim().toLowerCase();
  if (st === 'paid') return true;
  return false;
}

/**
 * Reporting / settlement bucket only — not fulfilment stage.
 * May evolve (refunds, partial pay); do not key primary UI flows on this enum alone.
 */
export type OrderFinancialStatus =
  | 'SETTLED'
  | 'NOT_APPLICABLE'
  | 'UNSETTLED'
  | 'PENDING_VERIFICATION'
  | 'FAILED';

export type OrderContext = {
  /** Ruleset that produced this object — persist with analytics for correct replay. */
  readModelVersion: number;
  /** Rollout execution mode that produced this context (for audit/debug). */
  modeUsed: OrderPipelineMode;
  /** Same as `readCanonicalOrderStatus` for this doc (single composition path for lifecycle). */
  canonicalStatus: string;
  /**
   * Lowercased payment rail (`cod`, `stripe`, `qr`, …). Same rules as internal `normalizePaymentMethod`;
   * exposed so UI never imports that helper (ESLint read-model firewall).
   */
  paymentMethodNorm: string;
  /**
   * Normalized payment status (`PAID`, `NOT_APPLICABLE`, `PENDING`, …). Same rules as internal
   * `normalizeCanonicalPaymentStatus`.
   */
  paymentStatusNorm: string;
  isCOD: boolean;
  isSettled: boolean;
  isQueueEligible: boolean;
  /** Display-oriented lifecycle label (`SCREAMING_SNAKE`). */
  uiStatus: string;
  /**
   * Analytics / finance bucket — **not** the main driver for kitchen or customer stage UI.
   * Derived **only** from `isSettled` and `payNorm` (see implementation); never feed this back into other fields.
   */
  financialStatus: OrderFinancialStatus;
};

export type ComparedOrderContextFields = Pick<
  OrderContext,
  'canonicalStatus' | 'financialStatus' | 'isQueueEligible' | 'paymentMethodNorm' | 'paymentStatusNorm'
>;

export type OrderContextComparisonResult = {
  match: boolean;
  diffs: Partial<Record<keyof ComparedOrderContextFields, [unknown, unknown]>>;
};

export type OrderPipelineModeAuditPayload = {
  source: string;
  modeUsed: OrderPipelineMode;
  orderId: string | null;
  readModelVersion: number | null;
  comparisonMatch: boolean | null;
  comparisonDiffs: Record<string, [unknown, unknown]>;
  canonicalStatus: string | null;
  financialStatus: string | null;
  paymentMethodNorm: string | null;
  paymentStatusNorm: string | null;
  isQueueEligible: boolean | null;
};

/** @internal Prefer `getOrderContext(order).financialStatus` in analytics; still used by payment guards. */
export function normalizeCanonicalPaymentStatus(order: Record<string, unknown>): string {
  const ps = String(order.paymentStatus ?? '').trim();
  const pl = ps.toLowerCase();
  let result: string;
  if (pl === 'paid' || ps === 'PAID') result = 'PAID';
  // Accept both new NOT_APPLICABLE and legacy COD_PENDING from existing Firestore docs.
  else if (pl === 'not_applicable' || ps === 'NOT_APPLICABLE' || pl === 'cod_pending' || ps === 'COD_PENDING') result = 'NOT_APPLICABLE';
  else if (pl === 'pending_verification' || ps === 'PENDING_VERIFICATION') result = 'PENDING_VERIFICATION';
  else if (pl === 'failed') result = 'FAILED';
  else {
    const legacy = String(order.payment_status ?? '').trim().toLowerCase();
    if (legacy === 'paid') result = 'PAID';
    else if (legacy === 'pending' || legacy === 'pending_verification') result = 'PENDING';
    else result = 'PENDING';
  }
  const method = normalizePaymentMethod(order);
  const st = String(order.status ?? '')
    .trim()
    .toLowerCase()
    .replace(/-/g, '_')
    .replace(/\s+/g, '_');
  if (
    (method === 'cod' || method === 'cash') &&
    (st === 'paid' || st === 'placed') &&
    result === 'PENDING'
  ) {
    return 'NOT_APPLICABLE';
  }
  return result;
}

function resolveFinancialStatus(
  isSettled: boolean,
  payNorm: string
): OrderFinancialStatus {
  if (isSettled) return 'SETTLED';
  if (payNorm === 'FAILED') return 'FAILED';
  // NOT_APPLICABLE = COD (settled offline; not tracked electronically).
  if (payNorm === 'NOT_APPLICABLE') return 'NOT_APPLICABLE';
  if (payNorm === 'PENDING_VERIFICATION') return 'PENDING_VERIFICATION';
  return 'UNSETTLED';
}

function getOrderContextV1(
  order: Record<string, unknown> | null | undefined,
  readModelVersion: number,
  modeUsed: OrderPipelineMode
): OrderContext {
  const o = order && typeof order === 'object' ? order : {};
  const method = normalizePaymentMethod(o);
  const isCOD = method === 'cod' || method === 'cash';
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

function assertSupportedReadModelVersion(v: number): asserts v is SupportedOrderReadModelVersion {
  const allowed = SUPPORTED_ORDER_READ_MODEL_VERSIONS as readonly number[];
  if (!allowed.includes(v)) {
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
 */
export function resolveOrderPipelineMode(
  options?: ResolveOrderPipelineModeOptions
): OrderPipelineMode {
  return resolveOrderPipelineModeFromShared(options) as OrderPipelineMode;
}

/**
 * Deterministic dual-read comparator for contract-critical fields only.
 * Ignores metadata/debug/timestamps by design.
 */
export function compareOrderContextSubset(
  localCtx: OrderContext,
  sharedCtx: OrderContext
): OrderContextComparisonResult {
  return compareOrderContextSubsetFromShared(localCtx, sharedCtx) as OrderContextComparisonResult;
}

export function createOrderPipelineModeAuditPayload(input: {
  orderId?: string | null;
  modeUsed?: string | null;
  forceModeRaw?: string | null;
  ctx?: Partial<OrderContext> | null;
  localCtx?: Partial<OrderContext> | null;
  sharedCtx?: Partial<OrderContext> | null;
}): OrderPipelineModeAuditPayload {
  return createOrderPipelineModeAuditPayloadFromShared(input) as OrderPipelineModeAuditPayload;
}

/** Builder for one read-model version — all version branching stays in `getOrderContextResolver`. */
export type OrderContextBuilder = (
  order: Record<string, unknown> | null | undefined
) => OrderContext;

/**
 * Resolver for versioned order interpretation. When adding v2+, register here only.
 */
export function getOrderContextResolver(version: number): OrderContextBuilder {
  assertSupportedReadModelVersion(version);
  if (version === 1) {
    return (order) => getOrderContextV1(order, version, 'LOCAL');
  }
  throw new Error(`Missing order context builder for read model version: ${version}`);
}

/**
 * Single derived read-model for an order document. Prefer this over recomputing flags in components.
 *
 * @example Replay a stored analytics row: `getOrderContext(doc, { version: row.readModelVersion })`
 */
export function getOrderContext(
  order: Record<string, unknown> | null | undefined,
  options?: GetOrderContextOptions
): OrderContext {
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

/** Canonical lifecycle string — implemented via `getOrderContext` so it cannot drift from the read model. */
export function normalizeGrabOrderStatus(
  order: Record<string, unknown>,
  options?: GetOrderContextOptions
): string {
  return getOrderContext(order, options).canonicalStatus;
}

export function paymentAllowsConfirm(order: Record<string, unknown>): { ok: boolean; reason?: string } {
  const method = normalizePaymentMethod(order);
  if (method === 'cod' || method === 'cash' || method === 'phone') {
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
