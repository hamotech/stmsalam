/**
 * After Stripe Hosted Checkout could not be confirmed in-app — retry checkout or poll Firestore (webhook sets PAID).
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
import { doc, getDoc } from 'firebase/firestore';
import { navReplace } from '@/src/navigation/appNavigation';
import { useAppRole } from '@/src/auth/useAppRole';
import { useAuth } from '@/src/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import HeaderBar from '@/src/components/stm/HeaderBar';
import { Brand, cardShadow } from '@/src/theme/brand';
import { db } from '@/src/services/firebase';
import { openStripeHostedCheckout } from '@/src/services/payment/stripeHostedCheckout';
import { useCart } from '@/src/context/CartContext';
import { clearGrabCheckoutDraft } from '@/src/utils/checkoutDraft';

async function orderMarkedPaid(orderId: string): Promise<boolean> {
  const snap = await getDoc(doc(db, 'orders', orderId.trim()));
  if (!snap.exists()) return false;
  const d = snap.data() as { paymentStatus?: string; status?: string };
  const ps = String(d.paymentStatus ?? '').toLowerCase();
  const st = String(d.status ?? '').toLowerCase();
  return ps === 'paid' || st === 'paid';
}

export default function PaymentFailedScreen() {
  const router = useRouter();
  const { user, profile } = useAuth();
  const navRole = useAppRole();
  const { clear } = useCart();
  const { orderId: rawO, total: rawT, reason: rawR } = useLocalSearchParams<{
    orderId?: string;
    total?: string;
    reason?: string;
  }>();
  const orderId = rawO ? String(rawO).trim() : '';
  const total = rawT ? String(rawT).trim() : '';
  const reason = rawR ? String(rawR).trim() : '';
  const [busy, setBusy] = useState(false);

  const customerName =
    (profile?.name || user?.displayName || '').trim() || 'Customer';

  const onOpenStripeAgain = async () => {
    if (!orderId) return;
    setBusy(true);
    try {
      const r = await openStripeHostedCheckout(orderId, customerName);
      if (r.kind === 'error') {
        Alert.alert('Stripe', r.message);
        return;
      }
      if (r.kind === 'success') {
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
      }
    } finally {
      setBusy(false);
    }
  };

  const onCheckPaymentStatus = async () => {
    if (!orderId) return;
    setBusy(true);
    try {
      for (let i = 0; i < 5; i++) {
        if (await orderMarkedPaid(orderId)) {
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
        await new Promise((r) => setTimeout(r, 900));
      }
      Alert.alert(
        'Not paid yet',
        'We still do not see a completed payment on this order. If you were charged, wait a minute and tap again, or contact support with your order ID.'
      );
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
            'We could not confirm this payment in the app. If you completed Stripe checkout, tap “Check payment status”. Otherwise open Stripe again.'}
        </Text>
        {orderId ? (
          <Text style={styles.ref}>
            Reference ·{' '}
            {orderId.length >= 8 ? orderId.slice(-8).toUpperCase() : orderId.toUpperCase()}
          </Text>
        ) : null}

        {orderId ? (
          <>
            <TouchableOpacity
              style={[styles.primary, busy && styles.primaryOff]}
              onPress={() => void onOpenStripeAgain()}
              disabled={busy}
              activeOpacity={0.88}
            >
              {busy ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.primaryText}>Open Stripe checkout again</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.secondary, busy && styles.primaryOff]}
              onPress={() => void onCheckPaymentStatus()}
              disabled={busy}
              activeOpacity={0.88}
            >
              <Text style={styles.secondaryText}>Check payment status</Text>
            </TouchableOpacity>
          </>
        ) : null}

        <TouchableOpacity
          style={styles.tertiary}
          onPress={() => navReplace(router, { kind: 'checkout' }, navRole)}
          activeOpacity={0.88}
        >
          <Text style={styles.tertiaryText}>Change payment method</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Brand.bg },
  scroll: { padding: Brand.space, paddingBottom: 48, alignItems: 'center' },
  iconCard: {
    marginTop: 12,
    padding: 20,
    borderRadius: 999,
    backgroundColor: Brand.card,
    borderWidth: 1,
    borderColor: Brand.border,
  },
  title: { marginTop: 20, fontSize: 22, fontWeight: '900', color: Brand.text, textAlign: 'center' },
  body: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: '600',
    color: Brand.muted,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 340,
  },
  ref: { marginTop: 14, fontSize: 13, fontWeight: '800', color: Brand.green },
  primary: {
    marginTop: 28,
    width: '100%',
    maxWidth: 340,
    backgroundColor: Brand.green,
    borderRadius: Brand.radius,
    paddingVertical: 15,
    alignItems: 'center',
  },
  primaryOff: { opacity: 0.5 },
  primaryText: { color: '#fff', fontWeight: '900', fontSize: 16 },
  secondary: {
    marginTop: 12,
    width: '100%',
    maxWidth: 340,
    backgroundColor: Brand.card,
    borderRadius: Brand.radius,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Brand.green,
  },
  secondaryText: { color: Brand.green, fontWeight: '900', fontSize: 16 },
  tertiary: { marginTop: 20, paddingVertical: 10 },
  tertiaryText: { color: Brand.muted, fontWeight: '800', fontSize: 14 },
});
