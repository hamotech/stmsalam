/**
 * Grab flow — Pay online via Stripe Hosted Checkout (same Cloud Run + redirect as the Vite website).
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
import HeaderBar from '@/src/components/stm/HeaderBar';
import { Brand, cardShadow } from '@/src/theme/brand';
import { useCart } from '@/src/context/CartContext';
import {
  getGrabCheckoutDraft,
  clearGrabCheckoutDraft,
  type GrabCheckoutDraft,
} from '@/src/utils/checkoutDraft';
import { clearPendingCheckoutResolutionIfMatchesOrder } from '@/src/services/grabFlowOrderService';
import {
  openStripeHostedCheckout,
  sanitizeStripeOrderId,
  getStripeCheckoutHttpUrl,
  hashStripeOrderIdForDebug,
  requireStripeCheckoutHttpUrlForRequest,
} from '@/src/services/payment/stripeHostedCheckout';

type Phase = 'idle' | 'paying';

export default function GrabStripePaymentScreen() {
  const router = useRouter();
  const navRole = useAppRole();
  const navigation = useNavigation();
  const { orderId: rawOrderId } = useLocalSearchParams<{ orderId?: string }>();
  const orderId = rawOrderId
    ? sanitizeStripeOrderId(String(rawOrderId).split(',')[0] ?? '')
    : '';

  useEffect(() => {
    if (typeof __DEV__ === 'undefined' || !__DEV__) return;
    const first = rawOrderId ? String(rawOrderId).split(',')[0] ?? '' : '';
    const sanitized = first ? sanitizeStripeOrderId(first) : '';
    console.log('MOBILE_ROUTE_ORDER_ID_RAW:', rawOrderId);
    console.log('ORDER_ID_RAW:', rawOrderId);
    console.log('ORDER_ID_SANITIZED:', sanitized);
    console.log('ORDER_ID_LENGTH:', sanitized.length);
    console.log('ORDER_ID_HASH:', sanitized ? hashStripeOrderIdForDebug(sanitized) : '');
    console.log('CHECKOUT_URL:', getStripeCheckoutHttpUrl());
    const resolved = requireStripeCheckoutHttpUrlForRequest();
    if (resolved.ok) {
      console.log('CHECKOUT_HOSTNAME:', resolved.hostname);
    } else {
      console.warn('CHECKOUT_URL_INVALID:', resolved.message);
    }
    console.log('EXPO_PUBLIC_STRIPE_CHECKOUT_URL:', process.env.EXPO_PUBLIC_STRIPE_CHECKOUT_URL ?? '(unset)');
  }, [rawOrderId]);

  const { clear, loaded } = useCart();
  const [draft, setDraft] = useState<GrabCheckoutDraft | null>(null);
  const [draftLoading, setDraftLoading] = useState(true);
  const [phase, setPhase] = useState<Phase>('idle');

  const customerNameForStripe = useMemo(() => {
    const n = draft?.customer?.name?.trim();
    return n || 'Customer';
  }, [draft]);

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
      setPhase('paying');
      const r = await openStripeHostedCheckout(orderId, customerNameForStripe);
      if (r.kind === 'opened_web') {
        return;
      }
      if (r.kind === 'error') {
        Alert.alert('Pay online', r.message);
        return;
      }
      if (r.kind === 'cancel') {
        Alert.alert('Payment cancelled', 'You can retry when ready.');
        return;
      }
      if (r.kind === 'dismiss') {
        return;
      }
      clear();
      void clearGrabCheckoutDraft();
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
      Alert.alert('Payment', e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setPhase('idle');
    }
  }, [draft, orderId, router, clear, navRole, customerNameForStripe]);

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
    return (
      <View style={styles.processingRoot}>
        <ActivityIndicator color={Brand.green} size="large" />
        <Text style={styles.processingTitle}>Opening secure Stripe checkout…</Text>
        <Text style={styles.processingSub}>
          {Platform.OS === 'web'
            ? 'You will be redirected in this browser. After paying, your order tracking opens automatically.'
            : 'Complete payment in the browser. When finished, you return to the app automatically.'}
        </Text>
      </View>
    );
  }

  const canPay = Boolean(draft && orderId);

  return (
    <View style={styles.root}>
      <HeaderBar title="Pay online" subtitle="Stripe · same checkout as the website" showBack />
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
          Your order is saved. Tap below to open Stripe’s secure payment page (cards, Apple Pay, Google Pay where
          available). Confirmation is written by our server when Stripe completes the session.
        </Text>
        <View style={styles.ctaSpacer} />
        <TouchableOpacity
          style={[styles.cta, !canPay && styles.ctaOff]}
          onPress={() => void runStripePay()}
          disabled={!canPay}
          activeOpacity={0.9}
        >
          <Text style={styles.ctaText}>Pay SGD {draft.total.toFixed(2)} with Stripe</Text>
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
