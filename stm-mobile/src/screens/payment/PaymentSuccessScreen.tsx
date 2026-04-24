/**
 * Shown after HitPay or Stripe payment succeeds.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const GREEN = '#013220';

export default function PaymentSuccessScreen() {
  const router = useRouter();
  const { orderId: raw } = useLocalSearchParams<{ orderId?: string }>();
  const orderId = raw ? String(raw).trim() : '';

  return (
    <View style={styles.screen}>
      <Text style={styles.emoji}>✅</Text>
      <Text style={styles.title}>Payment received</Text>
      <Text style={styles.sub}>
        {orderId ? `Order #${orderId.slice(-8).toUpperCase()}` : 'Your order'} is marked as paid.
      </Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.replace('/')}
        activeOpacity={0.85}
      >
        <Text style={styles.btnText}>Back to home</Text>
      </TouchableOpacity>
      {!!orderId && (
        <TouchableOpacity
          style={styles.link}
          onPress={() => router.replace(`/tracking/${encodeURIComponent(orderId)}`)}
          activeOpacity={0.8}
        >
          <Text style={styles.linkText}>View live tracking →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 28,
    paddingTop: 80,
    alignItems: 'center',
  },
  emoji: { fontSize: 56, marginBottom: 12 },
  title: { fontSize: 26, fontWeight: '900', color: GREEN },
  sub: {
    marginTop: 12,
    fontSize: 15,
    color: '#64748B',
    fontWeight: '600',
    textAlign: 'center',
    maxWidth: 320,
  },
  btn: {
    marginTop: 36,
    backgroundColor: GREEN,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
  },
  btnText: { color: '#FFF', fontWeight: '900', fontSize: 16 },
  link: { marginTop: 20 },
  linkText: { color: GREEN, fontWeight: '800', fontSize: 15 },
});
