import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/src/services/firebase';
import { useAuth } from '@/src/context/AuthContext';
import { useAppRole } from '@/src/auth/useAppRole';
import { subscribeAdminOrdersList } from '@/src/admin/services/adminOrdersService';
import type { OrderDoc } from '@/src/admin/services/orderNotificationService';
import { normalizeGrabOrderStatus, canTransition } from '@/src/domain/orderPipeline';
import { advanceGrabOrderPipeline } from '@/src/admin/services/advanceGrabPipeline';

const DARK_GREEN = '#013220';
const THEME_GREEN = '#0A8754';

async function assignRider(orderId: string, name: string, phone: string) {
  const n = name.trim();
  if (!n) throw new Error('Rider name required');
  const ts = new Date().toISOString();
  await updateDoc(doc(db, 'orders', orderId), {
    rider: {
      id: null,
      name: n,
      phone: phone.trim(),
      legStatus: 'OFFERED',
      assignedAt: ts,
      acceptedAt: null,
      pickedUpAt: null,
      deliveredAt: null,
    },
    updatedAt: ts,
  });
}

async function advanceRiderLeg(orderId: string, leg: 'accept' | 'pickup' | 'deliver') {
  const ref = doc(db, 'orders', orderId);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error('Order not found');
  const data = snap.data();
  const st = normalizeGrabOrderStatus(data);
  const rider = (data.rider || {}) as Record<string, unknown>;
  const ts = new Date().toISOString();

  if (leg === 'accept') {
    if (st !== 'READY') throw new Error('Rider accept only when READY');
    if (!canTransition(st, 'OUT_FOR_DELIVERY')) throw new Error('Invalid pipeline transition to out for delivery');
    if (rider.legStatus !== 'OFFERED') throw new Error('Assign rider first');
    await updateDoc(ref, {
      orderStatus: 'OUT_FOR_DELIVERY',
      status: 'OUT_FOR_DELIVERY',
      order_status: 'out_for_delivery',
      rider: { ...rider, legStatus: 'ACCEPTED', acceptedAt: ts },
      updatedAt: ts,
    });
    return;
  }
  if (leg === 'pickup') {
    if (st !== 'OUT_FOR_DELIVERY') throw new Error('Invalid state');
    await updateDoc(ref, {
      rider: { ...rider, legStatus: 'PICKED_UP', pickedUpAt: ts },
      updatedAt: ts,
    });
    return;
  }
  if (leg === 'deliver') {
    if (st !== 'OUT_FOR_DELIVERY') throw new Error('Invalid state');
    if (!canTransition(st, 'DELIVERED')) throw new Error('Invalid pipeline transition to delivered');
    await updateDoc(ref, {
      orderStatus: 'DELIVERED',
      status: 'DELIVERED',
      order_status: 'delivered',
      rider: { ...rider, legStatus: 'COMPLETED', deliveredAt: ts },
      updatedAt: ts,
    });
  }
}

