/**
 * QR payment path — order created at checkout; customer confirms after transfer.
 * Route: /grab-payment-qr?orderId=&total=
 */

import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { navReplace } from '@/src/navigation/appNavigation';
import { useAppRole } from '@/src/auth/useAppRole';
import { useAuth } from '@/src/context/AuthContext';
import QRCode from 'react-native-qrcode-svg';
import HeaderBar from '@/src/components/stm/HeaderBar';
import { Brand, cardShadow } from '@/src/theme/brand';
import { useCart } from '@/src/context/CartContext';
import { shopInfo } from '@/src/config/shopInfo';
import { submitQrPaymentClaim } from '@/src/services/qrClaimService';
import { clearPendingCheckoutResolutionIfMatchesOrder } from '@/src/services/grabFlowOrderService';
import { clearGrabCheckoutDraft } from '@/src/utils/checkoutDraft';

export default function PaymentQRScreen() {
  const router = useRouter();
  const { user, profile } = useAuth();
  const navRole = useAppRole();
  const { orderId: oid, total: totalParam } = useLocalSearchParams<{
    orderId?: string;
    total?: string;
  }>();
  const orderId = useMemo(() => {
    const raw = oid != null ? String(oid) : '';
    try {
      return raw ? decodeURIComponent(raw).split(',')[0].trim() : '';
    } catch {
      return raw.split(',')[0].trim();
    }
  }, [oid]);

  const { lines, loaded, clear } = useCart();
  const [claimBusy, setClaimBusy] = useState(false);

  useEffect(() => {
    if (!orderId) return;
    void clearPendingCheckoutResolutionIfMatchesOrder(orderId);
  }, [orderId]);

  const paramTotal = parseFloat(String(totalParam ?? ''));
  const amount = useMemo(() => {
    if (Number.isFinite(paramTotal) && paramTotal > 0) return paramTotal;
    return lines.reduce((s, l) => s + l.price * l.qty, 0);
  }, [paramTotal, lines]);

  const qrPayload = useMemo(() => {
    if (!orderId) return '';
    return JSON.stringify({
      type: 'STM_GRAB_PAYMENT',
      merchant: shopInfo.name,
      phone: shopInfo.phone,
      orderId,
      amount: Number(amount.toFixed(2)),
      currency: 'SGD',
      hint: 'PayNow / bank transfer — use order reference as note if required',
    });
  }, [orderId, amount]);

  const onClaimPaid = async () => {
    if (!orderId) return;
    setClaimBusy(true);
    try {
      const r = await submitQrPaymentClaim(orderId);
      if (!r.ok) {
        Alert.alert('Payment', r.error);
        return;
      }
      clear();
      void clearGrabCheckoutDraft();
      navReplace(router, { kind: 'orderTracking', orderId }, navRole);
    } catch (e) {
      Alert.alert('Order', e instanceof Error ? e.message : 'Update failed');
    } finally {
      setClaimBusy(false);
    }
  };

  if (!loaded) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Brand.green} />
      </View>
    );
  }

  if (!orderId) {
    return (
      <View style={styles.center}>
        <Text style={styles.err}>Missing order. Return to checkout.</Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navReplace(router, { kind: 'checkout' }, navRole)}
        >
          <Text style={styles.btnText}>Back to checkout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <HeaderBar title="Scan & pay" subtitle="PayNow / bank apps" showBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.card, cardShadow]}>
          <Text style={styles.label}>Order reference</Text>
          <Text style={styles.ref}>{orderId}</Text>
          <Text style={styles.label}>Pay to</Text>
          <Text style={styles.phone}>{shopInfo.phone}</Text>
          <View style={styles.qrBox}>
            <QRCode value={qrPayload} size={220} color={Brand.green} backgroundColor="#fff" />
          </View>
          <Text style={styles.help}>
            Open your bank app and scan, or copy the reference. Amount must match exactly. After you pay, tap
            below — our team will confirm and mark your order paid. You can track status on the next screen.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.cta, claimBusy && styles.ctaOff]}
          onPress={() => void onClaimPaid()}
          disabled={claimBusy}
        >
          {claimBusy ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.ctaText}>I have paid</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Brand.bg },
  scroll: { padding: Brand.space, paddingBottom: 40 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Brand.bg },
  err: { color: '#b91c1c', fontWeight: '800', marginBottom: 16 },
  btn: { paddingHorizontal: 24, paddingVertical: 12, backgroundColor: Brand.green, borderRadius: 12 },
  btnText: { color: '#fff', fontWeight: '900' },
  card: {
    backgroundColor: Brand.card,
    borderRadius: Brand.radius,
    padding: Brand.space,
    borderWidth: 1,
    borderColor: Brand.border,
    alignItems: 'center',
  },
  label: { fontSize: 12, fontWeight: '800', color: Brand.muted, alignSelf: 'flex-start' },
  ref: {
    fontSize: 16,
    fontWeight: '900',
    color: Brand.text,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  phone: {
    fontSize: 18,
    fontWeight: '900',
    color: Brand.green,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  qrBox: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: Brand.radius,
    borderWidth: 1,
    borderColor: Brand.border,
  },
  help: {
    marginTop: 16,
    fontSize: 13,
    color: Brand.muted,
    fontWeight: '600',
    lineHeight: 19,
    textAlign: 'center',
  },
  cta: {
    marginTop: 24,
    backgroundColor: Brand.green,
    paddingVertical: 16,
    borderRadius: Brand.radius,
    alignItems: 'center',
  },
  ctaOff: { opacity: 0.7 },
  ctaText: { color: '#fff', fontWeight: '900', fontSize: 16 },
});
