/**
 * // UPDATED — Forward-only pipeline, confirm dialog, dispatch messages from notificationService.
 */

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
import type { GrabOrderStatus } from '@/src/services/grabFlowOrderService';
import {
  normalizeGrabOrderStatus,
  canTransitionTo,
  paymentAllowsConfirm,
} from '@/src/domain/orderPipeline';
import { advanceGrabOrderPipeline } from '@/src/admin/services/advanceGrabPipeline';
import {
  requestCustomerPushDispatch,
  getDispatchMessageForOrderStatus,
} from '@/src/utils/notificationService';

const DARK_GREEN = '#013220';
const THEME_GREEN = '#0A8754';

/** Next pipeline targets shown as step buttons (after the order is accepted). */
const ADMIN_ACTIONS: GrabOrderStatus[] = [
  'PREPARING',
  'READY',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
];

type BoardBucket = 'pending' | 'cooking' | 'ready' | 'delivered' | 'cancelled';

function boardBucket(st: GrabOrderStatus): BoardBucket {
  if (st === 'CANCELLED') return 'cancelled';
  if (st === 'PLACED' || st === 'CONFIRMED') return 'pending';
  if (st === 'PREPARING') return 'cooking';
  if (st === 'READY') return 'ready';
  if (st === 'OUT_FOR_DELIVERY' || st === 'DELIVERED') return 'delivered';
  return 'pending';
}

const BOARD_LABEL: Record<BoardBucket, string> = {
  pending: 'Pending',
  cooking: 'Cooking',
  ready: 'Ready',
  delivered: 'Delivered / on the way',
  cancelled: 'Rejected / cancelled',
};

function isGrabOrder(o: OrderDoc): boolean {
  const anyO = o as OrderDoc & { flow?: string };
  return anyO.flow === 'grab';
}

function grabOrderStatus(o: OrderDoc): GrabOrderStatus {
  return normalizeGrabOrderStatus(o as OrderDoc & { orderStatus?: string; status?: string });
}

function customerLabel(o: OrderDoc): string {
  const anyO = o as OrderDoc & { customerName?: string };
  return (
    anyO.customerName?.trim() ||
    o.customer?.name?.trim() ||
    'Customer'
  );
}

