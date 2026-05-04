/**
 * Type-safe navigation with RBAC. Prefer `navPush` / `navReplace` (guarded).
 * Use `*Unsafe` only for bootstrap redirects and guard fallbacks to avoid recursion.
 */

import type { Router } from 'expo-router';
import type { AppNavIntent } from '@/src/navigation/appNavigation.types';
import type { AppRole } from '@/src/auth/resolveAppRole';
import { hrefFromIntent } from '@/src/navigation/appNavigationRegistry';
import { checkNavigation, warnBlockedNavigation } from '@/src/navigation/navigationGuard';

export type { AppNavIntent, AppNavIntentKind } from '@/src/navigation/appNavigation.types';
export {
  hrefFromIntent,
  pathFromIntent,
  INTENT_ALLOWED_ROLES,
  INTENT_METADATA,
  canNavigate,
  fallbackIntentForRole,
} from '@/src/navigation/appNavigationRegistry';
export type { NavIntentMeta, NavPermission } from '@/src/navigation/appNavigationRegistry';
export { checkNavigation, warnBlockedNavigation } from '@/src/navigation/navigationGuard';
export type { NavigationGuardResult } from '@/src/navigation/navigationGuard';
export type { AppRole } from '@/src/auth/resolveAppRole';
export { resolveAppRole } from '@/src/auth/resolveAppRole';

export function navPushUnsafe(router: Router, intent: AppNavIntent): void {
  router.push(hrefFromIntent(intent));
}

export function navReplaceUnsafe(router: Router, intent: AppNavIntent): void {
  router.replace(hrefFromIntent(intent));
}

export function navPush(router: Router, intent: AppNavIntent, role: AppRole): void {
  const g = checkNavigation(role, intent);
  if (!g.ok) {
    if (typeof __DEV__ !== 'undefined' && __DEV__) {
      // eslint-disable-next-line no-console
      console.log('🚨 NAV OVERRIDE SOURCE', {
        file: 'src/navigation/appNavigation.ts',
        reason: 'blocked_push_replace_fallback',
        blocked: intent.kind,
        fallback: g.fallback.kind,
      });
    }
    warnBlockedNavigation(role, intent, g.fallback);
    router.replace(hrefFromIntent(g.fallback));
    return;
  }
  router.push(hrefFromIntent(intent));
}

export function navReplace(router: Router, intent: AppNavIntent, role: AppRole): void {
  const g = checkNavigation(role, intent);
  if (!g.ok) {
    if (typeof __DEV__ !== 'undefined' && __DEV__) {
      // eslint-disable-next-line no-console
      console.log('🚨 NAV OVERRIDE SOURCE', {
        file: 'src/navigation/appNavigation.ts',
        reason: 'blocked_replace_fallback',
        blocked: intent.kind,
        fallback: g.fallback.kind,
      });
    }
    warnBlockedNavigation(role, intent, g.fallback);
    router.replace(hrefFromIntent(g.fallback));
    return;
  }
  router.replace(hrefFromIntent(intent));
}
