/**
 * Floating cart pill — jumps to Cart tab with badge.
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '@/src/context/CartContext';

const GREEN = '#013220';
const GOLD = '#D4AF37';

export default function CartFab() {
  const router = useRouter();
  const { totalItems, subtotal } = useCart();
  const insets = useSafeAreaInsets();

  if (totalItems <= 0) return null;

  return (
    <TouchableOpacity
      style={[
        styles.wrap,
        { bottom: Math.max(insets.bottom, 12) + (Platform.OS === 'ios' ? 72 : 64) },
      ]}
      onPress={() => router.push('/(tabs)/cart')}
      activeOpacity={0.92}
    >
      <View style={styles.row}>
        <Text style={styles.emoji}>🛒</Text>
        <View style={styles.mid}>
          <Text style={styles.title}>View cart</Text>
          <Text style={styles.meta}>
            {totalItems} item{totalItems === 1 ? '' : 's'} · ${subtotal.toFixed(2)}
          </Text>
        </View>
        <Text style={styles.chev}>→</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 16,
    right: 16,
    backgroundColor: GREEN,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 2,
    borderColor: GOLD,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  emoji: { fontSize: 26 },
  mid: { flex: 1 },
  title: { color: '#FFF', fontWeight: '900', fontSize: 16 },
  meta: { color: 'rgba(255,255,255,0.85)', fontWeight: '700', fontSize: 12, marginTop: 2 },
  chev: { marginLeft: 'auto', color: GOLD, fontSize: 22, fontWeight: '900' },
});
