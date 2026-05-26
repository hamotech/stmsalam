import type { Router } from 'expo-router';
import type { AppRole } from '@/src/auth/resolveAppRole';
import { takePendingPostAuthIntent } from '@/src/navigation/pendingPostAuthIntent';
import { checkNavigation, navReplaceUnsafe } from '@/src/navigation/appNavigation';

/**
 * If a post–sign-in intent was queued (RBAC → login), navigate there when the new role may access it.
 * @returns `true` when a pending intent was consumed (navigation performed).
 */
export function applyPendingPostAuthNavigation(router: Router, role: AppRole): boolean {
  const pending = takePendingPostAuthIntent();
  if (!pending) return false;

  const result = checkNavigation(role, pending);
  if (result.ok) {
    navReplaceUnsafe(router, pending);
  } else {
    navReplaceUnsafe(router, result.fallback);
  }
  return true;
}
