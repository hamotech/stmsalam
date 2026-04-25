/**
 * iOS/Android: Stripe PaymentSheet provider when publishable key is set.
 */
import React from 'react';

const stripePk = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim() ?? '';

export function StripeProviderWrapper({ children }: { children: React.ReactNode }) {
  if (!stripePk) {
    return <>{children}</>;
  }
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { StripeProvider } = require('@stripe/stripe-react-native');
  return <StripeProvider publishableKey={stripePk}>{children}</StripeProvider>;
}
