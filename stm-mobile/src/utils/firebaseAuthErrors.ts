/**
 * Password reset must not leak whether an email is registered.
 * Firebase may throw `auth/user-not-found` — treat like success for UX.
 */
export function isPasswordResetBenignAuthError(e: unknown): boolean {
  if (
    typeof e === 'object' &&
    e !== null &&
    'code' in e &&
    typeof (e as { code: unknown }).code === 'string'
  ) {
    return (e as { code: string }).code === 'auth/user-not-found';
  }
  return false;
}

function isFirebaseAuthShape(e: unknown): e is { code: string; message?: string } {
  return (
    typeof e === 'object' &&
    e !== null &&
    'code' in e &&
    typeof (e as { code: unknown }).code === 'string' &&
    (e as { code: string }).code.startsWith('auth/')
  );
}

/** User-facing copy without Firebase `auth/` codes in the string. */
export function friendlyFirebaseAuthMessage(e: unknown, fallback: string): string {
  if (isFirebaseAuthShape(e)) {
    switch (e.code) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Try signing in.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/weak-password':
        return 'Use a stronger password (at least 6 characters).';
      case 'auth/network-request-failed':
        return 'Network problem. Check your connection and try again.';
      case 'auth/user-disabled':
        return 'This sign-in is disabled. Contact support if you need help.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Email or password is incorrect.';
      case 'auth/too-many-requests':
        return 'Too many attempts. Wait a moment and try again.';
      default:
        return fallback;
    }
  }
  if (e instanceof Error) {
    const m = e.message;
    if (/firebase|auth\//i.test(m)) return fallback;
    return m;
  }
  return fallback;
}

const ADMIN_AUTH_GENERIC = 'Invalid email or password.';

/**
 * Admin sign-in only: same message for bad credentials (no account enumeration).
 * Keeps distinct copy for rate limits, network, and disabled accounts.
 */
export function adminSignInErrorMessage(e: unknown): string {
  if (isFirebaseAuthShape(e)) {
    switch (e.code) {
      case 'auth/too-many-requests':
        return 'Too many attempts. Wait a moment and try again.';
      case 'auth/network-request-failed':
        return 'Network problem. Check your connection and try again.';
      case 'auth/user-disabled':
        return 'This sign-in is disabled. Contact support if you need help.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
      case 'auth/invalid-email':
      default:
        return ADMIN_AUTH_GENERIC;
    }
  }
  if (e instanceof Error) {
    const m = e.message;
    if (/firebase|auth\//i.test(m)) return ADMIN_AUTH_GENERIC;
    return ADMIN_AUTH_GENERIC;
  }
  return ADMIN_AUTH_GENERIC;
}
