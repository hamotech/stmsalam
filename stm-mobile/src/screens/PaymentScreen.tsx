/**
 * // UPDATED — Grab payment hub: hardened PayPal flow, checkoutDraft, success handoff.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { navPush, navReplace, hrefFromIntent, type AppNavIntent } from '@/src/navigation/appNavigation';
import { useAppRole } from '@/src/auth/useAppRole';
import HeaderBar from '@/src/components/stm/HeaderBar';
import { Brand, cardShadow } from '@/src/theme/brand';
import { useAuth } from '@/src/context/AuthContext';
import { useCart, cartLinesToOrderItems } from '@/src/context/CartContext';
import { shopInfo } from '@/src/config/shopInfo';
import { executePayPalCheckoutFlow } from '@/src/services/paymentService';
import {
  placeGrabOrderAtCheckout,
  clearCheckoutIdempotencyPersistence,
  clearCheckoutIdempotencyKeyOnly,
  readPendingCheckoutForResume,
  makeGrabOrderId,
  grabDefaultEtaIsoFromNow,
} from '@/src/services/grabFlowOrderService';
import { registerCustomerPushToken } from '@/src/utils/notificationService';
import {
  getGrabCheckoutDraft,
  clearGrabCheckoutDraft,
  type GrabCheckoutDraft,
} from '@/src/utils/checkoutDraft';

export type { GrabCheckoutDraft };

export default function PaymentScreen() {
  const router = useRouter();
  const { compact: compactParam } = useLocalSearchParams<{ compact?: string }>();
  const compactMode =
    compactParam === '1' || compactParam === 'true' || String(compactParam).toLowerCase() === 'yes';
  const { user, profile } = useAuth();
  const navRole = useAppRole();
  const { lines, subtotal, clear, loaded } = useCart();

  const [draft, setDraft] = useState<GrabCheckoutDraft | null>(null);
  const [draftLoading, setDraftLoading] = useState(true);
  const [resumeGate, setResumeGate] = useState(true);
  const [paypalBusy, setPaypalBusy] = useState(false);
  const [phoneBusy, setPhoneBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const nav = await readPendingCheckoutForResume();
        if (!cancelled && nav) {
          await clearCheckoutIdempotencyKeyOnly();
          router.replace(hrefFromIntent(nav as AppNavIntent));
        }
      } catch (e) {
        console.warn('[PaymentScreen] pending checkout resume', e);
      } finally {
        if (!cancelled) setResumeGate(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  useEffect(() => {
    let c = false;
    void (async () => {
      try {
        const d = await getGrabCheckoutDraft();
        if (!c) setDraft(d);
      } catch (e) {
        console.warn('[PaymentScreen] draft', e);
        if (!c) setDraft(null);
      } finally {
        if (!c) setDraftLoading(false);
      }
    })();
    return () => {
      c = true;
    };
  }, []);

  useEffect(() => {
    if (user?.uid) void registerCustomerPushToken(user.uid);
  }, [user?.uid]);

  const totals = useMemo(() => {
    if (draft) {
      return {
        subtotal: draft.subtotal,
        deliveryFee: draft.deliveryFee,
        total: draft.total,
        mode: draft.mode,
        orderType: draft.orderType ?? draft.mode,
        customer: draft.customer,
      };
    }
    return {
      subtotal,
      deliveryFee: 0,
      total: subtotal,
      mode: 'pickup' as const,
      orderType: 'pickup' as const,
      customer: { name: '', phone: '', address: '', notes: '' },
    };
  }, [draft, subtotal]);

  const items = useMemo(() => cartLinesToOrderItems(lines), [lines]);

  const canPay = loaded && lines.length > 0 && totals.total > 0;
  const customerOk =
    totals.customer.name.trim() &&
    totals.customer.phone.trim() &&
    (totals.mode === 'pickup' || totals.customer.address?.trim());

  const goOrderConfirmation = useCallback(
    (orderId: string) => {
      clear();
      void clearGrabCheckoutDraft();
      void clearCheckoutIdempotencyPersistence();
      navReplace(
        router,
        {
          kind: 'orderConfirmation',
          orderId,
          etaIso: grabDefaultEtaIsoFromNow(),
        },
        navRole
      );
    },
    [router, clear, navRole]
  );

  const onPayPal = async () => {
    if (!canPay) {
      Alert.alert('Cart', 'Add items to your cart first.');
      return;
    }
    if (!customerOk || !draft) {
      Alert.alert('Details', 'Checkout draft is invalid. Go back to checkout and try again.');
      return;
    }

    setPaypalBusy(true);
    const paypalReferenceId = makeGrabOrderId();
    try {
      const flow = await executePayPalCheckoutFlow({
        amount: totals.total.toFixed(2),
        currency: 'SGD',
        referenceId: paypalReferenceId,
      });

      if (!flow.ok) {
        if (flow.reason === 'cancelled') {
          Alert.alert('PayPal', flow.message ?? 'Payment cancelled.');
          return;
        }
        if (flow.reason === 'web_pending') {
          Alert.alert('PayPal', flow.message ?? 'Complete payment in the browser.');
          return;
        }
        Alert.alert('PayPal', flow.message ?? 'Payment could not be completed.');
        return;
      }

      const orderId = await placeGrabOrderAtCheckout({
        items,
        totalAmount: totals.total,
        paymentMode: 'paypal',
        metaData: draft,
      });

      goOrderConfirmation(orderId);
    } catch (e) {
      console.error('[PaymentScreen] PayPal', e);
      Alert.alert('PayPal', e instanceof Error ? e.message : 'Payment failed');
    } finally {
      setPaypalBusy(false);
    }
  };

  const onOpenQr = () => {
    if (!canPay) {
      Alert.alert('Cart', 'Your cart is empty.');
      return;
    }
    if (!customerOk || !draft) {
      Alert.alert('Details', 'Complete checkout and save your draft before QR payment.');
      return;
    }
    navPush(router, { kind: 'grabPaymentQr', total: String(totals.total) }, navRole);
  };

  const onPhonePaid = async () => {
    if (!canPay) {
      Alert.alert('Cart', 'Your cart is empty.');
      return;
    }
    if (!customerOk || !draft) {
      Alert.alert('Details', 'Checkout draft required before marking paid.');
      return;
    }

    setPhoneBusy(true);
    try {
      const orderId = await placeGrabOrderAtCheckout({
        items,
        totalAmount: totals.total,
        paymentMode: 'phone',
        metaData: draft,
      });
      goOrderConfirmation(orderId);
    } catch (e) {
      console.error('[PaymentScreen] phone order', e);
      Alert.alert('Order', e instanceof Error ? e.message : 'Could not save order');
    } finally {
      setPhoneBusy(false);
    }
  };

  if (!loaded || draftLoading || resumeGate) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={Brand.green} size="large" />
      </View>
    );
  }

  if (paypalBusy || phoneBusy) {
    return (
      <View style={styles.processingRoot}>
        <ActivityIndicator color={Brand.green} size="large" />
        <Text style={styles.processingTitle}>
          {paypalBusy ? 'Processing payment…' : 'Placing order…'}
        </Text>
        <Text style={styles.processingSecurity}>
          🔒 Please keep this screen open. Your details are encrypted in transit.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <HeaderBar
        title={compactMode ? 'Pay with PayPal' : 'Payment'}
        subtitle={compactMode ? 'Complete payment in PayPal' : 'Secure checkout · STM Salam'}
        showBack
      />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={[styles.card, cardShadow]}>
          <Text style={styles.section}>Amount due</Text>
          <Text style={styles.bigTotal}>SGD {totals.total.toFixed(2)}</Text>
          <Text style={styles.hint}>
            Subtotal {totals.subtotal.toFixed(2)} · Delivery {totals.deliveryFee.toFixed(2)} ·{' '}
            {totals.mode === 'delivery' ? 'Delivery' : 'Pickup'}
          </Text>
        </View>

        <View style={[styles.card, cardShadow]}>
          <Text style={styles.section}>PayPal</Text>
          <Text style={styles.body}>
            You approve the exact total in PayPal. Requires{' '}
            <Text style={styles.mono}>EXPO_PUBLIC_PAYMENT_API_URL</Text>.
          </Text>
          <TouchableOpacity
            style={[styles.primary, (!canPay || paypalBusy || !draft) && styles.disabled]}
            onPress={() => void onPayPal()}
            disabled={!canPay || paypalBusy || !draft}
          >
            {paypalBusy ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.primaryText}>Pay with PayPal</Text>
            )}
          </TouchableOpacity>
        </View>

        {compactMode ? null : (
          <>
            <View style={[styles.card, cardShadow]}>
              <Text style={styles.section}>QR (PayNow / bank)</Text>
              <Text style={styles.body}>
                QR encodes your order reference and amount. Pay in your banking app, then confirm.
              </Text>
              <TouchableOpacity
                style={[styles.secondary, (!canPay || !draft) && styles.disabled]}
                onPress={onOpenQr}
                disabled={!canPay || !draft}
              >
                <Text style={styles.secondaryText}>Show payment QR</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.card, cardShadow]}>
              <Text style={styles.section}>Pay by phone / PayNow</Text>
              <Text style={styles.body}>Merchant</Text>
              <TouchableOpacity onPress={() => Linking.openURL(`tel:${shopInfo.phone.replace(/\s/g, '')}`)}>
                <Text style={styles.phone}>{shopInfo.phone}</Text>
              </TouchableOpacity>
              <Text style={styles.body}>Amount to pay</Text>
              <Text style={styles.amountEm}>SGD {totals.total.toFixed(2)}</Text>
              <TouchableOpacity
                style={[styles.outline, (!canPay || phoneBusy || !draft) && styles.disabled]}
                onPress={() => void onPhonePaid()}
                disabled={!canPay || phoneBusy || !draft}
              >
                {phoneBusy ? (
                  <ActivityIndicator color={Brand.green} />
                ) : (
                  <Text style={styles.outlineText}>Mark as paid</Text>
                )}
              </TouchableOpacity>
              <Text style={styles.finePrint}>
                Sets payment to pending verification until the kitchen confirms funds.
              </Text>
            </View>

            {Platform.OS === 'web' ? (
              <Text style={styles.webNote}>PayPal approval works best on iOS/Android native builds.</Text>
            ) : null}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Brand.bg },
  scroll: { paddingBottom: 48 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Brand.bg },
  processingRoot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Brand.bg,
    padding: 32,
  },
  processingTitle: {
    marginTop: 24,
    fontSize: 20,
    fontWeight: '900',
    color: Brand.text,
    textAlign: 'center',
  },
  processingSecurity: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: '600',
    color: Brand.muted,
    textAlign: 'center',
    lineHeight: 21,
    maxWidth: 320,
  },
  card: {
    marginHorizontal: Brand.space,
    marginTop: Brand.spaceSm,
    padding: Brand.space,
    borderRadius: Brand.radius,
    backgroundColor: Brand.card,
    borderWidth: 1,
    borderColor: Brand.border,
  },
  section: { fontSize: 15, fontWeight: '900', color: Brand.green, marginBottom: 10 },
  bigTotal: { fontSize: 32, fontWeight: '900', color: Brand.text },
  hint: { marginTop: 6, color: Brand.muted, fontWeight: '600', fontSize: 13 },
  body: { color: Brand.text, fontWeight: '600', fontSize: 14, lineHeight: 20, marginBottom: 8 },
  mono: { fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontSize: 12 },
  primary: {
    marginTop: 8,
    backgroundColor: Brand.green,
    paddingVertical: 14,
    borderRadius: Brand.radius,
    alignItems: 'center',
  },
  primaryText: { color: '#fff', fontWeight: '900', fontSize: 16 },
  secondary: {
    marginTop: 4,
    backgroundColor: Brand.gold,
    paddingVertical: 14,
    borderRadius: Brand.radius,
    alignItems: 'center',
  },
  secondaryText: { color: Brand.green, fontWeight: '900', fontSize: 15 },
  outline: {
    marginTop: 12,
    borderWidth: 2,
    borderColor: Brand.green,
    paddingVertical: 12,
    borderRadius: Brand.radius,
    alignItems: 'center',
  },
  outlineText: { color: Brand.green, fontWeight: '900', fontSize: 15 },
  phone: {
    fontSize: 20,
    fontWeight: '900',
    color: Brand.green,
    marginBottom: 8,
  },
  amountEm: { fontSize: 22, fontWeight: '900', color: Brand.text, marginBottom: 4 },
  finePrint: { marginTop: 10, fontSize: 11, color: Brand.muted, fontWeight: '600', lineHeight: 16 },
  disabled: { opacity: 0.5 },
  webNote: { margin: Brand.space, color: Brand.muted, fontSize: 12, textAlign: 'center' },
});
