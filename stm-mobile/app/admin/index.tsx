import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
  StatusBar,
  FlatList,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { navPush, type AppNavIntent } from '@/src/navigation/appNavigation';
import { useAppRole } from '@/src/auth/useAppRole';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/src/services/firebase';
import { useAuth } from '@/src/context/AuthContext';
import {
  ensureNotificationPermissions,
  type OrderDoc,
} from '@/src/admin/services/orderNotificationService';
import { normalizeGrabOrderStatus, nextPipelineStep } from '@/src/domain/orderPipeline';
import { advanceGrabOrderPipeline } from '@/src/admin/services/advanceGrabPipeline';
import type { GrabOrderStatus } from '@/src/services/grabFlowOrderService';
import { isAdminAuthBypassEnabled } from '@/src/bootstrap/appMode';

const THEME_GREEN = '#0A8754';
const DARK_GREEN = '#013220';
type FilterTab = 'ALL' | 'PENDING' | 'PREPARING' | 'DELIVERED';

type ActivityItem = { id: string; text: string; at: number };

function normalizeStatus(raw: unknown): string {
  return String(raw ?? 'PENDING')
    .trim()
    .toUpperCase()
    .replace(/-/g, '_')
    .replace(/\s+/g, '_');
}

function orderCreatedDate(order: OrderDoc): Date {
  const c = order.createdAt;
  if (c && typeof c === 'object' && 'toDate' in c && typeof (c as { toDate: () => Date }).toDate === 'function') {
    try {
      return (c as { toDate: () => Date }).toDate();
    } catch {
      /* fall through */
    }
  }
  if (typeof c === 'string') {
    const d = new Date(c);
    return Number.isNaN(d.getTime()) ? new Date(0) : d;
  }
  return new Date(0);
}

function isSameCalendarDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function customerLabel(order: OrderDoc): string {
  const anyO = order as OrderDoc & { customerName?: string };
  return (
    anyO.customerName?.trim() ||
    order.customer?.name?.trim() ||
    'Customer'
  );
}

function itemsSummary(order: OrderDoc, max = 3): string {
  const items = Array.isArray(order.items) ? order.items : [];
  if (items.length === 0) return '—';
  const parts = items.slice(0, max).map((i) => {
    const n = i?.name ?? 'Item';
    const q = Number(i?.qty ?? 1);
    return `${n}${q > 1 ? ` ×${q}` : ''}`;
  });
  const more = items.length > max ? ` +${items.length - max}` : '';
  return parts.join(', ') + more;
}

function parseTotal(order: OrderDoc): number {
  const n = parseFloat(String(order.total ?? order.subtotal ?? 0));
  return Number.isFinite(n) ? n : 0;
}

function statusBadgeMeta(status: string): { label: string; emoji: string; bg: string } {
  const s = normalizeStatus(status);
  const map: Record<string, { label: string; emoji: string; bg: string }> = {
    PENDING: { label: 'Pending', emoji: '🟡', bg: '#FEF3C7' },
    CONFIRMED: { label: 'Pending', emoji: '🟡', bg: '#FEF3C7' },
    PREPARING: { label: 'Preparing', emoji: '🔵', bg: '#DBEAFE' },
    READY: { label: 'Preparing', emoji: '🔵', bg: '#DBEAFE' },
    OUT_FOR_DELIVERY: { label: 'Out for Delivery', emoji: '🟠', bg: '#FFEDD5' },
    DELIVERING: { label: 'Out for Delivery', emoji: '🟠', bg: '#FFEDD5' },
    DELIVERED: { label: 'Delivered', emoji: '🟢', bg: '#DCFCE7' },
    CANCELLED: { label: 'Cancelled', emoji: '❌', bg: '#FEE2E2' },
  };
  return map[s] ?? { label: s || 'Unknown', emoji: '⚪', bg: '#F1F5F9' };
}

function filterMatches(tab: FilterTab, order: OrderDoc): boolean {
  const s = normalizeGrabOrderStatus(order);
  if (tab === 'ALL') return true;
  if (tab === 'PENDING') return s === 'PLACED' || s === 'CONFIRMED';
  if (tab === 'PREPARING') {
    return s === 'PREPARING' || s === 'READY' || s === 'OUT_FOR_DELIVERY';
  }
  if (tab === 'DELIVERED') return s === 'DELIVERED';
  return true;
}

