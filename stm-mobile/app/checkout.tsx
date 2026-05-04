/**
 * Deterministic `/checkout`: always full-cart flow only — no params, no resume UI.
 * @see `/payment/checkout-resume` / `CheckoutScreen` for order+amount resume.
 */

import React, { useEffect } from 'react';
import { usePathname } from 'expo-router';
import FullCheckoutScreen from '@/src/screens/checkout/FullCheckoutScreen';

export default function CheckoutRoute() {
  const pathname = usePathname();

  useEffect(() => {
    console.log('⚠️ CHECKOUT ACTIVE', pathname);
  }, [pathname]);

  return <FullCheckoutScreen />;
}
