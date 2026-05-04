/**
 * Local cart (persisted) — mirrors web cart UX for browsing; checkout flow unchanged.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { navPush } from '@/src/navigation/appNavigation';
import { useAppRole } from '@/src/auth/useAppRole';
import { useAuth } from '@/src/context/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '@/src/context/CartContext';
import SupportFloatingButtons from '@/src/components/SupportFloatingButtons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { openWhatsApp } from '@/src/config/whatsapp';
import CartItemRow from '@/src/components/stm/CartItemRow';
import PriceSummaryCard from '@/src/components/stm/PriceSummaryCard';

const GREEN = '#013220';
const GOLD = '#D4AF37';

export default function CartScreen() {
  const router = useRouter();
  const { user, profile } = useAuth();
  const navRole = useAppRole();
  const insets = useSafeAreaInsets();
  const tabBarH = useBottomTabBarHeight();
  const pt = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0;
  const { lines, setQty, remove, clear, subtotal, itemCount, loaded } = useCart();

  const headerPad = Math.max(insets.top, pt) + 12;

  const waMessage = () => {
    if (!lines.length) return 'Hi STM Salam, I would like to place an order.';
    const body = lines
      .map((l) => `${l.qty}× ${l.name} @ $${l.price.toFixed(2)}`)
      .join('\n');
    return `Hi STM Salam, I'd like to order:\n\n${body}\n\nSubtotal (estimate): $${subtotal.toFixed(2)} SGD`;
  };

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: headerPad }]}>
        <Text style={styles.title}>Cart</Text>
        <Text style={styles.sub}>
          {itemCount > 0
            ? `${itemCount} items · est. $${subtotal.toFixed(2)} SGD`
            : 'Add items from Menu'}
        </Text>
        {lines.length > 0 ? (
          <TouchableOpacity onPress={clear} style={styles.clearGhost}>
            <Text style={styles.clearGhostText}>Clear cart</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {!loaded ? (
        <Text style={styles.hint}>Loading cart…</Text>
      ) : (
        <FlatList
          data={lines}
          keyExtractor={(l) => l.variantKey}
          contentContainerStyle={[
            styles.list,
            { paddingBottom: tabBarH + 96 },
          ]}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyEmoji}>🛒</Text>
              <Text style={styles.emptyTitle}>Your cart is empty</Text>
              <Text style={styles.emptySub}>Open Menu to add dishes from the live catalog.</Text>
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => navPush(router, { kind: 'tabsMenu' }, navRole)}
              >
                <Text style={styles.primaryBtnText}>Browse menu</Text>
              </TouchableOpacity>
            </View>
          }
          ListFooterComponent={
            lines.length ? (
              <View style={{ marginTop: 8 }}>
                <PriceSummaryCard
                  subtotal={subtotal}
                  deliveryFee={0}
                  total={subtotal}
                  deliveryLabel="Delivery (set at checkout)"
                />
              </View>
            ) : null
          }
          renderItem={({ item: l }) => (
            <CartItemRow
              line={l}
              onDec={() => setQty(l.variantKey, l.qty - 1)}
              onInc={() => setQty(l.variantKey, l.qty + 1)}
              onRemove={() => remove(l.variantKey)}
              onEdit={() => navPush(router, { kind: 'product', productId: l.productId }, navRole)}
            />
          )}
        />
      )}

      {lines.length > 0 ? (
        <View style={[styles.footer, { paddingBottom: tabBarH + 8 }]}>
          <TouchableOpacity
            style={styles.waBtn}
            onPress={() => openWhatsApp(waMessage())}
            activeOpacity={0.9}
          >
            <Text style={styles.waBtnText}>Order via WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => navPush(router, { kind: 'checkout' }, navRole)}
            activeOpacity={0.9}
          >
            <Text style={styles.secondaryBtnText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <SupportFloatingButtons />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    backgroundColor: GREEN,
    paddingHorizontal: 18,
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: { fontSize: 28, fontWeight: '900', color: '#FFF' },
  sub: { fontSize: 13, color: 'rgba(255,255,255,0.65)', fontWeight: '600', marginTop: 6 },
  clearGhost: { alignSelf: 'flex-end', marginTop: 8 },
  clearGhostText: { color: GOLD, fontWeight: '800', fontSize: 13 },
  hint: { textAlign: 'center', marginTop: 24, color: '#64748B', fontWeight: '600' },
  list: { padding: 16 },
  emptyBox: { alignItems: 'center', paddingTop: 48, paddingHorizontal: 24 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 20, fontWeight: '900', color: '#0F172A' },
  emptySub: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 21,
  },
  primaryBtn: {
    marginTop: 22,
    backgroundColor: GREEN,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 16,
  },
  primaryBtnText: { color: '#FFF', fontWeight: '900', fontSize: 15 },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 10,
  },
  waBtn: {
    backgroundColor: '#25D366',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  waBtnText: { color: '#FFF', fontWeight: '900', fontSize: 15 },
  secondaryBtn: {
    backgroundColor: GOLD,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryBtnText: { color: GREEN, fontWeight: '900', fontSize: 15 },
});
