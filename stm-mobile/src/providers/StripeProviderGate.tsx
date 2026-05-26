/**
 * Pick Stripe shell at runtime. Do not `export … from './StripeProviderGate.web'` only — that forces
 * the web stub on native and breaks `@stripe/stripe-react-native`.
 * Metro: literal `require('./…')` paths only (see `scripts/check-metro-safe-require.mjs`).
 */
import { Platform } from 'react-native';
import type { ComponentType, ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const Gate: ComponentType<{ children: ReactNode }> =
  Platform.OS === 'web'
    ? require('./StripeProviderGate.web').default
    : require('./StripeProviderGate.native').default;

export default function StripeProviderGate({ children }: { children: ReactNode }) {
  return <Gate>{children}</Gate>;
}
