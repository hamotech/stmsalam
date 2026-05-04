/**
 * Stripe sheet or server verification failed — retry verification or change payment method.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { navReplace } from '@/src/navigation/appNavigation';
import { useAppRole } from '@/src/auth/useAppRole';
import { useAuth } from '@/src/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import HeaderBar from '@/src/components/stm/HeaderBar';
import { Brand, cardShadow } from '@/src/theme/brand';
import { verifyStripePaymentOnServer } from '@/src/services/payment/stripeService';
import { useCart } from '@/src/context/CartContext';
import { clearGrabCheckoutDraft } from '@/src/utils/checkoutDraft';

export default function PaymentFailedScreen() {
  const router = useRouter();
  const { user, profile } = useAuth();
  const navRole = useAppRole();
  const { clear } = useCart();
  const { orderId: rawO, paymentIntentId: rawPi, total: rawT, reason: rawR } =
    useLocalSearchParams<{
      orderId?: string;
      paymentIntentId?: string;
      total?: string;
      reason?: string;
    }>();
  const orderId = rawO ? String(rawO).trim() : '';
  const paymentIntentId = rawPi ? String(rawPi).trim() : '';
  const total = rawT ? String(rawT).trim() : '';
  const reason = rawR ? String(rawR).trim() : '';
  const [busy, setBusy] = useState(false);

  const canRetryVerify = Boolean(orderId && paymentIntentId);

  const onRetryVerify = async () => {
    if (!canRetryVerify) return;
    setBusy(true);
    try {
      const v = await verifyStripePaymentOnServer(orderId, paymentIntentId);
      if (v.ok) {
        clear();
        void clearGrabCheckoutDraft();
        navReplace(
          router,
          {
            kind: 'paymentSuccess',
            orderId,
            total: total || '0',
            source: 'stripe',
          },
          navRole
        );
        return;
      }
      Alert.alert('Verification', v.error);
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.root}>
      <HeaderBar title="Payment" subtitle="Could not complete" showBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.iconCard, cardShadow]}>
          <Ionicons name="close-circle" size={64} color="#b91c1c" />
        </View>
        <Text style={styles.title}>Payment failed</Text>
        <Text style={styles.body}>
          {reason ||
            'We could not confirm this payment. If you were charged, use Retry verification — or contact support with your order reference.'}
        </Text>
        {orderId ? (
          <Text style={styles.ref}>
            Reference ·{' '}
            {orderId.length >= 8 ? orderId.slice(-8).toUpperCase() : orderId.toUpperCase()}
          </Text>
        ) : null}

        {canRetryVerify ? (
          <TouchableOpacity
            style={[styles.primary, busy && styles.primaryOff]}
            onPress={() => void onRetryVerify()}
            disabled={busy}
            activeOpacity={0.88}
          >
            {busy ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.primaryText}>Retry verification</Text>
            )}
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          style={styles.secondary}
          onPress={() => navReplace(router, { kind: 'checkout' }, navRole)}
          activeOpacity={0.88}
        >
          <Text style={styles.secondaryText}>Change payment method</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Brand.bg },
  scroll: { padding: Brand.space, paddingBottom: 48, alignItems: 'center' },
  iconCard: {
    marginTop: 16,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Brand.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Brand.border,
  },
  title: {
    marginTop: 24,
    fontSize: 24,
    fontWeight: '900',
    color: Brand.text,
    textAlign: 'center',
  },
  body: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: '600',
    color: Brand.muted,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 340,
  },
  ref: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: '800',
    color: Brand.text,
  },
  primary: {
    marginTop: 28,
    backgroundColor: Brand.green,
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: Brand.radius,
    minWidth: 260,
    alignItems: 'center',
  },
  primaryOff: { opacity: 0.55 },
  primaryText: { color: '#fff', fontWeight: '900', fontSize: 16 },
  secondary: {
    marginTop: 14,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: Brand.radius,
    borderWidth: 2,
    borderColor: Brand.gold,
    minWidth: 260,
    alignItems: 'center',
  },
  secondaryText: { fontWeight: '900', color: Brand.green, fontSize: 15 },
});
