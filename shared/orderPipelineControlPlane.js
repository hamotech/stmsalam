/**
 * Shared order pipeline control plane.
 * Owns rollout mode resolution and deterministic comparator only.
 */

export const ORDER_PIPELINE_MODES = Object.freeze(['LOCAL', 'DUAL_READ', 'SHARED']);

function parseOrderPipelineMode(raw) {
  const normalized = String(raw ?? '')
    .trim()
    .toUpperCase();
  if (!normalized) return null;
  if (ORDER_PIPELINE_MODES.includes(normalized)) return normalized;
  return null;
}

/**
 * Safe rollout mode resolver:
 * - `forceModeRaw` (kill switch) wins if valid
 * - else `modeRaw`
 * - else `defaultMode` (LOCAL)
 */
export function resolveOrderPipelineMode(options) {
  const forced = parseOrderPipelineMode(options?.forceModeRaw);
  if (forced) return forced;
  const configured = parseOrderPipelineMode(options?.modeRaw);
  if (configured) return configured;
  return options?.defaultMode ?? 'LOCAL';
}

/**
 * Deterministic dual-read comparator for contract-critical fields only.
 * Ignores metadata/debug/timestamps by design.
 */
export function compareOrderContextSubset(localCtx, sharedCtx) {
  const fields = [
    'canonicalStatus',
    'financialStatus',
    'isQueueEligible',
    'paymentMethodNorm',
    'paymentStatusNorm',
  ];
  const diffs = {};
  for (const field of fields) {
    if (localCtx?.[field] !== sharedCtx?.[field]) {
      diffs[field] = [localCtx?.[field], sharedCtx?.[field]];
    }
  }
  return { match: Object.keys(diffs).length === 0, diffs };
}

/**
 * Unified observability payload for rollout/audit logs.
 * Keep stable so dashboards and alerts can rely on this shape.
 */
export function createOrderPipelineModeAuditPayload(input) {
  const orderId = String(input?.orderId ?? '').trim() || null;
  const modeUsed = resolveOrderPipelineMode({
    modeRaw: input?.modeUsed,
    forceModeRaw: input?.forceModeRaw,
    defaultMode: 'LOCAL',
  });
  const comparison =
    input?.localCtx && input?.sharedCtx
      ? compareOrderContextSubset(input.localCtx, input.sharedCtx)
      : null;

  return {
    source: 'order_pipeline_control_plane',
    modeUsed,
    orderId,
    readModelVersion:
      input?.ctx?.readModelVersion ??
      input?.localCtx?.readModelVersion ??
      input?.sharedCtx?.readModelVersion ??
      null,
    comparisonMatch: comparison ? comparison.match : null,
    comparisonDiffs: comparison ? comparison.diffs : {},
    canonicalStatus:
      input?.ctx?.canonicalStatus ??
      input?.localCtx?.canonicalStatus ??
      input?.sharedCtx?.canonicalStatus ??
      null,
    financialStatus:
      input?.ctx?.financialStatus ??
      input?.localCtx?.financialStatus ??
      input?.sharedCtx?.financialStatus ??
      null,
    paymentMethodNorm:
      input?.ctx?.paymentMethodNorm ??
      input?.localCtx?.paymentMethodNorm ??
      input?.sharedCtx?.paymentMethodNorm ??
      null,
    paymentStatusNorm:
      input?.ctx?.paymentStatusNorm ??
      input?.localCtx?.paymentStatusNorm ??
      input?.sharedCtx?.paymentStatusNorm ??
      null,
    isQueueEligible:
      input?.ctx?.isQueueEligible ??
      input?.localCtx?.isQueueEligible ??
      input?.sharedCtx?.isQueueEligible ??
      null,
  };
}
