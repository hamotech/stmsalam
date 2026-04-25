/**
 * Web: never load @stripe/stripe-react-native (native-only).
 */
import React from 'react';

export function StripeProviderWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
