/**
 * Listens for incoming URLs with Firebase password-reset action (mode=resetPassword + oobCode).
 */

import React, { useEffect, useRef } from 'react';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import { parseFirebaseAuthDeepLink } from '@/src/auth/parseFirebaseAuthDeepLink';
import { logPasswordResetDeepLinkOpened } from '@/src/telemetry/passwordResetTelemetry';

export default function PasswordResetDeepLinkHandler() {
  const router = useRouter();
  const lastHandledRef = useRef<string | null>(null);

  useEffect(() => {
    const navigateIfReset = (rawUrl: string) => {
      const parsed = parseFirebaseAuthDeepLink(rawUrl);
      if (!parsed) return;
      if (lastHandledRef.current === parsed.oobCode) return;
      lastHandledRef.current = parsed.oobCode;
      logPasswordResetDeepLinkOpened();
      router.push({
        pathname: '/reset-password',
        params: { oobCode: parsed.oobCode },
      });
    };

    const sub = Linking.addEventListener('url', ({ url }) => {
      navigateIfReset(url);
    });

    void Linking.getInitialURL().then((url) => {
      if (url) navigateIfReset(url);
    });

    return () => {
      sub.remove();
    };
  }, [router]);

  return null;
}
