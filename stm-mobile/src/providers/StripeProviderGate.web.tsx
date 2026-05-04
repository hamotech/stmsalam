import React from 'react';

/** Web: Stripe RN is native-only — no provider. */
export default function StripeProviderGate({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
