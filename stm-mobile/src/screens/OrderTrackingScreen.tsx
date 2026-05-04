/**
 * // UPDATED — Grab tracking: legacy PENDING mapping, ETA countdown, listener error UI.
 * Route: \`/grab-tracking/[orderId]\`
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter, usePathname } from 'expo-router';
import { navReplace } from '@/src/navigation/appNavigation';
import { useAppRole } from '@/src/auth/useAppRole';
import { Timestamp } from 'firebase/firestore';
import HeaderBar from '@/src/components/stm/HeaderBar';
import { Brand, cardShadow } from '@/src/theme/brand';
import { ensureCustomerNotificationPermissions } from '@/src/utils/notificationService';
import { subscribeGrabOrderDoc, type GrabOrderDoc, type GrabOrderStatus, clearPendingCheckoutResolutionIfMatchesOrder } from '@/src/services/grabFlowOrderService';
import { resolveOrderDisplayTotal } from '@/src/services/orderService';

const STEPS: { key: GrabOrderStatus; label: string; emoji: string }[] = [
  { key: 'PLACED', label: 'Placed', emoji: '🧾' },
  { key: 'CONFIRMED', label: 'Confirmed', emoji: '✅' },
  { key: 'PREPARING', label: 'Preparing', emoji: '👨‍🍳' },
  { key: 'READY', label: 'Ready', emoji: '📦' },
  { key: 'OUT_FOR_DELIVERY', label: 'Out for delivery', emoji: '🚚' },
  { key: 'DELIVERED', label: 'Delivered', emoji: '🎉' },
];

function toMillis(value: Timestamp | string | null | undefined): number | null {
  if (value == null) return null;
  try {
    if (typeof value === 'string') {
      const d = new Date(value);
      return Number.isNaN(d.getTime()) ? null : d.getTime();
    }
    if (value instanceof Timestamp) {
      return value.toMillis();
    }
    return null;
  } catch {
    return null;
  }
}

function formatTs(value: Timestamp | string | null | undefined): string {
  if (value == null) return '—';
  try {
    if (typeof value === 'string') {
      const d = new Date(value);
      return Number.isNaN(d.getTime()) ? '—' : d.toLocaleString();
    }
    if (value instanceof Timestamp) {
      return value.toDate().toLocaleString();
    }
    return '—';
  } catch {
    return '—';
  }
}

/** // NEW — PLACED aligns with legacy \`public_tracking.status === PENDING\`. */
function effectivePipelineStatus(order: GrabOrderDoc): GrabOrderStatus {
  if (order.orderStatus) return order.orderStatus;
  const leg = String(order.status || '')
    .trim()
    .toUpperCase();
  if (leg === 'PENDING') return 'PLACED';
  if (leg === 'CANCELLED') return 'CANCELLED';
  if (
    leg === 'CONFIRMED' ||
    leg === 'PREPARING' ||
    leg === 'READY' ||
    leg === 'OUT_FOR_DELIVERY' ||
    leg === 'DELIVERED'
  ) {
    return leg as GrabOrderStatus;
  }
  return 'PLACED';
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return 'Arriving any moment';
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  if (m >= 60) {
    const h = Math.floor(m / 60);
    const rm = m % 60;
    return `${h}h ${rm}m`;
  }
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

/** Robust path fallback when `[orderId]` is the meaningful segment after `order-tracking` / `grab-tracking`. */
function orderIdAfterTrackingSegment(pathname: string | null): string {
  if (!pathname) return '';
  const parts = pathname.split('/').filter(Boolean);
  const i = parts.findIndex((p) => p === 'order-tracking' || p === 'grab-tracking');
  if (i >= 0 && parts[i + 1]) {
    try {
      return decodeURIComponent(parts[i + 1]).split(',')[0].trim();
    } catch {
      return parts[i + 1].split(',')[0].trim();
    }
  }
  return '';
}

/** Normalize Expo param (often string[] on web); trim + comma-safe split used elsewhere. */
function normalizeOrderParam(raw: string | string[] | undefined): string {
  const s = typeof raw === 'string' ? raw : Array.isArray(raw) ? raw[0] ?? '' : '';
  try {
    return decodeURIComponent(s).split(',')[0].trim();
  } catch {
    return s.split(',')[0].trim();
  }
}

export default function OrderTrackingScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useLocalSearchParams<{ orderId?: string | string[] }>();
  const navRole = useAppRole();

  /** Sticky once params/path yield an id — single source for subscription + UI (no churn). */
  const stableOrderIdRef = useRef<string | null>(null);
  const readyLoggedRef = useRef(false);
  const loadingLoggedRef = useRef(false);

  const paramPart =
    typeof params.orderId === 'string'
      ? params.orderId
      : Array.isArray(params.orderId)
        ? params.orderId[0]
        : undefined;
  const pathnameTail = pathname?.split('/').filter(Boolean).pop() ?? '';
  const rawSegment = paramPart ?? pathnameTail;
  /** Match `params ?? pathnameTail`; if tail is the route group (`order-tracking`), read id from the next segment. */
  const resolvedSegment =
    rawSegment && rawSegment !== 'order-tracking' && rawSegment !== 'grab-tracking'
      ? rawSegment
      : orderIdAfterTrackingSegment(pathname);
  const extractedOrderId = resolvedSegment ? normalizeOrderParam(resolvedSegment) : '';

  if (extractedOrderId && !stableOrderIdRef.current) {
    stableOrderIdRef.current = extractedOrderId;
  }
  const orderId = stableOrderIdRef.current;
  const effectiveOrderId = (orderId ?? '').trim();

  const [order, setOrder] = useState<GrabOrderDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [listenerError, setListenerError] = useState<string | null>(null);
  const [nowTick, setNowTick] = useState(() => Date.now());

  const missingOrderIdParam = !effectiveOrderId;

  useEffect(() => {
    void ensureCustomerNotificationPermissions();
  }, []);

  useEffect(() => {
    if (!effectiveOrderId) return;
    void clearPendingCheckoutResolutionIfMatchesOrder(effectiveOrderId);
  }, [effectiveOrderId]);

  /** ETA countdown ticks only once an order snapshot exists — avoids churn while `loading` is true. */
  useEffect(() => {
    if (!order) return;
    const t = setInterval(() => setNowTick(Date.now()), 1000);
    return () => clearInterval(t);
  }, [order]);

  useEffect(() => {
    if (!effectiveOrderId) return;
    setListenerError(null);
    setLoading(true);
    setOrder(null);

    const unsubscribe = subscribeGrabOrderDoc(
      effectiveOrderId,
      (docSnap) => {
        if (docSnap) {
          setListenerError(null);
          setOrder(docSnap);
          setLoading(false);
          return;
        }
        setOrder(null);
        setLoading(false);
      },
      (err) => {
        console.error('[TRACKING_ERROR]', err);
        setListenerError(err.message || 'Connection issue');
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [effectiveOrderId]);

  useEffect(() => {
    if (loading || !effectiveOrderId || readyLoggedRef.current) return;
    readyLoggedRef.current = true;
    console.log('✅ ORDER TRACKING READY', {
      orderId: effectiveOrderId,
      pathname,
    });
  }, [loading, effectiveOrderId, pathname]);

  useEffect(() => {
    if (!loading) loadingLoggedRef.current = false;
  }, [loading]);

  const pipelineStatus = useMemo(
    () => (order ? effectivePipelineStatus(order) : 'PLACED'),
    [order]
  );

  const activeIndex = useMemo(() => {
    const i = STEPS.findIndex((s) => s.key === pipelineStatus);
    return i < 0 ? 0 : i;
  }, [pipelineStatus]);

  const etaMs = useMemo(() => (order ? toMillis(order.estimatedDeliveryAt) : null), [order]);
  const countdownLabel = useMemo(() => {
    if (etaMs == null) return null;
    return formatCountdown(etaMs - nowTick);
  }, [etaMs, nowTick]);

  if (missingOrderIdParam) {
    return (
      <View style={styles.center}>
        <Text style={styles.err}>Invalid order link</Text>
        <Text style={styles.muted}>Check your confirmation message for the correct URL.</Text>
        <TouchableOpacity style={styles.btn} onPress={() => navReplace(router, { kind: 'tabs' }, navRole)}>
          <Text style={styles.btnText}>Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading) {
    if (!loadingLoggedRef.current) {
      loadingLoggedRef.current = true;
      console.log('⏳ ORDER TRACKING LOADING', {
        orderId: effectiveOrderId,
        pathname,
        loading,
      });
    }
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Brand.green} />
        <Text style={styles.muted}>Waiting for live updates...</Text>
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.center}>
        <Text style={styles.err}>Order not found</Text>
        {listenerError ? <Text style={styles.warn}>{listenerError}</Text> : null}
        <TouchableOpacity style={styles.btn} onPress={() => navReplace(router, { kind: 'tabs' }, navRole)}>
          <Text style={styles.btnText}>Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (pipelineStatus === 'CANCELLED') {
    const shortCancelled =
      effectiveOrderId.length >= 8
        ? effectiveOrderId.slice(-8).toUpperCase()
        : effectiveOrderId.toUpperCase();
    return (
      <View style={styles.root}>
        <HeaderBar title={`Order ${shortCancelled}`} subtitle="Cancelled" showBack />
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={[styles.card, cardShadow, styles.cancelCard]}>
            <Text style={styles.cancelEmoji}>✕</Text>
            <Text style={styles.cancelTitle}>This order was not accepted</Text>
            <Text style={styles.cancelBody}>
              The kitchen declined or cancelled this order. If you already paid, contact us with your
              order reference.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.btnWide}
            onPress={() => navReplace(router, { kind: 'tabs' }, navRole)}
          >
            <Text style={styles.btnText}>Back to home</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  const short =
    effectiveOrderId.length >= 8
      ? effectiveOrderId.slice(-8).toUpperCase()
      : effectiveOrderId.toUpperCase();
  const displayTotal = resolveOrderDisplayTotal(order as unknown as Record<string, unknown>);
  const isPickup = order.mode === 'pickup' || (order as { orderType?: string }).orderType === 'pickup';
  const legacyNote =
    pipelineStatus === 'PLACED' && String(order.status || '').toUpperCase() === 'PENDING'
      ? 'Synced as PENDING for classic tracking'
      : null;

  return (
    <View style={styles.root}>
      <HeaderBar title={`Order ${short}`} subtitle="Live updates" showBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        {listenerError ? (
          <View style={styles.banner}>
            <Text style={styles.bannerText}>
              Temporary connection issue — {listenerError}. Reconnecting…
            </Text>
          </View>
        ) : null}

        {order.paymentMethod === 'qr' && order.paymentStatus === 'PAID' ? (
          <TouchableOpacity
            style={styles.banner}
            activeOpacity={0.88}
            onPress={() =>
              navReplace(
                router,
                {
                  kind: 'paymentSuccess',
                  orderId: order.id,
                  total: String(displayTotal.toFixed(2)),
                  source: 'qr',
                },
                navRole
              )
            }
          >
            <Text style={styles.bannerText}>
              Payment confirmed — tap here to open receipt
            </Text>
          </TouchableOpacity>
        ) : null}

        <View style={[styles.card, cardShadow]}>
          <Text style={styles.section}>Status</Text>
          <Text style={styles.statusBig}>
            {STEPS[activeIndex]?.emoji} {pipelineStatus.replace(/_/g, ' ')}
          </Text>
          {legacyNote ? <Text style={styles.legacyHint}>{legacyNote}</Text> : null}
          <Text style={styles.paymentLine}>
            Payment: {(order.paymentStatus ?? 'PENDING').replace(/_/g, ' ')}
          </Text>
        </View>

        <View style={[styles.card, cardShadow]}>
          <Text style={styles.section}>Timeline</Text>
          {STEPS.map((step, idx) => {
            const done = idx < activeIndex;
            const current = idx === activeIndex;
            const stepLabel =
              isPickup && step.key === 'OUT_FOR_DELIVERY' ? 'Ready for pickup' : step.label;
            return (
              <View key={step.key} style={styles.stepRow}>
                <View
                  style={[
                    styles.dot,
                    done && styles.dotDone,
                    current && styles.dotCurrent,
                  ]}
                />
                <View
                  style={[
                    styles.stepCard,
                    current && styles.stepCardOn,
                    done && styles.stepCardDone,
                  ]}
                >
                  <Text style={[styles.stepTitle, current && styles.stepTitleOn]}>
                    {step.emoji} {stepLabel}
                  </Text>
                  {current ? (
                    <Text style={styles.stepSub}>Current step</Text>
                  ) : done ? (
                    <Text style={styles.stepSub}>Completed</Text>
                  ) : (
                    <Text style={styles.stepSub}>Upcoming</Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        <View style={[styles.card, cardShadow]}>
          <Text style={styles.section}>
            {isPickup ? 'Estimated ready' : 'Estimated delivery'}
          </Text>
          <Text style={styles.eta}>{formatTs(order.estimatedDeliveryAt)}</Text>
          {countdownLabel && !isPickup ? (
            <Text style={styles.countdown}>Time left · ~{countdownLabel}</Text>
          ) : null}
          <Text style={styles.fine}>
            {isPickup
              ? 'ETA is an estimate. We will notify you when your order is ready for collection at the store.'
              : 'ETA is an estimate. We will notify you when the rider is nearby.'}
          </Text>
        </View>

        <View style={[styles.card, cardShadow]}>
          <Text style={styles.section}>Order summary</Text>
          {(order.items ?? []).map((it, i) => (
            <View key={`${it.name}-${i}`} style={styles.line}>
              <Text style={styles.lineName} numberOfLines={2}>
                {it.name} ×{it.qty}
              </Text>
              <Text style={styles.linePrice}>${(it.price * it.qty).toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.line}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              SGD {displayTotal.toFixed(2)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.secondary}
          onPress={() => navReplace(router, { kind: 'tabs' }, navRole)}
        >
          <Text style={styles.secondaryText}>Back to menu</Text>
        </TouchableOpacity>

        {Platform.OS === 'web' ? (
          <Text style={styles.webHint}>Push alerts work on iOS/Android builds with permissions.</Text>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Brand.bg },
  scroll: { padding: Brand.space, paddingBottom: 48 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Brand.bg },
  muted: { marginTop: 8, color: Brand.muted, fontWeight: '600' },
  err: { color: '#b91c1c', fontWeight: '800', marginBottom: 12 },
  warn: { color: Brand.orange, fontWeight: '600', textAlign: 'center', marginBottom: 12, paddingHorizontal: 24 },
  btn: { backgroundColor: Brand.green, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 },
  btnText: { color: '#fff', fontWeight: '900' },
  banner: {
    backgroundColor: '#FEF3C7',
    borderRadius: Brand.radius,
    padding: 12,
    marginBottom: Brand.spaceSm,
    borderWidth: 1,
    borderColor: '#FCD34D',
  },
  bannerText: { color: '#92400E', fontWeight: '700', fontSize: 13, lineHeight: 18 },
  card: {
    backgroundColor: Brand.card,
    borderRadius: Brand.radius,
    padding: Brand.space,
    borderWidth: 1,
    borderColor: Brand.border,
    marginBottom: Brand.spaceSm,
  },
  section: { fontSize: 13, fontWeight: '900', color: Brand.green, marginBottom: 10, textTransform: 'uppercase' },
  statusBig: { fontSize: 22, fontWeight: '900', color: Brand.text },
  legacyHint: { marginTop: 6, fontSize: 12, color: Brand.muted, fontWeight: '600', fontStyle: 'italic' },
  paymentLine: { marginTop: 6, color: Brand.muted, fontWeight: '700' },
  stepRow: { flexDirection: 'row', marginBottom: 12, alignItems: 'stretch' },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginTop: 14,
    marginRight: 12,
    backgroundColor: Brand.border,
  },
  dotDone: { backgroundColor: Brand.greenMid },
  dotCurrent: { backgroundColor: Brand.gold, borderWidth: 2, borderColor: Brand.green },
  stepCard: {
    flex: 1,
    borderRadius: Brand.radius,
    padding: 12,
    borderWidth: 1,
    borderColor: Brand.border,
    backgroundColor: Brand.bg,
  },
  stepCardDone: { opacity: 0.85 },
  stepCardOn: {
    borderColor: Brand.green,
    backgroundColor: 'rgba(1, 50, 32, 0.06)',
    borderWidth: 2,
  },
  stepTitle: { fontSize: 16, fontWeight: '800', color: Brand.muted },
  stepTitleOn: { color: Brand.text },
  stepSub: { fontSize: 12, color: Brand.muted, fontWeight: '600', marginTop: 2 },
  eta: { fontSize: 18, fontWeight: '900', color: Brand.text },
  countdown: { marginTop: 8, fontSize: 20, fontWeight: '900', color: Brand.green },
  fine: { marginTop: 8, fontSize: 12, color: Brand.muted, lineHeight: 17, fontWeight: '600' },
  line: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  lineName: { flex: 1, fontWeight: '600', color: Brand.text, paddingRight: 8 },
  linePrice: { fontWeight: '800', color: Brand.text },
  divider: { height: 1, backgroundColor: Brand.border, marginVertical: 8 },
  totalLabel: { fontWeight: '900', color: Brand.text, fontSize: 16 },
  totalValue: { fontWeight: '900', color: Brand.green, fontSize: 16 },
  secondary: {
    marginTop: 8,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: Brand.radius,
    borderWidth: 2,
    borderColor: Brand.gold,
  },
  secondaryText: { fontWeight: '900', color: Brand.green },
  webHint: { marginTop: 16, textAlign: 'center', color: Brand.muted, fontSize: 12 },
  cancelCard: { alignItems: 'center', paddingVertical: 24 },
  cancelEmoji: {
    fontSize: 40,
    fontWeight: '900',
    color: '#b91c1c',
    marginBottom: 12,
  },
  cancelTitle: { fontSize: 20, fontWeight: '900', color: Brand.text, textAlign: 'center' },
  cancelBody: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
    color: Brand.muted,
    textAlign: 'center',
    lineHeight: 21,
  },
  btnWide: {
    marginTop: 16,
    backgroundColor: Brand.green,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
});
