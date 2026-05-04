import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { navReplace } from '@/src/navigation/appNavigation';
import { useAppRole } from '@/src/auth/useAppRole';
import { useAuth } from '@/src/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { subscribeAdminOrdersList } from '@/src/admin/services/adminOrdersService';
import { shareOrderBillPdf } from '@/src/admin/services/billPdfShare';
import type { OrderDoc } from '@/src/admin/services/orderNotificationService';

const GREEN = '#013220';
const GOLD = '#D4AF37';

export default function AdminOrdersScreen() {
  const router = useRouter();
  const { loading: authLoading } = useAuth();
  const role = useAppRole();
  const allowed = role === 'admin';
  const [orders, setOrders] = useState<OrderDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [sharingId, setSharingId] = useState<string | null>(null);

  useEffect(() => {
    if (!allowed) {
      setLoading(false);
      return undefined;
    }
    const unsub = subscribeAdminOrdersList(
      (list) => {
        setOrders(list);
        setLoading(false);
      },
      () => setLoading(false)
    );
    return unsub;
  }, [allowed]);

  if (authLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={GREEN} />
      </View>
    );
  }

  const onShareBill = async (order: OrderDoc) => {
    setSharingId(order.id);
    try {
      await shareOrderBillPdf(order);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Could not create PDF';
      Alert.alert('Share bill', msg);
    } finally {
      setSharingId(null);
    }
  };

  if (!allowed) {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>
          This list is for admin accounts only (Firestore role admin).
        </Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navReplace(router, { kind: 'admin' }, role)}
        >
          <Text style={styles.btnText}>Go to admin</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={GREEN} />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>No orders yet.</Text>
        }
        renderItem={({ item }) => {
          const short = item.id?.slice(-8).toUpperCase() ?? '—';
          const total = parseFloat(String(item.total ?? 0));
          const busy = sharingId === item.id;
          return (
            <View style={styles.card}>
              <View style={styles.rowTop}>
                <View>
                  <Text style={styles.orderId}>#{short}</Text>
                  <Text style={styles.name}>{item.customer?.name || 'Customer'}</Text>
                  <Text style={styles.meta}>
                    {item.mode || '—'} · ${Number.isFinite(total) ? total.toFixed(2) : '0.00'}
                  </Text>
                </View>
                <Text style={styles.status}>{String(item.status || 'PENDING')}</Text>
              </View>
              <TouchableOpacity
                style={[styles.shareBtn, busy && styles.shareBtnOff]}
                onPress={() => onShareBill(item)}
                disabled={busy}
                activeOpacity={0.9}
              >
                {busy ? (
                  <ActivityIndicator color={GREEN} size="small" />
                ) : (
                  <>
                    <Ionicons name="share-outline" size={20} color={GREEN} />
                    <Text style={styles.shareBtnText}>Print / Share bill</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f8fafc' },
  list: { padding: 16, paddingBottom: 40 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#f8fafc' },
  muted: { color: '#64748b', textAlign: 'center', fontWeight: '600', marginBottom: 16 },
  btn: { backgroundColor: GREEN, paddingHorizontal: 24, paddingVertical: 14, borderRadius: 14 },
  btnText: { color: '#fff', fontWeight: '900' },
  empty: { textAlign: 'center', color: '#94a3b8', marginTop: 40, fontWeight: '700' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  orderId: { fontSize: 16, fontWeight: '900', color: GREEN },
  name: { fontSize: 14, fontWeight: '800', color: '#0f172a', marginTop: 4 },
  meta: { fontSize: 12, color: '#64748b', fontWeight: '600', marginTop: 4 },
  status: { fontSize: 11, fontWeight: '900', color: GOLD, alignSelf: 'flex-start' },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(212, 175, 55, 0.25)',
    borderWidth: 2,
    borderColor: GOLD,
    borderRadius: 14,
    paddingVertical: 12,
  },
  shareBtnOff: { opacity: 0.7 },
  shareBtnText: { color: GREEN, fontWeight: '900', fontSize: 15 },
});
