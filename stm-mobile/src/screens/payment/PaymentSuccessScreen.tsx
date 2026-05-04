/**
 * Shown only after a payment path that expects Firestore `paymentStatus === 'PAID'`.
 * Listens to `public_tracking` (world-readable) so it matches customer Firestore rules; mirror should match `orders/{orderId}`.
 * Never animates the success state until the doc confirms PAID (except COD redirect to tracking only).
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { doc, onSnapshot } from 'firebase/firestore';
import { navReplace } from '@/src/navigation/appNavigation';
import { useAppRole } from '@/src/auth/useAppRole';
import { Ionicons } from '@expo/vector-icons';
import { db } from '@/src/services/firebase';
import { Brand, cardShadow } from '@/src/theme/brand';
import type { GrabOrderDoc } from '@/src/services/grabFlowOrderService';

const REDIRECT_MS = 2800;
const VERIFY_TIMEOUT_MS = 30000;

type VerifyState = 'idle' | 'loading' | 'paid' | 'timeout' | 'no_doc';

export default function PaymentSuccessScreen() {
  const router = useRouter();
  const navRole = useAppRole();
  const { orderId: rawOrder, total: rawTotal, source: rawSource } = useLocalSearchParams<{
    orderId?: string;
    total?: string;
    source?: string;
  }>();
  const orderId = rawOrder ? String(rawOrder).trim() : '';
  const total = rawTotal ? String(rawTotal).trim() : '';
  const source = rawSource ? String(rawSource).toLowerCase() : '';
  const scale = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(0)).current;

  const [verify, setVerify] = useState<VerifyState>(() => {
    const s = rawSource ? String(rawSource).toLowerCase() : '';
    const oid = rawOrder ? String(rawOrder).trim() : '';
    if (oid && s !== 'cod') return 'loading';
    return 'idle';
  });
  const didAnimate = useRef(false);
  const codNavigated = useRef(false);

  useEffect(() => {
    if (source !== 'cod' || !orderId || codNavigated.current) {
      return;
    }
    codNavigated.current = true;
    setVerify('idle');
    navReplace(router, { kind: 'orderTracking', orderId }, navRole);
  }, [source, orderId, router, navRole]);

  useEffect(() => {
    if (source === 'cod' && !orderId) {
      navReplace(router, { kind: 'tabs' }, navRole);
    }
  }, [source, orderId, router, navRole]);

  useEffect(() => {
    if (source === 'cod' || !orderId) {
      if (!orderId && source !== 'cod') {
        setVerify('no_doc');
      }
      return;
    }

    setVerify('loading');
    const t = setTimeout(() => {
      setVerify((s) => (s === 'loading' ? 'timeout' : s));
    }, VERIFY_TIMEOUT_MS);

    const unsub = onSnapshot(
      doc(db, 'public_tracking', orderId),
      (snap) => {
        if (!snap.exists()) {
          setVerify('no_doc');
          return;
        }
        const data = snap.data() as GrabOrderDoc;
        if (String(data.paymentStatus) === 'PAID') {
          setVerify('paid');
        }
      },
      () => {
        setVerify('timeout');
      }
    );

    return () => {
      clearTimeout(t);
      unsub();
    };
  }, [orderId, source]);

  useEffect(() => {
    if (verify !== 'paid' || didAnimate.current) {
      return;
    }
    didAnimate.current = true;
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        tension: 120,
        useNativeDriver: true,
      }),
      Animated.timing(fade, {
        toValue: 1,
        duration: 380,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [verify, scale, fade]);

  useEffect(() => {
    if (verify !== 'paid' || !orderId) {
      return;
    }
    const t = setTimeout(() => {
      navReplace(router, { kind: 'orderTracking', orderId }, navRole);
    }, REDIRECT_MS);
    return () => clearTimeout(t);
  }, [verify, orderId, router, navRole]);

  if (source === 'cod') {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" color={Brand.green} />
        <Text style={styles.muted}>Opening tracking…</Text>
      </View>
    );
  }

  if (!orderId) {
    return (
      <View style={styles.screen}>
        <Text style={styles.err}>Missing order reference.</Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navReplace(router, { kind: 'tabs' }, navRole)}
          activeOpacity={0.88}
        >
          <Text style={styles.btnText}>Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (verify === 'loading' || verify === 'idle') {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" color={Brand.green} />
        <Text style={styles.title}>Verifying payment…</Text>
        <Text style={styles.sub}>
          We are confirming with our servers. This screen will update as soon as your payment is recorded.
        </Text>
      </View>
    );
  }

  if (verify === 'no_doc' || verify === 'timeout') {
    return (
      <View style={styles.screen}>
        <Ionicons name="time-outline" size={56} color={Brand.muted} />
        <Text style={styles.title}>
          {verify === 'no_doc' ? 'Order not found yet' : 'Still confirming…'}
        </Text>
        <Text style={styles.sub}>
          Open tracking to see live status. If you were charged, it may take a moment to show here.
        </Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navReplace(router, { kind: 'orderTracking', orderId }, navRole)}
          activeOpacity={0.88}
        >
          <Text style={styles.btnText}>View order &amp; tracking</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (verify !== 'paid') {
    return null;
  }

  const shortId = orderId.length >= 8 ? orderId.slice(-8).toUpperCase() : orderId.toUpperCase();

  return (
    <View style={styles.screen}>
      <Animated.View
        style={[
          styles.tickWrap,
          cardShadow,
          {
            opacity: fade,
            transform: [{ scale }],
          },
        ]}
      >
        <Ionicons name="checkmark-circle" size={72} color={Brand.green} />
      </Animated.View>
      <Text style={styles.title}>Payment successful</Text>
      <Text style={styles.sub}>
        {`Order #${shortId} is `}
        {source === 'qr' ? 'confirmed — payment recorded.' : 'confirmed and paid.'}
      </Text>
      {total ? (
        <Text style={styles.totalLine}>
          Total paid · SGD {Number(total).toFixed(2)}
        </Text>
      ) : null}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navReplace(router, { kind: 'orderTracking', orderId }, navRole)}
        activeOpacity={0.88}
      >
        <Text style={styles.btnText}>Track order</Text>
      </TouchableOpacity>
      <Text style={styles.hint}>Opening live tracking in a few seconds…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Brand.bg,
    padding: 28,
    paddingTop: 72,
    alignItems: 'center',
  },
  muted: { marginTop: 12, color: Brand.muted, fontWeight: '600' },
  err: { color: '#B91C1C', fontWeight: '800', textAlign: 'center' },
  tickWrap: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: Brand.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Brand.gold,
    marginBottom: 8,
  },
  title: { fontSize: 26, fontWeight: '900', color: Brand.green, marginTop: 16 },
  sub: {
    marginTop: 12,
    fontSize: 15,
    color: Brand.muted,
    fontWeight: '600',
    textAlign: 'center',
    maxWidth: 320,
    lineHeight: 22,
  },
  totalLine: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: '900',
    color: Brand.text,
  },
  btn: {
    marginTop: 36,
    backgroundColor: Brand.green,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: Brand.radius,
    minWidth: 220,
    alignItems: 'center',
  },
  btnText: { color: '#FFF', fontWeight: '900', fontSize: 16 },
  hint: {
    marginTop: 20,
    fontSize: 13,
    fontWeight: '600',
    color: Brand.muted,
    textAlign: 'center',
  },
});
