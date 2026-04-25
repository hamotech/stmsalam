/**
 * TypeScript resolution target (shared).
 *
 * Metro prefers the platform-specific variants at bundle time:
 *   - StripeProviderWrapper.web.tsx    on web    (plain passthrough)
 *   - StripeProviderWrapper.native.tsx on native (mounts StripeProvider)
 *
 * This shared file is intentionally a pure passthrough so no shared module
 * imports `@stripe/stripe-react-native`. Do NOT add native-only code here.
 */

import React, { type ReactNode } from 'react';

export function StripeProviderWrapper({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
