/**
 * src/screens/HomeScreen.tsx
 *
 * Simple dashboard — shows the brand hero, quick stats pulled live from Firestore,
 * and a search bar to jump directly to an order by ID.
 */

import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TextInput, TouchableOpacity, ActivityIndicator,
  Platform, StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { subscribeRecentOrders, PublicOrder } from '../services/orderService';

// ── Quick-stat card ───────────────────────────────────────────────────────────

function StatCard({ emoji, value, label }: { emoji: string; value: string | number; label: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const router = useRouter();
  const [orderId, setOrderId]   = useState('');
  const [orders,  setOrders]    = useState<PublicOrder[]>([]);
  const [loading, setLoading]   = useState(true);

  // Live stats from the same Firestore collection
  useEffect(() => {
    const unsub = subscribeRecentOrders((data) => {
      setOrders(data);
      setLoading(false);
    });
    return unsub;
  }, []);

  const activeOrders    = orders.filter(o => o.status !== 'DELIVERED').length;
  const deliveredToday  = orders.filter(o => o.status === 'DELIVERED').length;
  const totalRevenue    = orders.reduce((s, o) => s + (o.total ?? 0), 0);

  const handleTrack = () => {
    const clean = orderId.trim();
    if (!clean) return;
    router.push(`/tracking/${encodeURIComponent(clean)}`);
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="light-content" />

      {/* ── Hero ── */}
      <View style={styles.hero}>
        <View style={styles.heroInner}>
          <Text style={styles.heroFlag}>🇸🇬</Text>
          <Text style={styles.heroTitle}>STM Salam</Text>
          <Text style={styles.heroSub}>Teh Tarik &amp; Kebab</Text>
          <View style={styles.heroTagRow}>
            <Text style={styles.heroTag}>Halal  ✓</Text>
            <Text style={styles.heroTag}>Live Tracking  ✓</Text>
          </View>
        </View>
      </View>

      {/* ── Track by Order ID ── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Track Your Order</Text>
        <Text style={styles.sectionSub}>Enter your Order ID to see live status</Text>

        <View style={styles.searchRow}>
          <TextInput
            style={styles.input}
            placeholder="e.g. STM-1713600000000"
            placeholderTextColor="#94A3B8"
            value={orderId}
            onChangeText={setOrderId}
            returnKeyType="search"
            onSubmitEditing={handleTrack}
            autoCapitalize="characters"
          />
          <TouchableOpacity
            style={[styles.searchBtn, !orderId.trim() && styles.searchBtnDisabled]}
            onPress={handleTrack}
            disabled={!orderId.trim()}
            activeOpacity={0.8}
          >
            <Text style={styles.searchBtnText}>→</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Live Stats ── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Dashboard</Text>
        {loading ? (
          <ActivityIndicator color={GREEN} style={{ marginTop: 16 }} />
        ) : (
          <View style={styles.statsRow}>
            <StatCard emoji="🔥" value={activeOrders}             label="Active Orders"   />
            <StatCard emoji="✅" value={deliveredToday}            label="Delivered Today" />
            <StatCard emoji="💰" value={`$${totalRevenue.toFixed(0)}`} label="Revenue"   />
          </View>
        )}
      </View>

      {/* ── Recent Orders ── */}
      {!loading && orders.length > 0 && (
        <View style={styles.section}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/orders')}>
              <Text style={styles.viewAll}>View all →</Text>
            </TouchableOpacity>
          </View>

          {orders.slice(0, 3).map(order => (
            <TouchableOpacity
              key={order.id}
              style={styles.recentRow}
              onPress={() => router.push(`/tracking/${encodeURIComponent(order.id)}`)}
              activeOpacity={0.75}
            >
              <View style={styles.recentLeft}>
                <Text style={styles.recentId}>#{order.id.slice(-8).toUpperCase()}</Text>
                <Text style={styles.recentItems}>{order.items.length} items · ${order.total.toFixed(2)}</Text>
              </View>
              <View style={[styles.recentBadge, { backgroundColor: statusBg(order.status) }]}>
                <Text style={[styles.recentBadgeText, { color: statusFg(order.status) }]}>
                  {order.status}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* ── CTA ── */}
      <View style={[styles.section, { marginBottom: 40 }]}>
        <TouchableOpacity
          style={styles.ctaBtn}
          onPress={() => router.push('/(tabs)/orders')}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaBtnText}>View All Orders</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// ── Tiny helpers ──────────────────────────────────────────────────────────────

const statusBg = (s: string) => {
  const m: Record<string, string> = {
    PENDING: '#FEF3C7', CONFIRMED: '#EFF6FF', PREPARING: '#F5F3FF',
    READY: '#ECFDF5', OUT_FOR_DELIVERY: '#E0F2FE', DELIVERED: '#DCFCE7',
  };
  return m[s?.toUpperCase()] ?? '#F8FAFC';
};

const statusFg = (s: string) => {
  const m: Record<string, string> = {
    PENDING: '#D97706', CONFIRMED: '#2563EB', PREPARING: '#7C3AED',
    READY: '#059669', OUT_FOR_DELIVERY: '#0284C7', DELIVERED: '#16A34A',
  };
  return m[s?.toUpperCase()] ?? '#64748B';
};

// ── Styles ────────────────────────────────────────────────────────────────────

const GREEN = '#013220';
const GOLD  = '#D4AF37';
const PT    = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { paddingBottom: 40 },

  hero: {
    backgroundColor: GREEN,
    paddingTop: PT + 56,
    paddingBottom: 48,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    overflow: 'hidden',
  },
  heroInner: { alignItems: 'center', paddingHorizontal: 24 },
  heroFlag:  { fontSize: 44, marginBottom: 8 },
  heroTitle: { fontSize: 36, fontWeight: '900', color: '#FFFFFF', letterSpacing: -1 },
  heroSub:   { fontSize: 16, color: 'rgba(255,255,255,0.65)', fontWeight: '600', marginTop: 4 },
  heroTagRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
  heroTag: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 100,
    paddingHorizontal: 14,
    paddingVertical: 5,
    color: GOLD,
    fontSize: 12,
    fontWeight: '700',
  },

  section: { paddingHorizontal: 20, marginTop: 28 },
  sectionTitle: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginBottom: 4 },
  sectionSub:   { fontSize: 13, color: '#64748B', fontWeight: '500', marginBottom: 14 },
  rowBetween:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  viewAll:      { fontSize: 13, color: GREEN, fontWeight: '700' },

  searchRow: { flexDirection: 'row', gap: 10 },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  searchBtn: {
    backgroundColor: GREEN,
    borderRadius: 16,
    width: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBtnDisabled: { backgroundColor: '#CBD5E1' },
  searchBtnText:     { color: '#FFF', fontSize: 20, fontWeight: '900' },

  statsRow: { flexDirection: 'row', gap: 12 },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  statEmoji: { fontSize: 22, marginBottom: 6 },
  statValue: { fontSize: 20, fontWeight: '900', color: GREEN },
  statLabel: { fontSize: 10, color: '#94A3B8', fontWeight: '700', marginTop: 2, textAlign: 'center' },

  recentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  recentLeft:        { gap: 3 },
  recentId:          { fontSize: 14, fontWeight: '900', color: '#0F172A' },
  recentItems:       { fontSize: 12, color: '#64748B', fontWeight: '600' },
  recentBadge:       { borderRadius: 100, paddingHorizontal: 10, paddingVertical: 4 },
  recentBadgeText:   { fontSize: 10, fontWeight: '800', letterSpacing: 0.3 },

  ctaBtn: {
    backgroundColor: GREEN,
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: GREEN,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 5,
  },
  ctaBtnText: { color: '#FFFFFF', fontWeight: '900', fontSize: 16, letterSpacing: 0.3 },
});