export default function OrderManagementScreen() {
  const insets = useSafeAreaInsets();
  const { user, profile, loading: authLoading, signOut } = useAuth();
  const role = useAppRole();
  const isAdminUser = role === 'admin';

  const [orders, setOrders] = useState<OrderDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdminUser) {
      setOrders([]);
      setLoading(false);
      return undefined;
    }
    setLoading(true);
    return subscribeAdminOrdersList(
      (list) => {
        setOrders(list.filter(isGrabOrder));
        setLoading(false);
      },
      () => setLoading(false)
    );
  }, [isAdminUser]);

  const runAdvance = useCallback(async (order: OrderDoc, next: GrabOrderStatus) => {
    const id = order.id;
    if (!id) return;
    setBusyId(id);
    try {
      await advanceGrabOrderPipeline(db, order, next, { actor: 'admin' });
      const uid = String((order as OrderDoc & { userId?: string }).userId ?? '');
      const message = getDispatchMessageForOrderStatus(next);
      if (uid && uid !== 'anonymous') {
        await requestCustomerPushDispatch({
          userId: uid,
          orderId: id,
          orderStatus: next,
          message,
        });
      }
    } catch (e) {
      console.error('[OrderManagementScreen]', e);
      Alert.alert('Update', e instanceof Error ? e.message : 'Failed');
    } finally {
      setBusyId(null);
    }
  }, []);

  const confirmAndAdvance = useCallback(
    (order: OrderDoc, next: GrabOrderStatus) => {
      const id = order.id;
      if (!id) return;
      const st = grabOrderStatus(order);
      if (next === 'CONFIRMED' && st === 'PLACED') {
        const gate = paymentAllowsConfirm(order as OrderDoc & Record<string, unknown>);
        if (!gate.ok) {
          Alert.alert('Payment', gate.reason);
          return;
        }
      }
      if (!canTransitionTo(st, next)) {
        return;
      }
      Alert.alert(
        'Update order',
        `Move order #${id.slice(-8).toUpperCase()} to ${next.replace(/_/g, ' ')}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Confirm',
            style: 'default',
            onPress: () => void runAdvance(order, next),
          },
        ]
      );
    },
    [runAdvance]
  );

  const sections = useMemo(() => {
    const buckets: Record<BoardBucket, OrderDoc[]> = {
      pending: [],
      cooking: [],
      ready: [],
      delivered: [],
      cancelled: [],
    };
    for (const o of orders) {
      buckets[boardBucket(grabOrderStatus(o))].push(o);
    }
    const orderBuckets: BoardBucket[] = ['pending', 'cooking', 'ready', 'delivered', 'cancelled'];
    return orderBuckets
      .filter((key) => buckets[key].length > 0)
      .map((key) => ({
        title: BOARD_LABEL[key],
        data: buckets[key],
      }));
  }, [orders]);

  const renderItem = useCallback(
    ({ item }: { item: OrderDoc }) => {
      const id = item.id || '';
      const short = id.length >= 8 ? id.slice(-8).toUpperCase() : id;
      const st = grabOrderStatus(item);
      const payment = String(
        (item as OrderDoc & { paymentStatus?: string }).paymentStatus ?? '—'
      );
      const busy = busyId === id;
      const delivered = st === 'DELIVERED';
      const cancelled = st === 'CANCELLED';
      const isPlaced = st === 'PLACED';

      return (
        <View style={styles.card}>
          <Text style={styles.orderId}>#{short}</Text>
          <Text style={styles.cust}>{customerLabel(item)}</Text>
          <Text style={styles.meta}>
            {st.replace(/_/g, ' ')} · {payment.replace(/_/g, ' ')}
          </Text>
          {isPlaced ? (
            <View style={styles.row}>
              <TouchableOpacity
                style={[styles.acceptBtn, busy && styles.miniBtnOff]}
                disabled={busy}
                onPress={() => confirmAndAdvance(item, 'CONFIRMED')}
              >
                <Text style={styles.acceptBtnText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.rejectBtn, busy && styles.miniBtnOff]}
                disabled={busy}
                onPress={() => confirmAndAdvance(item, 'CANCELLED')}
              >
                <Text style={styles.rejectBtnText}>Reject</Text>
              </TouchableOpacity>
            </View>
          ) : null}
          {!isPlaced && !cancelled ? (
            <View style={styles.row}>
              {ADMIN_ACTIONS.map((next) => {
                const allowed = !delivered && !busy && canTransitionTo(st, next);
                return (
                  <TouchableOpacity
                    key={next}
                    style={[styles.miniBtn, !allowed && styles.miniBtnOff]}
                    disabled={!allowed}
                    onPress={() => confirmAndAdvance(item, next)}
                  >
                    <Text style={styles.miniBtnText}>{next.replace(/_/g, ' ')}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
          {cancelled ? (
            <Text style={styles.cancelledHint}>No further actions</Text>
          ) : null}
          {busy ? <ActivityIndicator color={THEME_GREEN} style={{ marginTop: 8 }} /> : null}
        </View>
      );
    },
    [busyId, confirmAndAdvance]
  );

  const listHeader = useMemo(
    () => (
      <View style={{ marginBottom: 12 }}>
        <Text style={styles.title}>Kitchen board</Text>
        <Text style={styles.sub}>New orders: accept or reject · then advance the pipeline</Text>
      </View>
    ),
    []
  );

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
        <Text style={styles.sub}>Open Admin from the kitchen dashboard first.</Text>
      </View>
    );
  }

  if (!isAdminUser) {
    return (
      <View style={[styles.center, { padding: 24 }]}>
        <Text style={styles.title}>Access denied</Text>
        <Text style={styles.sub}>
          Order management requires role admin on your Firestore user document.
        </Text>
        <TouchableOpacity style={styles.outline} onPress={() => void signOut()}>
          <Text style={styles.outlineText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.flex, { paddingTop: insets.top }]}>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={THEME_GREEN} />
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(it, i) => it.id || `g-${i}`}
          renderItem={renderItem}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionTitle}>{section.title}</Text>
          )}
          ListHeaderComponent={listHeader}
          contentContainerStyle={styles.list}
          stickySectionHeadersEnabled={false}
          ListEmptyComponent={
            <Text style={styles.empty}>No Grab flow orders yet.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#f0f4f1' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: '900', color: DARK_GREEN },
  sub: { marginTop: 6, fontSize: 14, color: '#64748b', fontWeight: '600', lineHeight: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: { elevation: 2 },
    }),
  },
  orderId: { fontSize: 16, fontWeight: '900', color: DARK_GREEN },
  cust: { marginTop: 4, fontWeight: '700', color: '#334155' },
  meta: { marginTop: 4, fontSize: 12, color: '#64748b', fontWeight: '600' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  miniBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: THEME_GREEN,
  },
  miniBtnOff: { opacity: 0.35 },
  miniBtnText: { color: '#fff', fontWeight: '900', fontSize: 11 },
  acceptBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: THEME_GREEN,
    alignItems: 'center',
  },
  acceptBtnText: { color: '#fff', fontWeight: '900', fontSize: 13 },
  rejectBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fee2e2',
    borderWidth: 1,
    borderColor: '#fecaca',
    alignItems: 'center',
  },
  rejectBtnText: { color: '#b91c1c', fontWeight: '900', fontSize: 13 },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: DARK_GREEN,
    marginTop: 8,
    marginBottom: 8,
  },
  cancelledHint: { marginTop: 10, fontSize: 12, color: '#94a3b8', fontWeight: '600' },
  empty: { textAlign: 'center', color: '#94a3b8', fontWeight: '600', marginTop: 24 },
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
