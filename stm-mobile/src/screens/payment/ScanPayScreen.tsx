/**
 * HitPay PayNow — shows QR, polls HitPay, then marks Firestore payment PAID.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { navReplace } from '@/src/navigation/appNavigation';
import { useAppRole } from '@/src/auth/useAppRole';
import QRCode from 'react-native-qrcode-svg';
import {
  createPayNowPayment,
  fetchHitPayPaymentStatus,
} from '@/src/services/payment/hitpayService';
import { updateOrderStatus } from '@/src/services/payment/updateOrderStatus';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/src/services/firebase';
import { Asset } from 'expo-asset';
import { WebView } from 'react-native-webview';

/** Bundled “Scan to pay” reference (STM) — PDF from `assets/payment/scanner-pay.pdf`. */
const SCAN_TO_PAY_PDF = require('../../../assets/payment/scanner-pay.pdf');

const POLL_MS = 5000;
const GREEN = '#013220';
const GOLD = '#D4AF37';

export default function ScanPayScreen() {
  const router = useRouter();
  const navRole = useAppRole();
  const params = useLocalSearchParams<{
    orderId?: string;
    amount?: string;
    customerName?: string;
  }>();

  const orderId = String(params.orderId || '').trim();
  const amountNum = Number(params.amount);
  const customerName = String(params.customerName || 'Customer').trim() || 'Customer';

  const [phase, setPhase] = useState<'boot' | 'ready' | 'paid' | 'error'>('boot');
  const [message, setMessage] = useState('');
  const [qrPayload, setQrPayload] = useState<string | null>(null);
  const [amountDisplay, setAmountDisplay] = useState('');
  const [paymentRequestId, setPaymentRequestId] = useState<string | null>(null);
  const [scanToPayPdfUri, setScanToPayPdfUri] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const settledRef = useRef(false);

  const stopPoll = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const onPaid = useCallback(async () => {
    if (settledRef.current) return;
    settledRef.current = true;
    stopPoll();
    setPhase('paid');
    const sync = await updateOrderStatus(orderId, 'PAID');
    if (!sync.ok) {
      console.warn('[ScanPay] Firestore sync:', sync.error);
      settledRef.current = false;
      setPhase('ready');
      Alert.alert('Payment', sync.error || 'Could not confirm payment in our system.');
      return;
    }
    let ps: string | undefined;
    for (let i = 0; i < 20; i++) {
      const snap = await getDoc(doc(db, 'public_tracking', orderId));
      ps = (snap.data() as { paymentStatus?: string } | undefined)?.paymentStatus;
      if (ps === 'PAID') break;
      await new Promise((r) => setTimeout(r, 250));
    }
    if (ps !== 'PAID') {
      settledRef.current = false;
      setPhase('ready');
      Alert.alert(
        'Payment',
        'Your bank may have paid, but we could not confirm the order yet. Check order tracking.',
      );
      return;
    }
    navReplace(router, { kind: 'paymentSuccessMinimal', orderId, source: 'qr' }, navRole);
  }, [orderId, router, stopPoll, navRole]);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!orderId || !Number.isFinite(amountNum)) {
        setPhase('error');
        setMessage('Missing orderId or amount. Open Scan & Pay from checkout.');
        return;
      }

      const created = await createPayNowPayment(orderId, amountNum, customerName);
      if (cancelled) return;

      if (!created.ok || !created.paymentRequestId) {
        setPhase('error');
        setMessage(created.error || 'Could not start HitPay payment.');
        return;
      }

      setPaymentRequestId(created.paymentRequestId);
      setAmountDisplay(created.amountDisplay || amountNum.toFixed(2));
      setQrPayload(created.qrPayload || created.checkoutUrl || null);
      setPhase('ready');
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [orderId, amountNum, customerName]);

  useEffect(() => {
    if (!paymentRequestId || phase !== 'ready') return;

    const tick = async () => {
      const { status } = await fetchHitPayPaymentStatus(paymentRequestId);
      if (status === 'completed') {
        await onPaid();
      } else if (status === 'failed') {
        stopPoll();
        setPhase('error');
        setMessage('Payment failed or expired.');
        Alert.alert('Payment failed', 'You can try again from checkout.', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      }
    };

    void tick();
    pollRef.current = setInterval(() => {
      void tick();
    }, POLL_MS);

    return stopPoll;
  }, [paymentRequestId, phase, onPaid, router, stopPoll]);

  const isUrl = qrPayload?.startsWith('http');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const a = Asset.fromModule(SCAN_TO_PAY_PDF);
        await a.downloadAsync();
        if (!cancelled) {
          setScanToPayPdfUri(a.localUri ?? a.uri);
        }
      } catch {
        if (!cancelled) {
          setScanToPayPdfUri(null);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Scan &amp; Pay</Text>
      <Text style={styles.sub}>Order {orderId ? `#${orderId.slice(-8)}` : '—'}</Text>
      <Text style={styles.amount}>SGD {amountDisplay || (Number.isFinite(amountNum) ? amountNum.toFixed(2) : '—')}</Text>

      {scanToPayPdfUri ? (
        <View style={styles.pdfCard}>
          <Text style={styles.pdfLabel}>Scan to pay — STM Salam Teh Tarik</Text>
          <WebView
            source={{ uri: scanToPayPdfUri }}
            style={styles.pdfWeb}
            scrollEnabled
            allowFileAccess
            allowUniversalAccessFromFileURLs
            originWhitelist={['*']}
            showsVerticalScrollIndicator={false}
            setSupportMultipleWindows={false}
          />
        </View>
      ) : null}

      {phase === 'boot' && (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color={GREEN} />
          <Text style={styles.wait}>Preparing PayNow QR…</Text>
        </View>
      )}

      {phase === 'ready' && qrPayload && (
        <View style={styles.qrCard}>
          {isUrl ? (
            <Image source={{ uri: qrPayload }} style={styles.qrImage} contentFit="contain" />
          ) : (
            <View style={styles.qrWrap}>
              <QRCode value={qrPayload} size={220} color={GREEN} backgroundColor="#FFFFFF" />
            </View>
          )}
          <Text style={styles.wait}>Waiting for payment…</Text>
          <Text style={styles.hint}>Pay in your banking app, then keep this screen open.</Text>
        </View>
      )}

      {phase === 'ready' && !qrPayload && (
        <View style={styles.centerBox}>
          <Text style={styles.err}>No QR data returned. Check HitPay account PayNow setup.</Text>
        </View>
      )}

      {phase === 'error' && (
        <View style={styles.centerBox}>
          <Text style={styles.err}>{message}</Text>
          <TouchableOpacity style={styles.btn} onPress={() => router.back()} activeOpacity={0.85}>
            <Text style={styles.btnText}>Back</Text>
          </TouchableOpacity>
        </View>
      )}

      {phase === 'paid' && (
        <View style={styles.centerBox}>
          <ActivityIndicator color={GREEN} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 24, paddingTop: 56, alignItems: 'center' },
  title: { fontSize: 26, fontWeight: '900', color: GREEN },
  sub: { marginTop: 6, fontSize: 14, color: '#64748B', fontWeight: '600' },
  amount: { marginTop: 12, fontSize: 28, fontWeight: '900', color: GOLD },
  pdfCard: {
    marginTop: 20,
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  pdfLabel: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 6,
    fontSize: 13,
    fontWeight: '800',
    color: '#475569',
    textAlign: 'center',
  },
  pdfWeb: {
    width: '100%',
    height: 320,
    backgroundColor: '#F1F5F9',
  },
  centerBox: { marginTop: 40, alignItems: 'center', gap: 16 },
  qrCard: {
    marginTop: 28,
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    width: '100%',
    maxWidth: 340,
  },
  qrWrap: { padding: 12, backgroundColor: '#FFF', borderRadius: 16 },
  qrImage: { width: 240, height: 240 },
  wait: { marginTop: 20, fontSize: 16, fontWeight: '800', color: GREEN },
  hint: { marginTop: 8, fontSize: 13, color: '#64748B', textAlign: 'center', fontWeight: '600' },
  err: { color: '#B91C1C', fontWeight: '700', textAlign: 'center', fontSize: 15 },
  btn: {
    marginTop: 8,
    backgroundColor: GREEN,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
  },
  btnText: { color: '#FFF', fontWeight: '900', fontSize: 15 },
});
