/**
 * src/screens/TrackingScreen.tsx
 *
 * Live order tracking screen.
 * Reads from `public_tracking/{orderId}` using onSnapshot — same document
 * the admin web app writes to when it calls updateOrderStatus().
 *
 * Status flow: PENDING → CONFIRMED → PREPARING → READY → OUT_FOR_DELIVERY → DELIVERED
 */

import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, ActivityIndicator,
  Platform, StatusBar,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  subscribeOrderTracking,
  PublicOrder,
  STATUS_STEPS,
  getActiveStep,
  statusColor,
} from '../services/orderService';
import TrackingTimeline from '../components/TrackingTimeline';
import StatusBadge from '../components/StatusBadge';

export default function TrackingScreen() {
  const router = useRouter();
  const { orderId: rawId } = useLocalSearchParams<{ orderId: string }>();

  // Decode URL & strip trailing comma (matches web app behaviour)
  const orderId = decodeURIComponent(rawId ?? '').split(',')[0].trim();

  const [order,   setOrder]   = useState<PublicOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);

  useEffect(() => {
    if (!orderId) { setError(true); setLoading(false); return; }

    const unsub = subscribeOrderTracking(
      orderId,
      (data) => { setOrder(data); setError(!data); setLoading(false); },
      ()     => { setError(true); setLoading(false); }
    );
    return unsub;
  }, [orderId]);

  // ── Guard states ─────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={GREEN} />
        <Text style={styles.loadingText}>Fetching live status…</Text>
      </View>
    );
  }

  if (error || !order) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorEmoji}>🔍</Text>
        <Text style={styles.errorTitle}>Order Not Found</Text>
        <Text style={styles.errorSub}>ID: {orderId || '—'}</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const activeStep  = getActiveStep(order.status);
  const currentStep = STATUS_STEPS[activeStep];
  const accent      = statusColor(order.status);
  const shortId     = order.id.slice(-8).toUpperCase();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="light-content" />

      {/* ── Hero header ── */}
      <View style={[styles.hero, { backgroundColor: GREEN }]}>
        <TouchableOpacity style={styles.backRow} onPress={() => router.back()} activeOpacity={0.7}>
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.backLabel}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.heroTitle}>Order Status</Text>
        <Text style={styles.heroOrderId}>#{shortId} · {order.items.length} items</Text>

        {/* Big status bubble */}
        <View style={[styles.statusBubble, { backgroundColor: accent + '22', borderColor: accent + '55' }]}>
          <Text style={styles.statusEmoji}>{currentStep?.emoji ?? '📦'}</Text>
          <Text style={[styles.statusLabel, { color: accent }]}>{currentStep?.label}</Text>
          <Text style={styles.statusDesc}>{currentStep?.desc}</Text>
        </View>

        <View style={{ marginTop: 16 }}>
          <StatusBadge status={order.status} />
        </View>
      </View>

      {/* ── Progress bar ── */}
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${((activeStep) / (STATUS_STEPS.length - 1)) * 100}%` as any, backgroundColor: accent },
          ]}
        />
      </View>
      <Text style={styles.progressText}>
        Step {activeStep + 1} of {STATUS_STEPS.length}
      </Text>

      {/* ── Timeline ── */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tracking Timeline</Text>
        <TrackingTimeline status={order.status} />
      </View>

      {/* ── Order Summary ── */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Order Summary</Text>

        {order.items.map((item, i) => (
          <View key={i} style={styles.itemRow}>
            <View style={styles.qtyBadge}>
              <Text style={styles.qtyText}>{item.qty}</Text>
            </View>
            <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.itemPrice}>${((item.price ?? 0) * (item.qty ?? 1)).toFixed(2)}</Text>
          </View>
        ))}

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Paid</Text>
          <Text style={styles.totalAmount}>${order.total.toFixed(2)}</Text>
        </View>

        <View style={styles.modeRow}>
          <Text style={styles.modeLabel}>Mode</Text>
          <Text style={styles.modeValue}>
            {order.mode === 'delivery' ? '🛵 Delivery' :
             order.mode === 'pickup'   ? '🏪 Pickup'   : '🍽️ Dine-in'}
          </Text>
        </View>

        {order.paymentProofSubmitted && (
          <View style={styles.proofBadge}>
            <Text style={styles.proofText}>✅ Payment proof submitted</Text>
          </View>
        )}
      </View>

      {/* ── CTA ── */}
      <View style={styles.ctaGroup}>
        <TouchableOpacity
          style={styles.ctaSecondary}
          onPress={() => router.push('/(tabs)/orders')}
          activeOpacity={0.8}
        >
          <Text style={styles.ctaSecondaryText}>← All Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ctaPrimary}
          onPress={() => router.push('/')}
          activeOpacity={0.8}
        >
          <Text style={styles.ctaPrimaryText}>🏠 Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const GREEN = '#013220';
const PT    = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0;

const styles = StyleSheet.create({
  screen:  { flex: 1, backgroundColor: '#F8FAFC' },
  content: { paddingBottom: 48 },

  center: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#F8FAFC', padding: 32,
  },
  loadingText:  { marginTop: 16, fontSize: 14, color: '#64748B', fontWeight: '600' },
  errorEmoji:   { fontSize: 56, marginBottom: 12 },
  errorTitle:   { fontSize: 22, fontWeight: '900', color: '#0F172A', marginBottom: 6 },
  errorSub:     { fontSize: 13, color: '#94A3B8', fontWeight: '500', marginBottom: 24 },
  backBtn: {
    backgroundColor: GREEN, borderRadius: 14,
    paddingHorizontal: 24, paddingVertical: 13,
  },
  backBtnText: { color: '#FFF', fontWeight: '800', fontSize: 14 },

  hero: {
    paddingTop: PT + 56,
    paddingBottom: 36,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  backRow:    { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 24 },
  backArrow:  { color: 'rgba(255,255,255,0.7)', fontSize: 20, fontWeight: '700' },
  backLabel:  { color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: '700' },
  heroTitle:  { fontSize: 30, fontWeight: '900', color: '#FFFFFF', letterSpacing: -0.5 },
  heroOrderId:{ fontSize: 14, color: 'rgba(255,255,255,0.55)', fontWeight: '600', marginBottom: 20 },

  statusBubble: {
    borderRadius: 24, borderWidth: 1,
    padding: 20, alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  statusEmoji: { fontSize: 36, marginBottom: 8 },
  statusLabel: { fontSize: 22, fontWeight: '900', marginBottom: 4 },
  statusDesc:  { fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: '600' },

  progressBar: {
    height: 5,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 10 },
  progressText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 4,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 20,
  },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  qtyBadge: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText:   { fontSize: 13, fontWeight: '800', color: GREEN },
  itemName:  { flex: 1, fontSize: 14, fontWeight: '700', color: '#0F172A' },
  itemPrice: { fontSize: 14, fontWeight: '800', color: '#475569' },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1.5,
    borderTopColor: '#F1F5F9',
    paddingTop: 16,
    marginTop: 4,
    alignItems: 'center',
  },
  totalLabel:  { fontSize: 13, color: '#64748B', fontWeight: '700' },
  totalAmount: { fontSize: 26, fontWeight: '900', color: GREEN, letterSpacing: -0.5 },

  modeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modeLabel: { fontSize: 13, color: '#94A3B8', fontWeight: '600' },
  modeValue: { fontSize: 13, fontWeight: '700', color: '#475569' },

  proofBadge: {
    backgroundColor: '#DCFCE7',
    borderRadius: 12,
    padding: 10,
    marginTop: 14,
    alignItems: 'center',
  },
  proofText: { fontSize: 13, fontWeight: '700', color: '#16A34A' },

  ctaGroup: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 16,
    marginTop: 24,
  },
  ctaSecondary: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  ctaSecondaryText: { color: GREEN, fontWeight: '800', fontSize: 14 },
  ctaPrimary: {
    flex: 1,
    backgroundColor: GREEN,
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
  },
  ctaPrimaryText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
});
