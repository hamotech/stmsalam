import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { db } from '@/src/services/firebase';
import { useAuth } from '@/src/context/AuthContext';
import { useAppRole } from '@/src/auth/useAppRole';
import { subscribeAdminOrdersList } from '@/src/admin/services/adminOrdersService';
import type { OrderDoc } from '@/src/admin/services/orderNotificationService';
import { normalizeGrabOrderStatus } from '@/src/domain/orderPipeline';
import { advanceGrabOrderPipeline } from '@/src/admin/services/advanceGrabPipeline';

const DARK_GREEN = '#013220';
const THEME_GREEN = '#0A8754';

function customerLabel(o: OrderDoc): string {
  const anyO = o as OrderDoc & { customerName?: string };
  return anyO.customerName?.trim() || o.customer?.name?.trim() || 'Customer';
}

export default function KitchenBoardScreen() {
  const insets = useSafeAreaInsets();
  const { user, profile, loading: authLoading, signOut } = useAuth();
  const role = useAppRole();
  const canViewBoard = role === 'admin' || role === 'kitchen';

  const [orders, setOrders] = useState<OrderDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    if (!canViewBoard) {
      setOrders([]);
      setLoading(false);
      return undefined;
    }
    setLoading(true);
    return subscribeAdminOrdersList(
      (list) => {
        setOrders(
          list.filter((o) => {
            const st = normalizeGrabOrderStatus(o as OrderDoc);
            return st === 'CONFIRMED' || st === 'PREPARING' || st === 'READY';
          })
        );
        setLoading(false);
      },
      () => setLoading(false)
    );
  }, [canViewBoard]);

  const run = useCallback(async (order: OrderDoc, next: 'PREPARING' | 'READY') => {
    const id = order.id;
    if (!id) return;
    setBusyId(id);
    try {
      await advanceGrabOrderPipeline(db, order, next, { actor: 'admin' });
    } catch (e) {
      Alert.alert('Kitchen', e instanceof Error ? e.message : 'Failed');
    } finally {
      setBusyId(null);
    }
  }, []);

  const sections = useMemo(() => {
    const buckets = { CONFIRMED: [] as OrderDoc[], PREPARING: [] as OrderDoc[], READY: [] as OrderDoc[] };
    for (const o of orders) {
      const st = normalizeGrabOrderStatus(o);
      if (st === 'CONFIRMED') buckets.CONFIRMED.push(o);
      else if (st === 'PREPARING') buckets.PREPARING.push(o);
      else if (st === 'READY') buckets.READY.push(o);
    }
    return [
      { title: 'Confirmed', data: buckets.CONFIRMED },
      { title: 'Cooking', data: buckets.PREPARING },
      { title: 'Ready', data: buckets.READY },
    ].filter((s) => s.data.length > 0);
  }, [orders]);

  if (authLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={THEME_GREEN} />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={[styles.center, { padding: 24 }]}>
        <Text style={styles.title}>Sign in</Text>
      </View>
    );
  }

  if (!canViewBoard) {
    return (
      <View style={[styles.center, { padding: 24 }]}>
        <Text style={styles.title}>Access denied</Text>
        <Text style={styles.sub}>Kitchen staff or admin role required.</Text>
        <TouchableOpacity style={styles.outline} onPress={() => void signOut()}>
          <Text style={styles.outlineText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.flex, { paddingTop: insets.top }]}>
      <Text style={styles.header}>Kitchen</Text>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={THEME_GREEN} />
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(it, i) => it.id || `k-${i}`}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionTitle}>{section.title}</Text>
          )}
          renderItem={({ item }) => {
            const st = normalizeGrabOrderStatus(item);
            const id = item.id || '';
            const busy = busyId === id;
            const short = id.length >= 8 ? id.slice(-8).toUpperCase() : id;
            return (
              <View style={styles.card}>
                <Text style={styles.orderId}>#{short}</Text>
                <Text style={styles.cust}>{customerLabel(item)}</Text>
                <View style={styles.row}>
                  {st === 'CONFIRMED' ? (
                    <TouchableOpacity
                      style={[styles.btn, busy && styles.off]}
                      disabled={busy}
                      onPress={() => void run(item, 'PREPARING')}
                    >
                      <Text style={styles.btnText}>Start cooking</Text>
                    </TouchableOpacity>
                  ) : null}
                  {st === 'PREPARING' ? (
                    <TouchableOpacity
                      style={[styles.btn, styles.btnBlue, busy && styles.off]}
                      disabled={busy}
                      onPress={() => void run(item, 'READY')}
                    >
                      <Text style={styles.btnText}>Mark ready</Text>
                    </TouchableOpacity>
                  ) : null}
                  {st === 'READY' ? (
                    <Text style={styles.hint}>Dispatch in Riders tab</Text>
                  ) : null}
                </View>
              </View>
            );
          }}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>No kitchen queue.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#f0f4f1' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 22, fontWeight: '900', color: DARK_GREEN, paddingHorizontal: 16, marginBottom: 8 },
  list: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: '900', color: DARK_GREEN },
  sub: { marginTop: 8, color: '#64748b', fontWeight: '600' },
  sectionTitle: { fontSize: 15, fontWeight: '900', color: DARK_GREEN, marginBottom: 8, marginTop: 8 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
      android: { elevation: 2 },
    }),
  },
  orderId: { fontSize: 16, fontWeight: '900', color: DARK_GREEN },
  cust: { marginTop: 4, fontWeight: '700', color: '#334155' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  btn: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, backgroundColor: THEME_GREEN },
  btnBlue: { backgroundColor: '#0369a1' },
  btnText: { color: '#fff', fontWeight: '900', fontSize: 13 },
  off: { opacity: 0.4 },
  hint: { fontSize: 12, color: '#075985', fontWeight: '800' },
  empty: { textAlign: 'center', color: '#94a3b8', marginTop: 24, fontWeight: '600' },
  outline: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: THEME_GREEN,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  outlineText: { color: THEME_GREEN, fontWeight: '900', textAlign: 'center' },
});
