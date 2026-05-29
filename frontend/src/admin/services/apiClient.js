// Deprecated legacy API client – use adminApi.js instead.
// This file is intentionally disabled to prevent raw HTTP calls to Firebase Functions.
// Any attempt to import or use this module will throw a clear error.

export const apiClient = new Proxy({}, {
  get() {
    throw new Error('Deprecated: use adminApi.js Firebase callable wrapper instead.');
  },
});
