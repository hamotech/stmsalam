/**
 * StatusBadge.tsx
 * Pill badge that renders an order status with its matching color.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { statusColor, OrderStatus } from '../services/orderService';

interface Props {
  status: OrderStatus | string;
  size?: 'sm' | 'md';
}

const LABEL_MAP: Record<string, string> = {
  PENDING:          'Pending',
  CONFIRMED:        'Confirmed',
  PREPARING:        'Preparing',
  READY:            'Ready',
  OUT_FOR_DELIVERY: 'On the Way',
  DELIVERING:       'On the Way',
  DELIVERED:        'Delivered',
  CANCELLED:        'Cancelled',
};

export default function StatusBadge({ status, size = 'md' }: Props) {
  const s = (status ?? '').toUpperCase();
  const color = statusColor(s);
  const label = LABEL_MAP[s] ?? s;
  const isSmall = size === 'sm';

  return (
    <View style={[styles.badge, { backgroundColor: color + '20', borderColor: color + '55' }]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.text, { color, fontSize: isSmall ? 10 : 12 }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
