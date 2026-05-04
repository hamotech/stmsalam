import type { User } from 'firebase/auth';
import type { UserProfile } from '@/src/context/AuthContext';
import { isFirestoreAdminUser } from '@/src/admin/adminAuth';

/** STM routing & ops roles. Rider is handled in dedicated flows, not navigation RBAC. */
export type AppRole = 'guest' | 'customer' | 'admin' | 'kitchen';

/**
 * Derive the active app role from Firebase auth + Firestore `users/{uid}` + optional ID token claims.
 * Admin if `claims.admin === true` (custom claim) OR Firestore admin (see adminAuth).
 */
export function resolveAppRole(
  user: User | null,
  profile: UserProfile | null,
  idTokenClaims?: Record<string, unknown> | null
): AppRole {
  if (!user) return 'guest';
  if (isFirestoreAdminUser(profile, user.uid, idTokenClaims)) return 'admin';
  const r = String(profile?.role ?? '').toLowerCase().trim();
  if (r === 'kitchen' || r === 'kitchen_staff') return 'kitchen';
  return 'customer';
}
