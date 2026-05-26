const LIFECYCLE_FIELDS = new Set(['status', 'paymentStatus', 'paymentMethod']);

function hasLifecycleKey(payload) {
  if (!payload || typeof payload !== 'object') return false;
  return Object.keys(payload).some((key) => {
    const root = String(key || '').split('.')[0];
    return LIFECYCLE_FIELDS.has(root);
  });
}

export function assertNoDirectOrderLifecycleWrite(payload, context = '') {
  if (hasLifecycleKey(payload)) {
    const suffix = context ? ` (${context})` : '';
    throw new Error(`Direct order lifecycle writes are disabled. Use transitionOrderStatus only.${suffix}`);
  }
}

