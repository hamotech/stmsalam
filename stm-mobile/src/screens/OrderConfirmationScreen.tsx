/**
 * Grab-style step after successful payment / place order — before live tracking.
 * Route: /order-confirmation
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { navReplace } from '@/src/navigation/appNavigation';
import { useAppRole } from '@/src/auth/useAppRole';
import { useAuth } from '@/src/context/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeaderBar from '@/src/components/stm/HeaderBar';
import { Brand, cardShadow } from '@/src/theme/brand';

import { clearCheckoutIdempotencyPersistence } from '@/src/services/grabFlowOrderService';

function formatEta(iso: string | undefined): string {
  if (!iso?.trim()) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleString(undefined, {
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function OrderConfirmationScreen() {
  const router = useRouter();
  const { user, profile } = useAuth();
  const navRole = useAppRole();
  const insets = useSafeAreaInsets();
  const { orderId: rawId, etaIso } = useLocalSearchParams<{
    orderId?: string;
    etaIso?: string;
  }>();
  const orderId = decodeURIComponent(String(rawId ?? '')).trim();

  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    void clearCheckoutIdempotencyPersistence();
  }, []);

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 6,
          tension: 120,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(scale, {
        toValue: 1.04,
        duration: 160,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, scale]);

  const short = orderId.length >= 8 ? orderId.slice(-8).toUpperCase() : orderId.toUpperCase();

  const onTrack = () => {
    if (!orderId) return;
    navReplace(router, { kind: 'grabTracking', orderId }, navRole);
  };

  return (
    <View style={styles.root}>
      <HeaderBar title="Order confirmed" subtitle="Thank you" showBack />
      <View style={styles.body}>
        <Animated.View
          style={[
            styles.tickWrap,
            cardShadow,
            {
              opacity,
              transform: [{ scale }],
            },
          ]}
        >
          <Text style={styles.tick}>✓</Text>
        </Animated.View>
        <Text style={styles.title}>You're all set</Text>
        <Text style={styles.orderLabel}>Order ID</Text>
        <Text style={styles.orderId}>{orderId ? `#${short}` : '—'}</Text>
        <View style={[styles.etaCard, cardShadow]}>
          <Text style={styles.etaLabel}>Estimated delivery</Text>
          <Text style={styles.etaValue}>{formatEta(etaIso)}</Text>
          <Text style={styles.etaHint}>We'll keep this updated live on the next screen.</Text>
        </View>
        <View style={styles.ctaSpacer} />
        <TouchableOpacity
          style={[styles.cta, !orderId && styles.ctaOff]}
          onPress={onTrack}
          disabled={!orderId}
        >
          <Text style={styles.ctaText}>Track Order</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.trust, { paddingBottom: 12 + insets.bottom }]}>
        🔒 Your payment is processed securely. Need help? Use Support from the menu.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Brand.bg },
  body: { flex: 1, paddingHorizontal: Brand.space, alignItems: 'center', paddingTop: 8 },
  tickWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Brand.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 20,
  },
  tick: { fontSize: 44, color: '#fff', fontWeight: '900', marginTop: -4 },
  title: { fontSize: 24, fontWeight: '900', color: Brand.text, marginBottom: 20 },
  orderLabel: { fontSize: 12, fontWeight: '800', color: Brand.muted, textTransform: 'uppercase' },
  orderId: { fontSize: 20, fontWeight: '900', color: Brand.green, marginTop: 6 },
  etaCard: {
    marginTop: 28,
    width: '100%',
    backgroundColor: Brand.card,
    borderRadius: Brand.radius,
    padding: Brand.space,
    borderWidth: 1,
    borderColor: Brand.border,
  },
  etaLabel: { fontSize: 12, fontWeight: '800', color: Brand.muted, textTransform: 'uppercase' },
  etaValue: { fontSize: 22, fontWeight: '900', color: Brand.text, marginTop: 8 },
  etaHint: { marginTop: 10, fontSize: 13, fontWeight: '600', color: Brand.muted, lineHeight: 18 },
  ctaSpacer: { flex: 1, minHeight: 16 },
  cta: {
    marginBottom: 16,
    width: '100%',
    backgroundColor: Brand.green,
    paddingVertical: 16,
    borderRadius: Brand.radius,
    alignItems: 'center',
  },
  ctaOff: { opacity: 0.4 },
  ctaText: { color: '#fff', fontWeight: '900', fontSize: 16 },
  trust: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: Brand.muted,
    paddingHorizontal: 24,
    lineHeight: 18,
  },
});
