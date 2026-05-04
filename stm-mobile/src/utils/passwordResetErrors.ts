/**
 * Password reset UX: never confirm whether an email exists in Firebase.
 *
 * Production hardening: throttle `sendPasswordResetEmail` per email server-side
 * (e.g. max 3 requests / 10 minutes) via Cloud Function or API proxy — client-only caps are bypassable.
 */

import { isPasswordResetBenignAuthError } from '@/src/utils/firebaseAuthErrors';

const GENERIC = 'Something went wrong. Please try again.';
const CONFIRM_GENERIC = 'Could not update password. Try a new reset link.';

function isFirebaseAuthShape(e: unknown): e is { code: string } {
  return (
    typeof e === 'object' &&
    e !== null &&
    'code' in e &&
    typeof (e as { code: unknown }).code === 'string' &&
    (e as { code: string }).code.startsWith('auth/')
  );
}

export function authErrorCode(e: unknown): string | undefined {
  if (isFirebaseAuthShape(e)) return e.code;
  return undefined;
}

/** Maps Firebase errors for sendPasswordResetEmail; benign / unknown-account → null (caller shows generic success). */
export function mapPasswordResetRequestError(e: unknown): string | null {
  if (isPasswordResetBenignAuthError(e)) return null;
  if (!isFirebaseAuthShape(e)) return GENERIC;
  switch (e.code) {
    case 'auth/invalid-email':
      return 'Enter a valid email';
    case 'auth/network-request-failed':
      return 'Check your internet';
    case 'auth/too-many-requests':
      return 'Too many attempts. Try later';
    default:
      return GENERIC;
  }
}

/** Maps errors for verifyPasswordResetCode / confirmPasswordReset (oobCode flow). */
export function mapConfirmPasswordResetError(e: unknown): string {
  if (!isFirebaseAuthShape(e)) return CONFIRM_GENERIC;
  switch (e.code) {
    case 'auth/weak-password':
      return 'Use a stronger password.';
    case 'auth/expired-action-code':
    case 'auth/invalid-action-code':
      return 'This reset link is invalid or expired. Request a new one.';
    case 'auth/network-request-failed':
      return 'Check your internet';
    case 'auth/too-many-requests':
      return 'Too many attempts. Try later';
    default:
      return CONFIRM_GENERIC;
  }
}
