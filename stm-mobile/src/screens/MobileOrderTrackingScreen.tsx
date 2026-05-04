import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, onSnapshot } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { db } from '@/src/services/firebase';
import HeaderBar from '@/src/components/stm/HeaderBar';
import { cardShadow } from '@/src/theme/brand';
import ErrorState from '@/src/components/ErrorState';
import { useAuth } from '@/src/context/AuthContext';

type OrderDoc = {
  id?: string;
  status?: string;
  riderId?: string | null;
};

type RiderDoc = {
  lat?: number;
  lng?: number;
  location?: { lat?: number; lng?: number };
};

const PIPELINE = ['pending', 'preparing', 'ready', 'assigned', 'picked_up', 'delivered'] as const;
type PipelineStatus = (typeof PIPELINE)[number];

const STEP_LABELS: Record<PipelineStatus, string> = {
  pending: 'Pending',
  preparing: 'Preparing',
  ready: 'Ready',
  assigned: 'Assigned',
  picked_up: 'Picked Up',
  delivered: 'Delivered',
};

const STATUS_META: Record<PipelineStatus, { color: string; subtitle: string }> = {
  pending: { color: '#F59E0B', subtitle: 'Waiting for rider assignment' },
  preparing: { color: '#3B82F6', subtitle: 'Kitchen is preparing your order' },
  ready: { color: '#8B5CF6', subtitle: 'Order is ready for pickup by rider' },
  assigned: { color: '#14B8A6', subtitle: 'Rider assigned and heading to store' },
  picked_up: { color: '#1D4ED8', subtitle: 'Rider has picked up your order' },
  delivered: { color: '#22C55E', subtitle: 'Delivered successfully' },
};

function normalizeStatus(value: unknown): string {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, '_');
}

type Props = {
  orderId?: string | string[];
};

function StatusCard({ status }: { status: PipelineStatus }) {
  const meta = STATUS_META[status];
  return (
    <View style={[styles.card, cardShadow]}>
      <Text style={styles.sectionTitle}>Order Status</Text>
      <View style={[styles.statusBadge, { backgroundColor: `${meta.color}18` }]}>
        <Text style={[styles.statusBadgeText, { color: meta.color }]}>{STEP_LABELS[status]}</Text>
      </View>
      <Text style={styles.statusSubtitle}>{meta.subtitle}</Text>
    </View>
  );
}

