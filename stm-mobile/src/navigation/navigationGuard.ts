import type { AppNavIntent } from '@/src/navigation/appNavigation.types';
import type { AppRole } from '@/src/auth/resolveAppRole';
import { canNavigate, fallbackIntentForRole } from '@/src/navigation/appNavigationRegistry';

export type NavigationGuardResult =
  | { ok: true }
  | { ok: false; reason: string; fallback: AppNavIntent };

export function checkNavigation(role: AppRole, intent: AppNavIntent): NavigationGuardResult {
  if (canNavigate(role, intent)) return { ok: true };
  return {
    ok: false,
    reason: `Role "${role}" cannot open ${intent.kind}`,
    fallback: fallbackIntentForRole(role),
  };
}

export function warnBlockedNavigation(role: AppRole, intent: AppNavIntent, fallback: AppNavIntent): void {
  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    // eslint-disable-next-line no-console
    console.warn(
      `[STM nav] Blocked ${intent.kind} for role "${role}". Redirecting to ${fallback.kind}.`
    );
  }
}
