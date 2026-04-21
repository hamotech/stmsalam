/**
 * OrderCard.tsx
 * Card displaying a summary of a single order — used in the Orders list screen.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PublicOrder } from '../services/orderService';
import StatusBadge from './StatusBadge';

interface Props {
  order: PublicOrder;
  onTrack: (orderId: string) => void;
}

const formatDate = (raw: PublicOrder['createdAt']): string => {
  try {
    const d =
      raw && typeof raw === 'object' && 'toDate' in raw
        ? (raw as any).toDate()
        : new Date(raw as string);
    return d.toLocaleDateString('en-SG', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  } catch {
    return '—';
  }
};

export default function OrderCard({ order, onTrack }: Props) {
  const shortId = order.id?.slice(-8)?.toUpperCase() ?? '—';

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.orderId}>#{shortId}</Text>
          <Text style={styles.date}>{formatDate(order.createdAt)}</Text>
        </View>
        <StatusBadge status={order.status} />
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Items preview */}
      <View style={styles.items}>
        {order.items.slice(0, 3).map((item, i) => (
          <View key={i} style={styles.itemRow}>
            <View style={styles.qtyBadge}>
              <Text style={styles.qtyText}>{item.qty}×</Text>
            </View>
            <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.itemPrice}>
              ${((item.price ?? 0) * (item.qty ?? 1)).toFixed(2)}
            </Text>
          </View>
        ))}
        {order.items.length > 3 && (
          <Text style={styles.moreItems}>+{order.items.length - 3} more items</Text>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>${order.total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={styles.trackBtn}
          onPress={() => onTrack(order.id)}
          activeOpacity={0.8}
        >
          <Text style={styles.trackBtnText}>Track Order →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const GREEN = '#013220';
const GOLD  = '#D4AF37';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '900',
    color: GREEN,
    letterSpacing: 0.5,
  },
  date: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginBottom: 14,
  },
  items: {
    gap: 8,
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyBadge: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
    minWidth: 30,
    alignItems: 'center',
  },
  qtyText: {
    fontSize: 12,
    fontWeight: '800',
    color: GREEN,
  },
  itemName: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: '#475569',
  },
  moreItems: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
    marginTop: 2,
    marginLeft: 38,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 14,
  },
  totalLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: '900',
    color: GREEN,
    letterSpacing: -0.5,
  },
  trackBtn: {
    backgroundColor: GREEN,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  trackBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
});