export default function AdminEntryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { user, profile, signOut } = useAuth();
  const role = useAppRole();
  const authBypass = isAdminAuthBypassEnabled();
  /** Dev bypass: preview dashboard UI without sign-in (Firestore rules unchanged). */
  const showAdminDashboard = authBypass || (Boolean(user) && role === 'admin');
  const roleForNav = authBypass ? ('admin' as const) : role;

  const cardGap = 12;
  const statCardWidth = (width - 40 - cardGap) / 2;

  const [busy, setBusy] = useState(false);

  const [orders, setOrders] = useState<OrderDoc[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [filter, setFilter] = useState<FilterTab>('ALL');
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!showAdminDashboard) {
      setOrders([]);
      setOrdersLoading(false);
      return undefined;
    }
    setOrdersLoading(true);
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() } as OrderDoc)));
        setOrdersLoading(false);
      },
      (err) => {
        console.error('[admin dashboard]', err);
        setOrdersLoading(false);
        Alert.alert('Orders', err.message || 'Could not load orders.');
      }
    );
    return unsub;
  }, [showAdminDashboard]);

  const today = useMemo(() => new Date(), [orders]);

  const stats = useMemo(() => {
    let active = 0;
    let deliveredToday = 0;
    let revenueToday = 0;
    let cancelled = 0;

    for (const o of orders) {
      const s = normalizeGrabOrderStatus(o);
      const d = orderCreatedDate(o);
      const t = parseTotal(o);

      if (s !== 'DELIVERED' && s !== 'CANCELLED') active += 1;
      if (s === 'DELIVERED' && isSameCalendarDay(d, today)) deliveredToday += 1;
      if (isSameCalendarDay(d, today)) revenueToday += t;
      if (s === 'CANCELLED') cancelled += 1;
    }

    return { active, deliveredToday, revenueToday, cancelled };
  }, [orders, today]);

  const filteredOrders = useMemo(
    () => orders.filter((o) => filterMatches(filter, o)),
    [orders, filter]
  );

  const pushActivity = useCallback((text: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setActivity((prev) => [{ id, text, at: Date.now() }, ...prev].slice(0, 25));
  }, []);

  const runStatusUpdate = useCallback(
    async (order: OrderDoc, next: GrabOrderStatus, actionLabel: string) => {
      const oid = order.id;
      if (!oid) return;
      setUpdatingIds((prev) => new Set(prev).add(oid));
      try {
        await advanceGrabOrderPipeline(db, order, next, { actor: 'admin' });
        const short = oid.length >= 8 ? oid.slice(-8).toUpperCase() : oid;
        pushActivity(`${actionLabel} · #${short}`);
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Update failed';
        Alert.alert('Order', msg);
      } finally {
        setUpdatingIds((prev) => {
          const n = new Set(prev);
          n.delete(oid);
          return n;
        });
      }
    },
    [pushActivity]
  );

  const onSignOut = async () => {
    setBusy(true);
    try {
      await signOut();
    } finally {
      setBusy(false);
    }
  };

  const renderOrder = useCallback(
    ({ item }: { item: OrderDoc }) => {
      const oid = item.id || '';
      const short = oid.length >= 8 ? oid.slice(-8).toUpperCase() : oid || '—';
      const st = normalizeGrabOrderStatus(item);
      const legacyForBadge = st === 'PLACED' ? 'PENDING' : st;
      const badge = statusBadgeMeta(legacyForBadge);
      const busyRow = updatingIds.has(oid);
      const next = nextPipelineStep(st);
      const isPlaced = st === 'PLACED';
      const terminal = st === 'DELIVERED' || st === 'CANCELLED';
      const fulfil =
        (item as { orderType?: string }).orderType === 'pickup' || item.mode === 'pickup'
          ? 'Pickup'
          : 'Delivery';

      return (
        <View style={styles.orderCard}>
          <View style={styles.orderTop}>
            <View>
              <Text style={styles.orderId}>#{short}</Text>
              <Text style={styles.orderFulfil}>{fulfil}</Text>
              <Text style={styles.customerName}>{customerLabel(item)}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: badge.bg }]}>
              <Text style={styles.badgeText}>
                {badge.emoji} {badge.label}
              </Text>
            </View>
          </View>
          <Text style={styles.itemsLine} numberOfLines={2}>
            {itemsSummary(item)}
          </Text>
          <Text style={styles.totalLine}>${parseTotal(item).toFixed(2)}</Text>

          <View style={styles.actionRow}>
            {isPlaced ? (
              <>
                <TouchableOpacity
                  style={[styles.actionBtn, styles.actionPrimary]}
                  disabled={busyRow}
                  onPress={() => runStatusUpdate(item, 'CONFIRMED', 'Order accepted')}
                >
                  <Text style={styles.actionPrimaryText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionBtn, styles.actionDanger]}
                  disabled={busyRow}
                  onPress={() => runStatusUpdate(item, 'CANCELLED', 'Order rejected')}
                >
                  <Text style={styles.actionDangerText}>Reject</Text>
                </TouchableOpacity>
              </>
            ) : null}
            {!isPlaced && !terminal && next ? (
              <TouchableOpacity
                style={[styles.actionBtn, styles.actionPrimary]}
                disabled={busyRow}
                onPress={() =>
                  runStatusUpdate(item, next, `→ ${next.replace(/_/g, ' ')}`)
                }
              >
                <Text style={styles.actionPrimaryText}>Next: {next.replace(/_/g, ' ')}</Text>
              </TouchableOpacity>
            ) : null}
            {busyRow ? <ActivityIndicator color={THEME_GREEN} style={{ marginLeft: 8 }} /> : null}
          </View>
        </View>
      );
    },
    [runStatusUpdate, updatingIds]
  );

  const listHeader = useMemo(
    () => (
      <View style={styles.listHeaderWrap}>
        <Text style={styles.sectionTitle}>Live orders</Text>
        <View style={styles.filterRow}>
          {(['ALL', 'PENDING', 'PREPARING', 'DELIVERED'] as const).map((tab) => {
            const active = filter === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.filterChip, active && styles.filterChipActive]}
                onPress={() => setFilter(tab)}
              >
                <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>
                  {tab === 'ALL'
                    ? 'All'
                    : tab === 'PENDING'
                      ? 'Pending'
                      : tab === 'PREPARING'
                        ? 'Preparing'
                        : 'Delivered'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    ),
    [filter]
  );

  const listFooter = useMemo(() => {
    if (activity.length === 0) {
      return (
        <View style={styles.activityBox}>
          <Text style={styles.activityTitle}>Recent activity</Text>
          <Text style={styles.activityEmpty}>Status changes will appear here.</Text>
          <TouchableOpacity
            style={styles.pdfLink}
            onPress={() => navPush(router, { kind: 'adminOrders' }, roleForNav)}
          >
            <Text style={styles.pdfLinkText}>PDF bills & share →</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.activityBox}>
        <Text style={styles.activityTitle}>Recent activity</Text>
        {activity.map((a) => (
          <Text key={a.id} style={styles.activityLine}>
            • {a.text}
          </Text>
        ))}
        <TouchableOpacity
          style={styles.pdfLink}
          onPress={() => navPush(router, { kind: 'adminOrders' }, roleForNav)}
        >
          <Text style={styles.pdfLinkText}>PDF bills & share →</Text>
        </TouchableOpacity>
      </View>
    );
  }, [activity, router, user, profile]);

  useEffect(() => {
    if (!showAdminDashboard || authBypass || Platform.OS === 'web') return undefined;
    void ensureNotificationPermissions();
    return undefined;
  }, [showAdminDashboard, authBypass]);

  /** Layout redirects non-admins unless dev bypass; this covers a one-frame lag. */
  if (!showAdminDashboard) {
    return (
      <View style={[styles.flex, styles.centered]}>
        <ActivityIndicator size="large" color={THEME_GREEN} />
        <Text style={styles.gateHint}>Loading…</Text>
      </View>
    );
  }

  return (
    <View style={styles.flex}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.dashTop, { paddingTop: insets.top + 12 }]}>
        <View style={styles.dashTopRow}>
          <View>
            <Text style={styles.dashBrand}>STM Kitchen</Text>
            {authBypass ? (
              <Text style={styles.devBypassHint} numberOfLines={2}>
                Dev: admin auth bypass — not signed in
              </Text>
            ) : null}
            <Text style={styles.dashEmail} numberOfLines={1}>
              {user?.email ?? '—'}
            </Text>
          </View>
          <View style={styles.topActions}>
            <TouchableOpacity
              style={styles.topGhost}
              onPress={() => navPush(router, { kind: 'adminOrders' }, roleForNav)}
            >
              <Text style={styles.topGhostText}>PDF</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.topGhost} onPress={onSignOut} disabled={busy}>
              <Text style={styles.topGhostText}>Out</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.opsRow}>
          {(
            [
              [{ kind: 'adminKitchen' }, 'Kitchen'],
              [{ kind: 'adminRiders' }, 'Riders'],
              [{ kind: 'adminPayments' }, 'Pay'],
              [{ kind: 'adminAnalytics' }, 'Analytics'],
            ] as const satisfies ReadonlyArray<readonly [AppNavIntent, string]>
          ).map(([intent, label]) => (
            <TouchableOpacity
              key={label}
              style={styles.opsChip}
              onPress={() => navPush(router, intent, roleForNav)}
            >
              <Text style={styles.opsChipText}>{label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.opsChip}
            onPress={() => router.push('/admin/generate-reset-link')}
            activeOpacity={0.85}
          >
            <Text style={styles.opsChipText}>PWD link</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.opsChipGold} onPress={() => router.push('/admin/chat')} activeOpacity={0.85}>
            <Text style={styles.opsChipGoldText}>Chats 💬</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { width: statCardWidth }]}>
            <Text style={styles.statEmoji}>🔥</Text>
            <Text style={styles.statValue}>{stats.active}</Text>
            <Text style={styles.statLabel}>Active orders</Text>
            <Text style={styles.statHint}>Not delivered</Text>
          </View>
          <View style={[styles.statCard, { width: statCardWidth }]}>
            <Text style={styles.statEmoji}>✅</Text>
            <Text style={styles.statValue}>{stats.deliveredToday}</Text>
            <Text style={styles.statLabel}>Delivered today</Text>
            <Text style={styles.statHint}>By order date</Text>
          </View>
          <View style={[styles.statCard, { width: statCardWidth }]}>
            <Text style={styles.statEmoji}>💰</Text>
            <Text style={styles.statValue}>${stats.revenueToday.toFixed(0)}</Text>
            <Text style={styles.statLabel}>Revenue today</Text>
            <Text style={styles.statHint}>Orders placed today</Text>
          </View>
          <View style={[styles.statCard, { width: statCardWidth }]}>
            <Text style={styles.statEmoji}>❌</Text>
            <Text style={styles.statValue}>{stats.cancelled}</Text>
            <Text style={styles.statLabel}>Cancelled</Text>
            <Text style={styles.statHint}>All time</Text>
          </View>
        </View>
      </View>

      {ordersLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={THEME_GREEN} />
        </View>
      ) : (
        <FlatList
          data={filteredOrders}
          keyExtractor={(item, index) => item.id || `order-${index}`}
          renderItem={renderOrder}
          ListHeaderComponent={listHeader}
          ListFooterComponent={listFooter}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#f0f4f1' },
  gateHint: { marginTop: 14, fontSize: 15, fontWeight: '700', color: '#64748b' },
  scroll: { flexGrow: 1, paddingBottom: 40 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  hero: {
    backgroundColor: DARK_GREEN,
    paddingBottom: 28,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroTitle: { fontSize: 28, fontWeight: '900', color: '#fff' },
  heroSub: { marginTop: 6, color: 'rgba(255,255,255,0.75)', fontWeight: '700', fontSize: 14 },
  card: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: { elevation: 4 },
    }),
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748b',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 14,
    backgroundColor: '#f8fafc',
  },
  error: { color: '#b91c1c', fontWeight: '700', marginBottom: 12, fontSize: 13 },
  primaryBtn: {
    backgroundColor: THEME_GREEN,
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryBtnText: { color: '#fff', fontWeight: '900', fontSize: 16 },
  disabled: { opacity: 0.6 },
  accessHero: {
    flex: 1,
    backgroundColor: DARK_GREEN,
    paddingHorizontal: 24,
    paddingTop: 48,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  accessTitle: { fontSize: 26, fontWeight: '900', color: '#fff' },
  accessSub: {
    marginTop: 16,
    color: 'rgba(255,255,255,0.85)',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
  },
  dashTop: {
    backgroundColor: DARK_GREEN,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
      },
      android: { elevation: 6 },
    }),
  },
  dashTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  dashBrand: { fontSize: 22, fontWeight: '900', color: '#fff' },
  devBypassHint: {
    marginTop: 6,
    color: 'rgba(250,204,21,0.95)',
    fontSize: 12,
    fontWeight: '800',
    maxWidth: 280,
  },
  dashEmail: { marginTop: 4, color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '600', maxWidth: 220 },
  topActions: { flexDirection: 'row', gap: 8 },
  topGhost: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  topGhostText: { color: '#fff', fontWeight: '800', fontSize: 13 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between' },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(10,135,84,0.2)',
    ...Platform.select({
      ios: {
        shadowColor: THEME_GREEN,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
      },
      android: { elevation: 3 },
    }),
  },
  statEmoji: { fontSize: 20 },
  statValue: { fontSize: 22, fontWeight: '900', color: THEME_GREEN, marginTop: 4 },
  statLabel: { fontSize: 13, fontWeight: '800', color: DARK_GREEN, marginTop: 4 },
  statHint: { fontSize: 10, color: '#64748b', marginTop: 2, fontWeight: '600' },
  listContent: { paddingHorizontal: 16, paddingBottom: 32 },
  listHeaderWrap: { marginTop: 8, marginBottom: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: DARK_GREEN, marginBottom: 10 },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
  },
  filterChipActive: { backgroundColor: THEME_GREEN, borderColor: THEME_GREEN },
  filterChipText: { fontSize: 13, fontWeight: '800', color: '#475569' },
  filterChipTextActive: { color: '#fff' },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
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
  orderTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  orderId: { fontSize: 16, fontWeight: '900', color: DARK_GREEN },
  orderFulfil: { fontSize: 11, fontWeight: '900', color: THEME_GREEN, marginTop: 2, textTransform: 'uppercase' },
  customerName: { fontSize: 14, fontWeight: '700', color: '#334155', marginTop: 4 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  badgeText: { fontSize: 11, fontWeight: '800', color: '#0f172a' },
  itemsLine: { marginTop: 10, fontSize: 13, color: '#64748b', fontWeight: '600', lineHeight: 18 },
  totalLine: { marginTop: 8, fontSize: 17, fontWeight: '900', color: THEME_GREEN },
  actionRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12, gap: 8, alignItems: 'center' },
  actionBtn: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12 },
  actionPrimary: { backgroundColor: THEME_GREEN },
  actionPrimaryText: { color: '#fff', fontWeight: '900', fontSize: 13 },
  actionSecondary: { backgroundColor: '#E0F2FE' },
  actionSecondaryText: { color: '#0369A1', fontWeight: '900', fontSize: 13 },
  actionSuccess: { backgroundColor: '#DCFCE7' },
  actionSuccessText: { color: '#166534', fontWeight: '900', fontSize: 13 },
  actionDanger: { backgroundColor: '#fee2e2' },
  actionDangerText: { color: '#b91c1c', fontWeight: '900', fontSize: 13 },
  opsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  opsChip: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  opsChipText: { color: '#fff', fontWeight: '800', fontSize: 12 },
  opsChipGold: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  opsChipGoldText: { color: DARK_GREEN, fontWeight: '900', fontSize: 12 },
  activityBox: {
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  activityTitle: { fontSize: 15, fontWeight: '900', color: DARK_GREEN, marginBottom: 8 },
  activityEmpty: { fontSize: 13, color: '#94a3b8', fontWeight: '600' },
  activityLine: { fontSize: 13, color: '#475569', fontWeight: '600', marginBottom: 6 },
  pdfLink: { marginTop: 12, paddingVertical: 8 },
  pdfLinkText: { color: THEME_GREEN, fontWeight: '800', fontSize: 14 },
});
