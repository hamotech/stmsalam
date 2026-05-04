/**
 * Every order write must use request.auth.uid === userId in Firestore rules.
 * Email users: use existing session. Guests: Firebase Anonymous Auth (real UID, not the string "anonymous").
 *
 * Waits for auth to settle and refreshes the ID token so Firestore requests include `request.auth`.
 */

import { signInAnonymously } from 'firebase/auth';
import { auth } from './firebase';

/** Must never appear as Firestore `userId` on orders (placeholders / stale client bugs). */
const DISALLOWED_ORDER_OWNER_UIDS = new Set(['anonymous', 'offline-pending']);

function assertUidAllowedForOrders(uid: string): void {
  const normalized = uid.trim().toLowerCase();
  if (!uid.trim() || DISALLOWED_ORDER_OWNER_UIDS.has(normalized)) {
    throw new Error('Invalid session user id');
  }
}

function authErrorCode(e: unknown): string {
  if (!e || typeof e !== 'object') return '';
  const c = (e as { code?: string }).code;
  return typeof c === 'string' ? c : '';
}

export async function ensureSignedInUid(): Promise<string> {
  await auth.authStateReady();
  const cur = auth.currentUser;
  if (cur?.uid) {
    await cur.getIdToken(true);
    assertUidAllowedForOrders(cur.uid);
    return cur.uid;
  }
  try {
    const { user } = await signInAnonymously(auth);
    await user.getIdToken(true);
    await auth.authStateReady();
    assertUidAllowedForOrders(user.uid);
    return user.uid;
  } catch (e: unknown) {
    console.error('[AUTH_ENSURE_UID]', e);
    const code = authErrorCode(e);
    if (
      code === 'auth/admin-restricted-operation' ||
      code === 'auth/operation-not-allowed'
    ) {
      throw new Error(
        'Sign in with email to place an order. In Firebase Console → Authentication → Sign-in method, enable Anonymous if you want guest checkout without email.'
      );
    }
    throw e instanceof Error ? e : new Error('Could not start a checkout session.');
  }
}
