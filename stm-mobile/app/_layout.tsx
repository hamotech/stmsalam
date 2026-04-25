/**
 * Root — providers, auth gate, stack (tabs + menu + checkout + tracking).
 */

import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments, type Href } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

import '@/src/services/firebase';
import { StripeProviderWrapper } from '@/src/providers/StripeProviderWrapper';
import { AuthProvider, useAuth } from '@/src/context/AuthContext';
import { CartProvider } from '@/src/context/CartContext';

SplashScreen.preventAutoHideAsync().catch(() => {});

export const unstable_settings = {
  initialRouteName: '(auth)',
};

function AuthGate({ children }: { children: React.ReactNode }) {
  const { authReady, user, isGuest } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!authReady) return;
    SplashScreen.hideAsync().catch(() => {});
  }, [authReady]);

  useEffect(() => {
    if (!authReady) return;
    const inAuth = segments[0] === '(auth)';
    const ok = Boolean(user || isGuest);
    if (!ok && !inAuth) {
      router.replace('/(auth)' as Href);
    } else if (ok && inAuth) {
      router.replace('/(tabs)/home' as Href);
    }
  }, [authReady, user, isGuest, segments, router]);

  if (!authReady) return null;

  return <>{children}</>;
}

function NavigationTree() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="menu/[category]"
          options={{ headerShown: false, animation: 'slide_from_right' }}
        />
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
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CartProvider>
          <StripeProviderWrapper>
            <AuthGate>
              <NavigationTree />
            </AuthGate>
          </StripeProviderWrapper>
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
