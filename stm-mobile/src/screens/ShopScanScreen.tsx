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
import { Ionicons } from '@expo/vector-icons';

export default function ShopScanScreen() {
  const router = useRouter();
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
      navReplace(router, { kind: 'paymentSuccessMinimal', orderId, source: 'qr' }, navRole);
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
      <HeaderBar title="Shop Scan & Pay" showBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.card, cardShadow]}>
          <View style={styles.row}>
            <Text style={styles.label}>ORDER REFERENCE</Text>
            <Text style={styles.ref}>{orderId.slice(-8).toUpperCase()}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.amountLabel}>Total Payable</Text>
            <Text style={styles.amountValue}>SGD ${amount.toFixed(2)}</Text>
          </View>
        </View>

        <Text style={styles.help}>
          Scan the official PayNow SGQR below using your banking app to make payment.
        </Text>

        <View style={styles.qrContainer}>
          <QRCode value={qrPayload} size={240} color={Brand.green} backgroundColor="#fff" />
          <Text style={styles.phoneLabel}>Pay to: {shopInfo.phone}</Text>
        </View>

        <TouchableOpacity
          style={[styles.cta, claimBusy && styles.ctaOff]}
          onPress={() => void onClaimPaid()}
          disabled={claimBusy}
        >
          {claimBusy ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.ctaText}>I Have Completed Payment</Text>
          )}
        </TouchableOpacity>

        <View style={styles.verified}>
          <Ionicons name="shield-checkmark" size={16} color={Brand.muted} />
          <Text style={styles.verifiedText}>Verified merchant checkout</Text>
        </View>
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
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: { fontSize: 12, fontWeight: '800', color: Brand.muted },
  ref: { fontSize: 14, fontWeight: '900', color: Brand.green },
  amountLabel: { fontSize: 16, fontWeight: '800', color: Brand.text },
  amountValue: { fontSize: 16, fontWeight: '900', color: Brand.green },
  help: {
    fontSize: 14,
    color: Brand.muted,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 24,
  },
  qrContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: Brand.border,
    marginBottom: 32,
  },
  phoneLabel: {
    marginTop: 16,
    fontSize: 15,
    fontWeight: '800',
    color: Brand.text,
  },
  cta: {
    backgroundColor: Brand.green,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  ctaOff: { opacity: 0.7 },
  ctaText: { color: '#fff', fontWeight: '900', fontSize: 16 },
  verified: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '700',
    color: Brand.muted,
  },
});
