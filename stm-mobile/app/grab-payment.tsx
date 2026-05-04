/**
 * // UPDATED — Route: /grab-payment — validates checkout draft before payment hub.
 */

import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { Redirect } from 'expo-router';
import PaymentScreen from '@/src/screens/PaymentScreen';
import { getGrabCheckoutDraft } from '@/src/utils/checkoutDraft';
import { Brand } from '@/src/theme/brand';

export default function GrabPaymentRoute() {
  const [phase, setPhase] = useState<'loading' | 'ok' | 'missing'>('loading');

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const draft = await getGrabCheckoutDraft();
        if (!cancelled) setPhase(draft ? 'ok' : 'missing');
      } catch (e) {
        console.warn('[grab-payment] draft', e);
        if (!cancelled) setPhase('missing');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (phase === 'loading') {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Brand.green} />
        <Text style={styles.hint}>Checking checkout…</Text>
      </View>
    );
  }

  if (phase === 'missing') {
    if (typeof __DEV__ !== 'undefined' && __DEV__) {
      console.log('🚨 NAV OVERRIDE SOURCE', {
        file: 'app/grab-payment.tsx',
        reason: 'Redirect_missing_draft',
        target: '/(tabs)',
      });
    }
    return <Redirect href="/(tabs)" />;
  }

  return <PaymentScreen />;
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Brand.bg },
  hint: { marginTop: 12, color: Brand.muted, fontWeight: '600' },
});
