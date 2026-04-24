/**
 * app/_layout.tsx
 * Root layout — registers all routes and global providers.
 */

import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StripeProvider } from '@stripe/stripe-react-native';
import 'react-native-reanimated';

// Initialise Firebase on app boot (side-effect import is enough)
import '@/src/services/firebase';

export const unstable_settings = {
  anchor: '(tabs)',
};

const stripePk = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim() ?? '';

function NavigationTree() {
  return (
    <>
      <Stack>
        {/* Bottom-tabs group */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Full-screen tracking detail */}
        <Stack.Screen
          name="tracking/[orderId]"
          options={{
            headerShown: false,
            presentation: 'card',
            animation: 'slide_from_right',
          }}
        />

        <Stack.Screen name="checkout" options={{ headerShown: false, presentation: 'card' }} />
        <Stack.Screen name="payment/scan-pay" options={{ headerShown: false, presentation: 'card' }} />
        <Stack.Screen name="payment/success" options={{ headerShown: false, presentation: 'card' }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}

export default function RootLayout() {
  if (stripePk) {
    return (
      <StripeProvider publishableKey={stripePk}>
        <NavigationTree />
      </StripeProvider>
    );
  }
  return <NavigationTree />;
}
