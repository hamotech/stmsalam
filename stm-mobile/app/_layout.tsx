/**
 * app/_layout.tsx
 * Root layout — registers all routes and global providers.
 */

import React, { useEffect } from 'react';
import { Stack, usePathname, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View, type ViewStyle } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

// Initialise Firebase on app boot (side-effect import is enough)
import '@/src/services/firebase';
import { CartProvider } from '@/src/context/CartContext';
import { AuthProvider } from '@/src/context/AuthContext';
import AuthReadyGate from '@/src/components/AuthReadyGate';
import StripeProviderGate from '@/src/providers/StripeProviderGate';
import AppBottomSheetProvider from '@/src/providers/AppBottomSheetProvider';
import PasswordResetDeepLinkHandler from '@/src/components/PasswordResetDeepLinkHandler';
import OfflineOrderSyncBanner from '@/src/components/OfflineOrderSyncBanner';
import { initNotificationStatusDedupe } from '@/src/utils/notificationService';

/** Global SPA route transitions — distinguishes silent no-ops vs B) replace overridden by checkout remount */
function GlobalRouteTrace() {
  const pathname = usePathname();
  const segments = useSegments();
  useEffect(() => {
    if (typeof __DEV__ !== 'undefined' && __DEV__) {
      console.log('[ROUTE]', { pathname, segments });
    }
  }, [pathname, segments]);
  return null;
}

function NavigationTree() {
  return (
    /** No top inset here — each route applies `useSafeAreaInsets` once. Top + tab bar was stacking padding and clipping labels. */
    <SafeAreaView style={styles.safeRoot} edges={[]}>
      <View style={styles.stackHost}>
        <GlobalRouteTrace />
        <Stack screenOptions={{ contentStyle: styles.stackScreenContent }}>
        <Stack.Screen name="index" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="login" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="forgot-password" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="reset-password" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="register" options={{ headerShown: false, animation: 'fade' }} />
        {/* Bottom-tabs group */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* CRITICAL: dynamic routes MUST be Stack children — otherwise `router.replace`/`linkTo` have no matching screen (silent no-op). */}
        <Stack.Screen
          name="order-tracking/[orderId]"
          options={{
            headerShown: false,
            presentation: 'card',
            animation: 'slide_from_right',
          }}
        />

        <Stack.Screen name="checkout" options={{ headerShown: false, presentation: 'card' }} />
        <Stack.Screen name="support" options={{ headerShown: false, presentation: 'card' }} />
        <Stack.Screen name="profile" options={{ headerShown: false, presentation: 'card' }} />
        <Stack.Screen name="admin" options={{ headerShown: false }} />
        <Stack.Screen name="payment/scan-pay" options={{ headerShown: false, presentation: 'card' }} />
        <Stack.Screen
          name="payment/checkout-resume"
          options={{ headerShown: false, presentation: 'card', animation: 'slide_from_right' }}
        />
        <Stack.Screen name="payment/success" options={{ headerShown: false, presentation: 'card' }} />
        <Stack.Screen name="payment/failed" options={{ headerShown: false, presentation: 'card' }} />
        <Stack.Screen
          name="order-confirmation"
          options={{ headerShown: false, presentation: 'card', animation: 'fade' }}
        />
        <Stack.Screen name="grab-stripe-payment" options={{ headerShown: false, presentation: 'card' }} />
        <Stack.Screen name="grab-payment-qr" options={{ headerShown: false, presentation: 'card' }} />
        </Stack>
        <LayoutEffects />
        <PasswordResetDeepLinkHandler />
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

function LayoutEffects() {
  useEffect(() => {
    void initNotificationStatusDedupe();
  }, []);
  return <OfflineOrderSyncBanner />;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <AuthProvider>
          <AuthReadyGate>
            <CartProvider>
              <StripeProviderGate>
                <AppBottomSheetProvider>
                  <NavigationTree />
                </AppBottomSheetProvider>
              </StripeProviderGate>
            </CartProvider>
          </AuthReadyGate>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

/** `100dvh` is web-only; RN's ViewStyle type omits it — cast for web layout. */
const web100: ViewStyle = { minHeight: '100dvh' as never };

const styles = StyleSheet.create({
  safeRoot: {
    flex: 1,
    ...Platform.select({
      web: { ...web100, height: '100%', width: '100%' },
      default: {},
    }),
  },
  /** Web: use dvh so %-height parents don’t collapse to 0; tabs still set sceneStyle.minHeight: 0 locally. */
  stackHost: {
    flex: 1,
    ...Platform.select({
      web: { flex: 1, ...web100, width: '100%' },
      default: {},
    }),
  },
  stackScreenContent: {
    flex: 1,
    overflow: 'visible',
    ...Platform.select({
      web: { flex: 1, ...web100, width: '100%' },
      default: {},
    }),
  },
  root: {
    flex: 1,
    ...Platform.select({
      web: {
        flex: 1,
        ...web100,
        width: '100%',
        maxWidth: '100%',
      },
      default: {},
    }),
  },
});
