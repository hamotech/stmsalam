/**
 * Admin authorization: Firebase Auth custom claim `admin: true` (preferred) + Firestore `users/{uid}` role.
 *
 * Custom claims are set only via Admin SDK (scripts / Cloud Functions). Client never writes claims.
 *
 * See: scripts/set-admin-custom-claim.cjs, scripts/sync-admin-claims-from-firestore.cjs, docs/ADMIN_RBAC.md
 */

import type { UserProfile } from '@/src/context/AuthContext';
import { isAdminAuthStrictRoleOnly } from '@/src/bootstrap/appMode';

const warnedLegacyIsAdmin = new Set<string>();

/** Server-issued custom claim (JWT). Instant check — no Firestore read required when true. */
export function hasAdminCustomClaim(claims: Record<string, unknown> | null | undefined): boolean {
  return claims?.admin === true;
}

function normalizedRole(profileOrData: { role?: unknown } | null | undefined): string {
  return String(profileOrData?.role ?? '')
    .toLowerCase()
    .trim();
}

function isRoleAdmin(profileOrData: { role?: unknown } | null | undefined): boolean {
  return normalizedRole(profileOrData) === 'admin';
}

function truthyLegacyIsAdmin(raw: unknown): boolean {
  return raw === true;
}

function warnLegacyIsAdmin(uid: string | null | undefined, context: string): void {
  if (!uid || warnedLegacyIsAdmin.has(uid)) return;
  warnedLegacyIsAdmin.add(uid);
  console.warn(
    `[adminAuth] DEPRECATED: isAdmin=true but role is not "admin" (${context}). ` +
      'Set Firestore users/' +
      uid +
      ' to { role: "admin" }, then deploy strict mode (EXPO_PUBLIC_ADMIN_AUTH_STRICT_ROLE_ONLY=true).'
  );
}

function transitionalAdminAccess(
  profileOrData: { role?: unknown; isAdmin?: unknown } | null | undefined,
  uid: string | null | undefined,
  context: string
): boolean {
  if (!profileOrData) return false;
  const roleOk = isRoleAdmin(profileOrData);
  const legacy = truthyLegacyIsAdmin(profileOrData.isAdmin);
  if (legacy && !roleOk) {
    warnLegacyIsAdmin(uid ?? null, context);
  }
  return roleOk || legacy;
}

/**
 * Profile from AuthContext. Hybrid: custom claim `admin` OR Firestore role / legacy isAdmin (see appMode).
 */
export function isFirestoreAdminUser(
  profile: UserProfile | null | undefined,
  uid?: string | null,
  idTokenClaims?: Record<string, unknown> | null
): boolean {
  if (hasAdminCustomClaim(idTokenClaims)) return true;
  if (!profile) return false;
  if (isAdminAuthStrictRoleOnly()) {
    return isRoleAdmin(profile);
  }
  return transitionalAdminAccess(profile, uid ?? null, 'profile');
}

/** Raw Firestore document from users/{uid}. Does not inspect JWT; use isAdminAccessAllowed for login. */
export function isFirestoreAdminDoc(
  data: Record<string, unknown> | null | undefined,
  uid?: string | null
): boolean {
  if (!data) return false;
  if (isAdminAuthStrictRoleOnly()) {
    return isRoleAdmin(data);
  }
  return transitionalAdminAccess(data, uid ?? null, 'users doc');
}

/** Login / gate: allow if JWT admin claim OR Firestore admin fields (migration-safe). */
export function isAdminAccessAllowed(
  idTokenClaims: Record<string, unknown> | null | undefined,
  firestoreUser: Record<string, unknown> | null | undefined,
  uid?: string | null
): boolean {
  if (hasAdminCustomClaim(idTokenClaims)) return true;
  return isFirestoreAdminDoc(firestoreUser, uid);
}
