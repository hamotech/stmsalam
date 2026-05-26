/**
 * Holds the last RBAC-blocked destination when we send the user to sign-in.
 * Consumed after successful email auth so we can `router.replace` back when allowed.
 *
 * Module scope avoids prop-drilling; only written from AuthNavigationSync (login fallback)
 * and read from login/register success paths.
 */

import type { AppNavIntent } from '@/src/navigation/appNavigation.types';

export const pendingIntentRef: { current: AppNavIntent | null } = { current: null };

export function setPendingPostAuthIntent(intent: AppNavIntent | null): void {
  pendingIntentRef.current = intent;
}

export function peekPendingPostAuthIntent(): AppNavIntent | null {
  return pendingIntentRef.current;
}

/** Returns the pending intent and clears it (single consumer). */
export function takePendingPostAuthIntent(): AppNavIntent | null {
  const v = pendingIntentRef.current;
  pendingIntentRef.current = null;
  return v;
}
