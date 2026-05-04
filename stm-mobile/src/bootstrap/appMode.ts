/**
 * Single source of truth for v1 (Expo Router) vs v2 (`src_v2`) entry selection.
 *
 * Set in `.env`: `EXPO_PUBLIC_USE_NEW_APP=true`
 * Default when unset: production v1 (Expo Router).
 */

export function isUseNewApp(): boolean {
  if (typeof process === 'undefined') return false;
  return String(process.env.EXPO_PUBLIC_USE_NEW_APP ?? '').toLowerCase() === 'true';
}

/**
 * Admin RBAC (Firestore `users/{uid}.role`):
 * - `false` (default): transitional — `role === "admin"` OR legacy `isAdmin === true`, with a one-time console warning per uid if only `isAdmin` is set.
 * - `true`: strict Phase 3 — only `role === "admin"` grants admin. Set after data migration + rules deploy:
 *   `EXPO_PUBLIC_ADMIN_AUTH_STRICT_ROLE_ONLY=true`
 */
export function isAdminAuthStrictRoleOnly(): boolean {
  if (typeof process === 'undefined') return false;
  return String(process.env.EXPO_PUBLIC_ADMIN_AUTH_STRICT_ROLE_ONLY ?? '').toLowerCase() === 'true';
}

/**
 * Dev-only: open `/admin` dashboard without Firebase sign-in (UI preview; Firestore still enforces rules).
 * Requires `__DEV__` — ignored in production builds even if the env var is set.
 */
export function isAdminAuthBypassEnabled(): boolean {
  if (!__DEV__) return false;
  if (typeof process === 'undefined') return false;
  return String(process.env.EXPO_PUBLIC_ADMIN_AUTH_BYPASS ?? '').toLowerCase() === 'true';
}