export default function RiderDispatchScreen() {
  const insets = useSafeAreaInsets();
  const { user, profile, loading: authLoading, signOut } = useAuth();
  const role = useAppRole();
  const isAdminUser = role === 'admin';

  const [orders, setOrders] = useState<OrderDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [names, setNames] = useState<Record<string, string>>({});
  const [phones, setPhones] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isAdminUser) {
      setOrders([]);
      setLoading(false);
      return undefined;
    }
    setLoading(true);
    return subscribeAdminOrdersList(
      (list) => {
        setOrders(
          list.filter((o) => {
            const isPickup =
              (o as { orderType?: string }).orderType === 'pickup' || o.mode === 'pickup';
            if (isPickup) return false;
            const st = normalizeGrabOrderStatus(o as OrderDoc);
            return st === 'READY' || st === 'OUT_FOR_DELIVERY';
          })
        );
        setLoading(false);
      },
      () => setLoading(false)
    );
  }, [isAdminUser]);

  const run = useCallback(async (id: string, fn: () => Promise<void>) => {
    setBusyId(id);
    try {
      await fn();
    } catch (e) {
      Alert.alert('Riders', e instanceof Error ? e.message : 'Failed');
    } finally {
      setBusyId(null);
    }
  }, []);

  const data = useMemo(() => orders, [orders]);

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
        <Text style={styles.sub}>Open Admin login first.</Text>
      </View>
    );
  }

  if (!isAdminUser) {
    return (
      <View style={[styles.center, { padding: 24 }]}>
        <Text style={styles.title}>Access denied</Text>
        <Text style={styles.sub}>
          Rider dispatch requires role admin on your Firestore user document.
        </Text>
        <TouchableOpacity style={styles.outline} onPress={() => void signOut()}>
          <Text style={styles.outlineText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.flex, { paddingTop: insets.top }]}>
      <Text style={styles.header}>Riders</Text>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={THEME_GREEN} />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>Nothing to dispatch.</Text>}
          renderItem={({ item }) => {
            const id = item.id!;
            const st = normalizeGrabOrderStatus(item);
            const rider = (item as OrderDoc & { rider?: Record<string, string> }).rider || {};
            const busy = busyId === id;
            const short = id.length >= 8 ? id.slice(-8).toUpperCase() : id;

            return (
              <View style={styles.card}>
                <Text style={styles.orderId}>#{short}</Text>
                <Text style={styles.meta}>
                  {st.replace(/_/g, ' ')}
                  {rider.name ? ` · ${rider.name}` : ''}
                </Text>
                {st === 'READY' ? (
                  rider.legStatus === 'OFFERED' ? (
                    <TouchableOpacity
                      style={[styles.btn, styles.btnPurple, busy && styles.off]}
                      disabled={busy}
                      onPress={() => void run(id, () => advanceRiderLeg(id, 'accept'))}
                    >
                      <Text style={styles.btnText}>Rider accepted</Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={{ marginTop: 12, gap: 8 }}>
                      <TextInput
                        style={styles.input}
                        placeholder="Rider name"
                        value={names[id] || ''}
                        onChangeText={(t) => setNames((p) => ({ ...p, [id]: t }))}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Phone"
                        value={phones[id] || ''}
                        onChangeText={(t) => setPhones((p) => ({ ...p, [id]: t }))}
                        keyboardType="phone-pad"
                      />
                      <View style={styles.row}>
                        <TouchableOpacity
                          style={[styles.btn, busy && styles.off]}
                          disabled={busy}
                          onPress={() => void run(id, () => assignRider(id, names[id] || '', phones[id] || ''))}
                        >
                          <Text style={styles.btnText}>Assign</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.btn, styles.btnGhost, busy && styles.off]}
                          disabled={busy}
                          onPress={() =>
                            void run(id, () =>
                              advanceGrabOrderPipeline(db, item, 'OUT_FOR_DELIVERY', { actor: 'admin' })
                            )
                          }
                        >
                          <Text style={styles.btnGhostText}>No rider</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )
                ) : null}
                {st === 'OUT_FOR_DELIVERY' ? (
                  <View style={[styles.row, { marginTop: 12 }]}>
                    <TouchableOpacity
                      style={[styles.btn, styles.btnBlue, busy && styles.off]}
                      disabled={busy}
                      onPress={() => void run(id, () => advanceRiderLeg(id, 'pickup'))}
                    >
                      <Text style={styles.btnText}>Picked up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.btn, styles.btnDark, busy && styles.off]}
                      disabled={busy}
                      onPress={() => void run(id, () => advanceRiderLeg(id, 'deliver'))}
                    >
                      <Text style={styles.btnText}>Delivered</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            );
          }}
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
  sub: { marginTop: 8, color: '#64748b' },
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
  meta: { marginTop: 6, fontSize: 12, color: '#64748b', fontWeight: '700' },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontWeight: '600',
    backgroundColor: '#f8fafc',
  },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  btn: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, backgroundColor: THEME_GREEN },
  btnBlue: { backgroundColor: '#0369a1' },
  btnPurple: { backgroundColor: '#7c3aed' },
  btnDark: { backgroundColor: DARK_GREEN },
  btnGhost: { backgroundColor: '#f1f5f9', borderWidth: 1, borderColor: '#cbd5e1' },
  btnText: { color: '#fff', fontWeight: '900', fontSize: 13 },
  btnGhostText: { color: '#334155', fontWeight: '900', fontSize: 13 },
  off: { opacity: 0.4 },
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
