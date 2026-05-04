/**
 * Legacy route: payment method is now selected on the checkout screen.
 * Keeps deep links working by forwarding to unified checkout.
 */

import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { navReplace } from '@/src/navigation/appNavigation';
import { useAppRole } from '@/src/auth/useAppRole';
import { Brand } from '@/src/theme/brand';

export default function PaymentMethodScreen() {
  const router = useRouter();
  const navRole = useAppRole();

  useEffect(() => {
    if (typeof __DEV__ !== 'undefined' && __DEV__) {
      console.log('🚨 NAV OVERRIDE SOURCE', {
        file: 'src/screens/PaymentMethodScreen.tsx',
        reason: 'navReplace_checkout',
      });
    }
    navReplace(router, { kind: 'checkout' }, navRole);
  }, [router, navRole]);

  return (
    <View style={styles.center}>
      <ActivityIndicator color={Brand.green} size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Brand.bg },
});
