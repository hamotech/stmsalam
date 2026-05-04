/**
 * Grab flow — Pay online via Stripe PaymentSheet (order already created at checkout).
 * Success UI only after server verification (POST /verify-payment).
 */

import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Platform,
  BackHandler,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { navReplace } from '@/src/navigation/appNavigation';
import { useAppRole } from '@/src/auth/useAppRole';
import { useAuth } from '@/src/context/AuthContext';
import HeaderBar from '@/src/components/stm/HeaderBar';
import { Brand, cardShadow } from '@/src/theme/brand';
import { useCart } from '@/src/context/CartContext';
import {
  getGrabCheckoutDraft,
  clearGrabCheckoutDraft,
  type GrabCheckoutDraft,
} from '@/src/utils/checkoutDraft';
import { db } from '@/src/services/firebase';
import {
  initPaymentSheet,
  presentPaymentSheet,
  verifyStripePaymentOnServer,
} from '@/src/services/payment/stripeService';
import { clearPendingCheckoutResolutionIfMatchesOrder } from '@/src/services/grabFlowOrderService';

type Phase = 'idle' | 'paying' | 'verifying';

export default function GrabStripePaymentScreen() {
  const router = useRouter();
  const { user, profile } = useAuth();
  const navRole = useAppRole();
  const navigation = useNavigation();
  const { orderId: rawOrderId } = useLocalSearchParams<{ orderId?: string }>();
  const orderId = rawOrderId ? String(rawOrderId).trim().split(',')[0] : '';

  const { clear, loaded } = useCart();
  const [draft, setDraft] = useState<GrabCheckoutDraft | null>(null);
  const [draftLoading, setDraftLoading] = useState(true);
  const [phase, setPhase] = useState<Phase>('idle');

  useEffect(() => {
    let c = false;
    void (async () => {
      try {
        const d = await getGrabCheckoutDraft();
        if (!c) setDraft(d);
      } finally {
        if (!c) setDraftLoading(false);
      }
    })();
    return () => {
      c = true;
    };
  }, []);

  useEffect(() => {
    if (!orderId) return;
    void clearPendingCheckoutResolutionIfMatchesOrder(orderId);
  }, [orderId]);

  const processing = phase !== 'idle';

  useLayoutEffect(() => {
    navigation.setOptions({
      gestureEnabled: !processing,
    });
  }, [navigation, processing]);

  useEffect(() => {
    if (!processing) return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => sub.remove();
  }, [processing]);

  const runStripePay = useCallback(async () => {
    if (!draft || !orderId) return;
    if (draft.total <= 0) {
      Alert.alert('Checkout', 'Invalid order total.');
      return;
    }

    try {
      if (Platform.OS === 'web') {
        Alert.alert(
          'Pay in the app',
          'Stripe card checkout runs in the iOS or Android app. On web, choose QR payment or cash on delivery, or open STM Salam on your phone.',
          [{ text: 'OK', onPress: () => router.back() }]
        );
        return;
      }

      setPhase('paying');

      const init = await initPaymentSheet(orderId, draft.total);
      if (!init.ok || !init.paymentIntentId) {
        setPhase('idle');
        Alert.alert('Pay online', init.error || 'Could not start payment.');
        return;
      }

      const pay = await presentPaymentSheet();
      if (!pay.ok) {
        setPhase('idle');
        if (pay.error && !/cancel/i.test(pay.error)) {
          navReplace(
            router,
            {
              kind: 'paymentFailed',
              orderId,
              paymentIntentId: init.paymentIntentId,
              total: String(draft.total),
              reason: pay.error,
            },
            navRole
          );
        }
        return;
      }

      setPhase('verifying');
      const verified = await verifyStripePaymentOnServer(orderId, init.paymentIntentId);
      if (!verified.ok) {
        setPhase('idle');
        navReplace(
          router,
          {
            kind: 'paymentFailed',
            orderId,
            paymentIntentId: init.paymentIntentId,
            total: String(draft.total),
            reason: verified.error,
          },
          navRole
        );
        return;
      }

      clear();
      void clearGrabCheckoutDraft();
      setPhase('idle');
      navReplace(
        router,
        {
          kind: 'paymentSuccess',
          orderId,
          total: String(draft.total),
          source: 'stripe',
        },
        navRole
      );
    } catch (e) {
      console.error('[GrabStripePayment]', e);
      setPhase('idle');
      Alert.alert('Payment', e instanceof Error ? e.message : 'Something went wrong.');
    }
  }, [draft, orderId, router, clear, navRole]);

  if (!loaded || draftLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={Brand.green} size="large" />
      </View>
    );
  }

  if (!orderId || !draft) {
    return (
      <View style={styles.center}>
        <Text style={styles.miss}>{!orderId ? 'Missing order. Return to checkout.' : 'No checkout summary found.'}</Text>
        <TouchableOpacity onPress={() => navReplace(router, { kind: 'checkout' }, navRole)}>
          <Text style={styles.link}>Back to checkout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (processing) {
    const verifying = phase === 'verifying';
    return (
      <View style={styles.processingRoot}>
        <ActivityIndicator color={Brand.green} size="large" />
        <Text style={styles.processingTitle}>
          {verifying ? 'Verifying payment…' : 'Processing payment…'}
        </Text>
        <Text style={styles.processingSub}>
          {verifying
            ? 'Confirming with our servers. Please keep the app open.'
            : 'Please wait — do not close the app. Your payment is secured by Stripe.'}
        </Text>
      </View>
    );
  }

  const canPay = Boolean(draft && orderId);

  return (
    <View style={styles.root}>
      <HeaderBar title="Pay online" subtitle="Stripe · cards & wallets" showBack />
      <View style={styles.body}>
        <View style={[styles.card, cardShadow]}>
          <Text style={styles.label}>Order</Text>
          <Text style={styles.orderRef}>{orderId}</Text>
          <Text style={styles.label}>Amount due</Text>
          <Text style={styles.amount}>SGD {draft.total.toFixed(2)}</Text>
          <Text style={styles.meta}>
            Subtotal {draft.subtotal.toFixed(2)} · Delivery fee {draft.deliveryFee.toFixed(2)} ·{' '}
            {draft.mode === 'delivery' ? 'Ship to address' : 'Store pickup'}
          </Text>
        </View>
        <Text style={styles.hint}>
          Your order is already placed. Complete payment here — we only show success after our server confirms
          the charge.
        </Text>
        <View style={styles.ctaSpacer} />
        <TouchableOpacity
          style={[styles.cta, !canPay && styles.ctaOff]}
          onPress={() => void runStripePay()}
          disabled={!canPay}
          activeOpacity={0.9}
        >
          <Text style={styles.ctaText}>Pay SGD {draft.total.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Brand.bg },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: Brand.bg },
  miss: { fontSize: 16, fontWeight: '800', color: Brand.text },
  link: { marginTop: 16, color: Brand.green, fontWeight: '900' },
  body: { flex: 1, padding: Brand.space },
  card: {
    backgroundColor: Brand.card,
    borderRadius: Brand.radius,
    padding: Brand.space,
    borderWidth: 1,
    borderColor: Brand.border,
  },
  label: { fontSize: 12, fontWeight: '800', color: Brand.muted, textTransform: 'uppercase' },
  orderRef: { fontSize: 14, fontWeight: '900', color: Brand.text, marginBottom: 10 },
  amount: { fontSize: 32, fontWeight: '900', color: Brand.green, marginTop: 8 },
  meta: { marginTop: 10, fontSize: 13, fontWeight: '600', color: Brand.muted },
  hint: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: '600',
    color: Brand.muted,
    lineHeight: 21,
  },
  ctaSpacer: { flex: 1, minHeight: 16 },
  cta: {
    marginBottom: 24,
    backgroundColor: Brand.green,
    borderRadius: Brand.radius,
    paddingVertical: 16,
    alignItems: 'center',
  },
  ctaOff: { opacity: 0.45 },
  ctaText: { color: '#fff', fontWeight: '900', fontSize: 16 },
  processingRoot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: Brand.bg,
  },
  processingTitle: {
    marginTop: 24,
    fontSize: 20,
    fontWeight: '900',
    color: Brand.text,
    textAlign: 'center',
  },
  processingSub: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
    color: Brand.muted,
    textAlign: 'center',
    lineHeight: 21,
    maxWidth: 320,
  },
});
