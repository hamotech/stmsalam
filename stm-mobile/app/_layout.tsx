/**
 * app/_layout.tsx
 * Root layout — registers all routes and global providers.
 */

import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

// Initialise Firebase on app boot (side-effect import is enough)
import '@/src/services/firebase';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <>
      <Stack>
        {/* Bottom-tabs group */}
        <Stack.Screen name="(tabs)"    options={{ headerShown: false }} />

        {/* Full-screen tracking detail */}
        <Stack.Screen
          name="tracking/[orderId]"
          options={{
            headerShown:    false,
            presentation:   'card',
            animation:      'slide_from_right',
          }}
        />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
