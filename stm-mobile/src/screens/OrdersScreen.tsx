/**
 * src/screens/OrdersScreen.tsx
 *
 * Real-time list of all orders from `public_tracking`.
 * Customer can filter by status and tap→navigate to the Tracking screen.
 */

import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  TouchableOpacity, ActivityIndicator,
  Platform, StatusBar, TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { subscribeRecentOrders, PublicOrder, OrderStatus } from '../services/orderService';
import OrderCard from '../components/OrderCard';

const FILTERS: { label: string; value: string }[] = [
  { label: 'All',       value: 'ALL'           },
  { label: '🔥 Active', value: 'ACTIVE'        },
  { label: '✅ Done',   value: 'DELIVERED'      },
  { label: '⏳ Pending',value: 'PENDING'        },
];

export default function OrdersScreen() {
  const router = useRouter();
  const [orders,  setOrders]  = useState<PublicOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter,  setFilter]  = useState('ALL');
  const [search,  setSearch]  = useState('');

  useEffect(() => {
    const unsub = subscribeRecentOrders((data) => {
      setOrders(data);
      setLoading(false);
    });
    return unsub;
  }, []);

  const filtered = orders.filter(o => {
    const matchStatus =
      filter === 'ALL'     ? true :
      filter === 'ACTIVE'  ? o.status !== 'DELIVERED' :
      o.status === filter;

    const matchSearch = search.trim()
      ? o.id.toLowerCase().includes(search.trim().toLowerCase())
      : true;

    return matchStatus && matchSearch;
  });

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Orders</Text>
        <Text style={styles.headerSub}>Live real-time sync</Text>

        {/* Search */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Order ID…"
          placeholderTextColor="rgba(255,255,255,0.45)"
          value={search}
          onChangeText={setSearch}
          autoCapitalize="characters"
        />

        {/* Filter chips */}
        <View style={styles.filtersRow}>
          {FILTERS.map(f => (
            <TouchableOpacity
              key={f.value}
              style={[styles.chip, filter === f.value && styles.chipActive]}
              onPress={() => setFilter(f.value)}
              activeOpacity={0.75}
            >
              <Text style={[styles.chipText, filter === f.value && styles.chipTextActive]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ── List ── */}
      {loading ? (
        <ActivityIndicator color={GREEN} style={{ marginTop: 48 }} size="large" />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={o => o.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyEmoji}>📭</Text>
              <Text style={styles.emptyTitle}>No orders found</Text>
              <Text style={styles.emptySub}>Try changing the filter or search term</Text>
            </View>
          }
          renderItem={({ item }) => (
            <OrderCard
              order={item}
              onTrack={(id) => router.push(`/tracking/${encodeURIComponent(id)}`)}
            />
          )}
        />
      )}
    </View>
  );
}

const GREEN = '#013220';
const PT    = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },

  header: {
    backgroundColor: GREEN,
    paddingTop: PT + 56,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTitle: { fontSize: 30, fontWeight: '900', color: '#FFFFFF', letterSpacing: -0.5 },
  headerSub:   { fontSize: 13, color: 'rgba(255,255,255,0.55)', fontWeight: '600', marginBottom: 16 },

  searchInput: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 11,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },

  filtersRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  chipActive:     { backgroundColor: '#D4AF37', borderColor: '#D4AF37' },
  chipText:       { fontSize: 12, fontWeight: '700', color: 'rgba(255,255,255,0.7)' },
  chipTextActive: { color: GREEN },

  list: { padding: 16, paddingBottom: 40 },

  empty: { alignItems: 'center', paddingTop: 60 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '900', color: '#475569', marginBottom: 6 },
  emptySub:   { fontSize: 13, color: '#94A3B8', fontWeight: '500' },
});
