/**
 * Cart tab — line items + checkout CTA.
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
  ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useCart } from '@/src/context/CartContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const GREEN = '#013220';
const GOLD = '#D4AF37';

export default function CartTabScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { cartItems, updateQty, removeFromCart, subtotal, totalItems, isCartReady } = useCart();

  const pt = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0;

  if (!isCartReady) {
    return (
      <View style={[styles.root, styles.centered]}>
        <StatusBar barStyle="light-content" />
        <ActivityIndicator size="large" color={GREEN} />
        <Text style={styles.loadingHint}>Loading cart…</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.header, { paddingTop: pt + 16 }]}>
        <Text style={styles.title}>Your cart</Text>
        <Text style={styles.sub}>
          {totalItems === 0 ? 'Add dishes from the menu' : `${totalItems} items`}
        </Text>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(i) => i.id}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: insets.bottom + 100 },
          cartItems.length === 0 && styles.emptyList,
        ]}
        ListEmptyComponent={
          <Text style={styles.empty}>Browse categories on Home and tap Add on any dish.</Text>
        }
        renderItem={({ item }) => {
          const uri = item.image || item.img;
          return (
            <View style={styles.row}>
              {uri ? (
                <Image source={{ uri }} style={styles.thumb} contentFit="cover" />
              ) : (
                <View style={[styles.thumb, styles.thumbPh]} />
              )}
              <View style={styles.body}>
                <Text style={styles.name} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={styles.line}>
                  ${Number(item.price).toFixed(2)} × {item.qty}
                </Text>
                <View style={styles.rowBtns}>
                  <View style={styles.stepper}>
                    <TouchableOpacity onPress={() => updateQty(item.id, -1)}>
                      <Text style={styles.step}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.qty}>{item.qty}</Text>
                    <TouchableOpacity onPress={() => updateQty(item.id, 1)}>
                      <Text style={styles.step}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                    <Text style={styles.remove}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.subtot}>
                ${(Number(item.price) * item.qty).toFixed(2)}
              </Text>
            </View>
          );
        }}
      />

      {cartItems.length > 0 && (
        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) + 8 }]}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalVal}>${subtotal.toFixed(2)}</Text>
          </View>
          <TouchableOpacity
            style={styles.checkout}
            onPress={() => router.push('/checkout')}
            activeOpacity={0.9}
          >
            <Text style={styles.checkoutTxt}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8FAFC' },
  centered: { justifyContent: 'center', alignItems: 'center' },
  loadingHint: { marginTop: 12, color: '#64748B', fontWeight: '600' },
  header: {
    backgroundColor: GREEN,
    paddingHorizontal: 20,
    paddingBottom: 22,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  title: { fontSize: 28, fontWeight: '900', color: '#FFF' },
  sub: { marginTop: 6, color: 'rgba(255,255,255,0.7)', fontWeight: '600' },
  list: { padding: 16 },
  emptyList: { flexGrow: 1, justifyContent: 'center' },
  empty: { textAlign: 'center', color: '#64748B', fontWeight: '600', paddingHorizontal: 32 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EEF2F6',
    gap: 12,
  },
  thumb: { width: 72, height: 72, borderRadius: 14 },
  thumbPh: { backgroundColor: '#E2E8F0' },
  body: { flex: 1, minWidth: 0 },
  name: { fontSize: 16, fontWeight: '900', color: '#0F172A' },
  line: { marginTop: 4, fontSize: 13, color: '#64748B', fontWeight: '600' },
  rowBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  step: { fontSize: 20, fontWeight: '900', color: GREEN, paddingHorizontal: 10 },
  qty: { fontWeight: '900', minWidth: 24, textAlign: 'center' },
  remove: { color: '#DC2626', fontWeight: '800', fontSize: 13 },
  subtot: { fontWeight: '900', color: GREEN, fontSize: 16 },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  totalLabel: { fontSize: 16, fontWeight: '800', color: '#64748B' },
  totalVal: { fontSize: 22, fontWeight: '900', color: GREEN },
  checkout: { backgroundColor: GOLD, borderRadius: 16, paddingVertical: 16, alignItems: 'center' },
  checkoutTxt: { color: GREEN, fontWeight: '900', fontSize: 17 },
});
