/**
 * Order summary from `public_tracking` + order-scoped chat (`orders/{id}/messages`).
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { navPush } from '@/src/navigation/appNavigation';
import { useAppRole } from '@/src/auth/useAppRole';
import { useAuth } from '@/src/context/AuthContext';
import { subscribeOrderTracking, PublicOrder } from '@/src/services/orderService';
import HeaderBar from '@/src/components/stm/HeaderBar';
import StatusBadge from '@/src/components/StatusBadge';
import TrackingTimeline from '@/src/components/TrackingTimeline';
import OrderLiveChat from '@/src/components/OrderLiveChat';
import SupportFloatingButtons from '@/src/components/SupportFloatingButtons';
import { openWhatsApp } from '@/src/config/whatsapp';
import { useCart } from '@/src/context/CartContext';
import { Brand, cardShadow } from '@/src/theme/brand';

export default function OrderDetailScreen() {
  const router = useRouter();
  const { user, profile } = useAuth();
  const navRole = useAppRole();
  const { orderId: rawId } = useLocalSearchParams<{ orderId: string }>();
  const orderId = decodeURIComponent(rawId ?? '').split(',')[0].trim();
  const { addProduct } = useCart();

  const [order, setOrder] = useState<PublicOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setOrder(null);
      setLoading(false);
      return;
    }
    const unsub = subscribeOrderTracking(
      orderId,
      (data) => {
        setOrder(data);
        setLoading(false);
      },
      () => setLoading(false)
    );
    return unsub;
  }, [orderId]);

  const onReorder = () => {
    if (!order) return;
    order.items.forEach((item, i) => {
      const stripped = item.name.replace(/\s*\([^)]*\)\s*$/, '').trim() || item.name;
      addProduct(
        { id: `reorder-${order.id}-${i}`, name: stripped, price: Number(item.price) },
        item.qty
      );
    });
    navPush(router, { kind: 'checkout' }, navRole);
  };

  const waMsg = () =>
    `Hi STM Salam, regarding order ${order?.id ?? orderId} (#${(order?.id ?? orderId).slice(-8).toUpperCase()}).`;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={Brand.green} size="large" />
        <SupportFloatingButtons />
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.center}>
        <Text style={styles.err}>Order not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.link}>Go back</Text>
        </TouchableOpacity>
        <SupportFloatingButtons />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <HeaderBar
        title={`Order #${order.id.slice(-8).toUpperCase()}`}
        subtitle="Details & chat"
        showBack
      />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={[styles.card, cardShadow]}>
          <View style={styles.rowTop}>
            <StatusBadge status={order.status} />
            <TouchableOpacity
              onPress={() =>
                navPush(router, { kind: 'legacyOrderTracking', orderId: order.id }, navRole)
              }
            >
              <Text style={styles.linkStrong}>Live tracking →</Text>
            </TouchableOpacity>
          </View>
          <TrackingTimeline status={order.status} />
        </View>

        <View style={[styles.card, cardShadow]}>
          <Text style={styles.section}>Items</Text>
          {order.items.map((item, i) => (
            <View key={`${item.name}-${i}`} style={styles.line}>
              <Text style={styles.lineName} numberOfLines={2}>
                {item.qty}× {item.name}
              </Text>
              <Text style={styles.linePrice}>${(Number(item.price) * item.qty).toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalVal}>${order.total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.btnSecondary} onPress={onReorder} activeOpacity={0.9}>
            <Text style={styles.btnSecondaryText}>Reorder</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnWa}
            onPress={() => openWhatsApp(waMsg())}
            activeOpacity={0.9}
          >
            <Text style={styles.btnWaText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginHorizontal: Brand.space }}>
          <OrderLiveChat orderId={order.id} />
        </View>
      </ScrollView>
      <SupportFloatingButtons />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Brand.bg },
  scroll: { paddingBottom: 120 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Brand.bg },
  err: { fontWeight: '800', color: Brand.text },
  link: { marginTop: 10, color: Brand.green, fontWeight: '800' },
  card: {
    backgroundColor: Brand.card,
    marginHorizontal: Brand.space,
    marginTop: Brand.spaceSm,
    padding: Brand.space,
    borderRadius: Brand.radius,
    borderWidth: 1,
    borderColor: Brand.border,
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  linkStrong: { fontWeight: '900', color: Brand.green, fontSize: 13 },
  section: { fontSize: 16, fontWeight: '900', color: Brand.green, marginBottom: 12 },
  line: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, gap: 12 },
  lineName: { flex: 1, fontSize: 14, fontWeight: '700', color: Brand.text },
  linePrice: { fontSize: 14, fontWeight: '800', color: Brand.muted },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Brand.border,
  },
  totalLabel: { fontSize: 13, fontWeight: '800', color: Brand.muted },
  totalVal: { fontSize: 20, fontWeight: '900', color: Brand.green },
  btnRow: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: Brand.space,
    marginTop: Brand.space,
  },
  btnSecondary: {
    flex: 1,
    backgroundColor: Brand.gold,
    borderRadius: Brand.radius,
    paddingVertical: 14,
    alignItems: 'center',
  },
  btnSecondaryText: { fontWeight: '900', color: Brand.green },
  btnWa: {
    flex: 1,
    backgroundColor: '#25D366',
    borderRadius: Brand.radius,
    paddingVertical: 14,
    alignItems: 'center',
  },
  btnWaText: { fontWeight: '900', color: '#fff' },
});
