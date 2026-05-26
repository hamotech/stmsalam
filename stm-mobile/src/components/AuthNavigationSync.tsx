import React, { useEffect, useRef } from 'react';
import { useRouter, useSegments } from 'expo-router';
import type { AppRole } from '@/src/auth/resolveAppRole';
import { useAuth } from '@/src/context/AuthContext';
import { useAppRole } from '@/src/auth/useAppRole';
import { deriveNavIntentFromSegments } from '@/src/navigation/deriveNavIntentFromSegments';
import { intentKey } from '@/src/navigation/intentKey';
import { checkNavigation, navReplaceUnsafe, warnBlockedNavigation } from '@/src/navigation/appNavigation';
import { setPendingPostAuthIntent } from '@/src/navigation/pendingPostAuthIntent';

/**
 * RBAC sync: when auth + profile are ready, replace the current route if the role
 * may not access it. Lives inside the navigation tree so hooks resolve correctly.
 *
 * Uses `lastNavRef` to avoid duplicate `router.replace` calls when segments / role
 * updates fire the effect multiple times before navigation settles (web + Strict Mode).
 *
 * `navCycleRef` increments whenever `segmentKey` or `role` changes after a prior context
 * was recorded, so the same blocked URL + fallback can redirect again (e.g. browser back,
 * re-auth) without being incorrectly deduped against an older navigation.
 */
export default function AuthNavigationSync() {
  const segments = useSegments();
  const router = useRouter();
  const { authReady, authBootstrapError, loading } = useAuth();
  const role = useAppRole();
  const segmentKey = segments.join('/');
  const lastNavRef = useRef<string | null>(null);
  const navCycleRef = useRef(0);
  const navContextRef = useRef<{ segmentKey: string; role: AppRole } | null>(null);

  useEffect(() => {
    if (!authReady || authBootstrapError || loading) {
      lastNavRef.current = null;
      return;
    }

    const prevCtx = navContextRef.current;
    if (!prevCtx || prevCtx.segmentKey !== segmentKey || prevCtx.role !== role) {
      if (prevCtx) {
        navCycleRef.current += 1;
      }
      navContextRef.current = { segmentKey, role };
    }

    const intent = deriveNavIntentFromSegments(segments);
    if (!intent) {
      lastNavRef.current = null;
      return;
    }

    const result = checkNavigation(role, intent);
    if (result.ok) {
      lastNavRef.current = null;
      return;
    }

    const pendingKey = `${navCycleRef.current}:${segmentKey}→${intentKey(result.fallback)}`;
    if (lastNavRef.current === pendingKey) {
      return;
    }

    lastNavRef.current = pendingKey;
    if (result.fallback.kind === 'login') {
      setPendingPostAuthIntent(intent);
    }
    warnBlockedNavigation(role, intent, result.fallback);
    navReplaceUnsafe(router, result.fallback);
    // `segmentKey` captures route shape; `segments` is a new array each render — do not list it as a dep.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authReady, authBootstrapError, loading, role, router, segmentKey]);

  return null;
}