function Stepper({ status, progressAnim }: { status: PipelineStatus; progressAnim: Animated.Value }) {
  const currentIndex = Math.max(0, PIPELINE.indexOf(status));
  return (
    <View style={[styles.card, cardShadow]}>
      <Text style={styles.sectionTitle}>Delivery Progress</Text>
      <View style={styles.stepperRow}>
        <Animated.View
          style={[
            styles.progressTrackActive,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
        <View style={styles.progressTrackBase} />
        {PIPELINE.map((step, index) => {
          const isDone = index < currentIndex;
          const isCurrent = index === currentIndex;
          const label = STEP_LABELS[step];
          return (
            <View key={step} style={styles.stepWrap}>
              <View
                style={[
                  styles.stepDot,
                  isDone && styles.stepDotDone,
                  isCurrent && styles.stepDotCurrent,
                ]}
              >
                <Text style={[styles.stepDotText, isDone && styles.stepDotTextDone]}>
                  {isDone ? '✓' : isCurrent ? '●' : '○'}
                </Text>
              </View>
              <Text numberOfLines={1} style={[styles.stepLabel, (isDone || isCurrent) && styles.stepLabelOn]}>
                {label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function RiderCard({
  riderId,
  riderLoc,
  pulseAnim,
}: {
  riderId: string;
  riderLoc: { lat: number; lng: number } | null;
  pulseAnim: Animated.Value;
}) {
  const hasRider = !!riderId;
  return (
    <View style={[styles.card, cardShadow]}>
      <Text style={styles.sectionTitle}>Rider</Text>
      <View style={styles.riderRow}>
        <View style={[styles.avatar, hasRider ? styles.avatarOn : styles.avatarOff]}>
          <Ionicons name="person" size={20} color={hasRider ? '#0f766e' : '#6b7280'} />
        </View>
        <View style={{ flex: 1 }}>
          {hasRider ? (
            <>
              <Text style={styles.riderTitle}>Rider assigned</Text>
              <Text style={styles.riderSub}>ID: {riderId}</Text>
              <Text style={styles.riderSub}>Phone: Available in dispatch contact</Text>
              <View style={styles.liveWrap}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>Live location active</Text>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.riderTitle}>Looking for a rider...</Text>
              <Animated.View style={{ opacity: pulseAnim }}>
                <Text style={styles.riderSub}>We are assigning the nearest rider for your order.</Text>
              </Animated.View>
              <ActivityIndicator size="small" color="#F59E0B" style={{ marginTop: 8, alignSelf: 'flex-start' }} />
            </>
          )}
        </View>
      </View>
      {riderLoc ? (
        <Text style={styles.locationText}>lat: {riderLoc.lat.toFixed(5)}  lng: {riderLoc.lng.toFixed(5)}</Text>
      ) : null}
    </View>
  );
}

export default function MobileOrderTrackingScreen({ orderId: orderIdProp }: Props) {
  const router = useRouter();
  const { authReady } = useAuth();
  const params = useLocalSearchParams<{ orderId?: string | string[] }>();
  const orderId = useMemo(() => {
    const rawValue = orderIdProp ?? params.orderId;
    const raw = Array.isArray(rawValue) ? rawValue[0] : rawValue;
    return decodeURIComponent(String(raw || '')).trim();
  }, [orderIdProp, params.orderId]);

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<OrderDoc | null>(null);
  const [listenerError, setListenerError] = useState<string | null>(null);
  const [reloadNonce, setReloadNonce] = useState(0);
  const [riderLoc, setRiderLoc] = useState<{ lat: number; lng: number } | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!orderId || !authReady) return undefined;
    setListenerError(null);
    setLoading(true);
    console.log('[TRACKING_SUBSCRIBE]', { orderIdSuffixLen: Math.min(8, orderId.length) });

    const unsub = onSnapshot(
      doc(db, 'orders', orderId),
      (snap) => {
        console.log('[TRACKING_UPDATE]', { exists: snap.exists() });
        setOrder(snap.exists() ? ({ id: snap.id, ...(snap.data() as OrderDoc) } as OrderDoc) : null);
        setLoading(false);
      },
      (err) => {
        console.error('[TRACKING_ERROR]', err);
        setListenerError('Something went wrong. Please try again.');
        setOrder(null);
        setLoading(false);
      }
    );
    return () => unsub();
  }, [orderId, authReady, reloadNonce]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 360,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 0.45, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulseAnim]);

  useEffect(() => {
    const riderId = String(order?.riderId || '').trim();
    if (!riderId) {
      setRiderLoc(null);
      return undefined;
    }
    const unsub = onSnapshot(
      doc(db, 'riders', riderId),
      (snap) => {
        const data = (snap.data() || {}) as RiderDoc;
        const lat = Number(data?.location?.lat ?? data?.lat);
        const lng = Number(data?.location?.lng ?? data?.lng);
        if (Number.isFinite(lat) && Number.isFinite(lng)) {
          setRiderLoc({ lat, lng });
        } else {
          setRiderLoc(null);
        }
      },
      (err) => {
        console.error('[TRACKING_RIDER_ERROR]', err);
        setRiderLoc(null);
      }
    );
    return () => unsub();
  }, [order?.riderId]);

  const status = useMemo<PipelineStatus>(() => {
    const normalized = normalizeStatus(order?.status);
    return (PIPELINE.includes(normalized as PipelineStatus) ? normalized : 'pending') as PipelineStatus;
  }, [order?.status]);

  useEffect(() => {
    const index = Math.max(0, PIPELINE.indexOf(status));
    const target = PIPELINE.length > 1 ? index / (PIPELINE.length - 1) : 0;
    Animated.timing(progressAnim, {
      toValue: target,
      duration: 340,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  }, [progressAnim, status]);

  if (!orderId) {
    console.error('[TRACKING] Missing orderId');
    return (
      <View style={styles.centerWrap}>
        <HeaderBar title="Order" subtitle="" showBack />
        <ErrorState
          title="Invalid order"
          subtitle="This link is missing an order reference."
          onRetry={() => router.back()}
          retryLabel="Go back"
        />
      </View>
    );
  }

  if (!authReady) {
    return (
      <View style={styles.centerWrap}>
        <ActivityIndicator size="large" color="#111827" />
      </View>
    );
  }

  if (listenerError) {
    return (
      <View style={styles.centerWrap}>
        <HeaderBar title={`Order #${orderId.slice(-8).toUpperCase()}`} subtitle="" showBack />
        <ErrorState
          title="Unable to load order"
          subtitle="Check connection or sign in again."
          onRetry={() => {
            setListenerError(null);
            setReloadNonce((n) => n + 1);
          }}
        />
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centerWrap}>
        <ActivityIndicator size="large" color="#111827" />
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.centerWrap}>
        <HeaderBar title={`Order #${orderId.slice(-8).toUpperCase()}`} subtitle="" showBack />
        <ErrorState
          title="Order not found"
          subtitle="It may have been removed or you may not have access."
          onRetry={() => router.back()}
          retryLabel="Go back"
        />
      </View>
    );
  }

  const riderId = String(order.riderId || '').trim();

  return (
    <Animated.View style={[styles.root, { opacity: fadeAnim }]}>
      <View style={styles.headerWrap}>
        <HeaderBar title={`Order #${orderId.slice(-8).toUpperCase()}`} subtitle="Live order tracking" showBack />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <StatusCard status={status} />
        <Stepper status={status} progressAnim={progressAnim} />
        <RiderCard riderId={riderId} riderLoc={riderLoc} pulseAnim={pulseAnim} />

        <View style={[styles.card, cardShadow]}>
          <Text style={styles.sectionTitle}>Map</Text>
          <View style={styles.mapPlaceholder}>
            <Ionicons name="map-outline" size={20} color="#6b7280" />
            <Text style={styles.mapText}>Live tracking will appear once rider is assigned</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.chatBtn} onPress={() => router.push(`/order-chat/${encodeURIComponent(orderId)}`)}>
          <Ionicons name="chatbubble-ellipses-outline" size={18} color="#fff" />
          <Text style={styles.chatBtnText}>Open Chat</Text>
        </TouchableOpacity>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f5f5f5' },
  headerWrap: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 2,
  },
  scroll: { padding: 16, paddingBottom: 28 },
  centerWrap: { flex: 1, backgroundColor: '#f5f5f5' },
  errorCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 20,
    alignItems: 'center',
  },
  errorTitle: { fontSize: 20, fontWeight: '800', color: '#111827', marginBottom: 14 },
  backBtn: { backgroundColor: '#111827', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10 },
  backBtnText: { color: '#fff', fontWeight: '700' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#374151',
    fontWeight: '800',
    marginBottom: 10,
    textTransform: 'uppercase',
    fontSize: 12,
    letterSpacing: 0.4,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  statusBadgeText: { fontSize: 24, fontWeight: '900' },
  statusSubtitle: { marginTop: 10, color: '#6b7280', fontSize: 14, fontWeight: '600' },
  stepperRow: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 2,
  },
  progressTrackBase: {
    position: 'absolute',
    top: 15,
    left: 12,
    right: 12,
    height: 3,
    borderRadius: 999,
    backgroundColor: '#e5e7eb',
    zIndex: 0,
  },
  progressTrackActive: {
    position: 'absolute',
    top: 15,
    left: 12,
    height: 3,
    borderRadius: 999,
    backgroundColor: '#111827',
    zIndex: 1,
  },
  stepWrap: { width: '16.2%', alignItems: 'center', zIndex: 2 },
  stepDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDotDone: { backgroundColor: '#111827', borderColor: '#111827' },
  stepDotCurrent: { backgroundColor: '#fff', borderColor: '#111827', borderWidth: 2 },
  stepDotText: { color: '#9ca3af', fontSize: 12, fontWeight: '900' },
  stepDotTextDone: { color: '#fff' },
  stepLabel: {
    marginTop: 6,
    color: '#9ca3af',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  stepLabelOn: { color: '#111827' },
  riderRow: { flexDirection: 'row', alignItems: 'flex-start' },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarOn: { backgroundColor: '#ccfbf1' },
  avatarOff: { backgroundColor: '#f3f4f6' },
  riderTitle: { fontSize: 16, fontWeight: '800', color: '#111827' },
  riderSub: { color: '#6b7280', fontSize: 13, marginTop: 3, fontWeight: '600' },
  liveWrap: { flexDirection: 'row', alignItems: 'center', marginTop: 7 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22c55e', marginRight: 6 },
  liveText: { color: '#16a34a', fontWeight: '700', fontSize: 12 },
  locationText: { marginTop: 8, color: '#374151', fontSize: 12, fontWeight: '700' },
  mapPlaceholder: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
    minHeight: 110,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  mapText: { marginTop: 8, color: '#6b7280', textAlign: 'center', fontWeight: '600' },
  chatBtn: {
    marginTop: 4,
    backgroundColor: '#111827',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  chatBtnText: { color: '#fff', fontWeight: '800', fontSize: 15 },
});
