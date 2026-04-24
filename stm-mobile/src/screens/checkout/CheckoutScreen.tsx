/**
 * Checkout screen — order summary comes from route params only.
 * Payment actions are appended via {@link CheckoutPaymentButtons} (no cart / placement logic).
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import CheckoutPaymentButtons from './CheckoutPaymentButtons';

const GREEN = '#013220';

export default function CheckoutScreen() {
  const isWeb = Platform.OS === 'web';
  const p = useLocalSearchParams<{
    orderId?: string;
    amount?: string;
    customerName?: string;
  }>();

  const orderId = useMemo(() => {
    const raw = p.orderId ? String(p.orderId) : '';
    try {
      return raw ? decodeURIComponent(raw) : '';
    } catch {
      return raw;
    }
  }, [p.orderId]);

  const amount = useMemo(() => Number(p.amount), [p.amount]);

  const customerName = useMemo(() => {
    const raw = p.customerName ? String(p.customerName) : '';
    try {
      return raw ? decodeURIComponent(raw) : '';
    } catch {
      return raw;
    }
  }, [p.customerName]);

  const enabled = Boolean(orderId.trim()) && Number.isFinite(amount) && amount > 0;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Checkout</Text>
      <Text style={styles.sub}>
        {isWeb
          ? 'Review your order, enter your phone number, and pay with Stripe.'
          : 'Review your order, then choose a payment method.'}
      </Text>

      <View style={styles.card}>
        <Row label="Order ID" value={orderId || '—'} />
        <Row label="Customer" value={customerName || '—'} />
        <Row label="Amount (SGD)" value={Number.isFinite(amount) ? amount.toFixed(2) : '—'} />
      </View>

      {!enabled && (
        <Text style={styles.warn}>
          Pass `orderId` and `amount` as query params to enable payment (e.g. from your order
          flow).
        </Text>
      )}

      <CheckoutPaymentButtons
        orderId={orderId}
        amount={amount}
        customerName={customerName || 'Customer'}
        enabled={enabled}
      />
    </ScrollView>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 22, paddingTop: 56, paddingBottom: 48 },
  title: { fontSize: 28, fontWeight: '900', color: GREEN },
  sub: { marginTop: 8, fontSize: 14, color: '#64748B', fontWeight: '600' },
  card: {
    marginTop: 24,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  row: { marginBottom: 14 },
  rowLabel: { fontSize: 12, color: '#94A3B8', fontWeight: '800', textTransform: 'uppercase' },
  rowValue: { marginTop: 4, fontSize: 16, color: '#0F172A', fontWeight: '700' },
  warn: {
    marginTop: 16,
    color: '#B45309',
    fontWeight: '700',
    fontSize: 13,
    lineHeight: 20,
  },
});
