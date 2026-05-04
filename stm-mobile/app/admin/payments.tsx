import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/src/services/firebase';
import { useAuth } from '@/src/context/AuthContext';
import { useAppRole } from '@/src/auth/useAppRole';
import { mapFirestoreOrderToPaymentOrder, type PaymentOrder } from '@/src/models/paymentOrder';

const GREEN = '#013220';

export default function AdminPaymentsScreen() {
  const { loading: authLoading } = useAuth();
  const role = useAppRole();
  const allowed = role === 'admin';
  const [orders, setOrders] = useState<PaymentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!allowed) {
      setLoading(false);
      return undefined;
    }
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setOrders(snap.docs.map((d) => mapFirestoreOrderToPaymentOrder(d.id, d.data())));
      setLoading(false);
    });
    return unsub;
  }, [allowed]);

  if (authLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={GREEN} />
      </View>
    );
  }

  if (!allowed) {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>Admin only (Firestore user document with role admin).</Text>
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
    <FlatList
      data={orders.slice(0, 60)}
      keyExtractor={(item) => item.orderId}
      contentContainerStyle={styles.list}
      ListHeaderComponent={<Text style={styles.header}>Recent payments</Text>}
      renderItem={({ item }) => {
        const flag = item.paymentMethod === 'qr' && item.paymentStatus !== 'PAID' ? 'QR verify' : '';
        return (
          <View style={styles.card}>
            <Text style={styles.id}>#{item.orderId.slice(-8).toUpperCase()}</Text>
            <Text style={styles.line}>
              {item.paymentMethod} · {item.paymentStatus} · {item.orderStatus}
            </Text>
            {flag ? <Text style={styles.flag}>{flag}</Text> : null}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  muted: { color: '#64748b', fontWeight: '600' },
  list: { padding: 16, paddingBottom: 40 },
  header: { fontSize: 20, fontWeight: '900', color: GREEN, marginBottom: 12 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  id: { fontWeight: '900', color: GREEN, fontSize: 15 },
  line: { marginTop: 6, color: '#475569', fontWeight: '600', fontSize: 13 },
  flag: { marginTop: 8, color: '#c2410c', fontWeight: '800', fontSize: 12 },
});
