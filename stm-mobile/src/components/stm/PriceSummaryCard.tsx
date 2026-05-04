import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Brand, cardShadow } from '@/src/theme/brand';

type Props = {
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryLabel?: string;
};

export default function PriceSummaryCard({
  subtotal,
  deliveryFee,
  total,
  deliveryLabel = 'Delivery',
}: Props) {
  return (
    <View style={[styles.card, cardShadow]}>
      <Text style={styles.title}>Summary</Text>
      <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
      <Row label={deliveryLabel} value={`$${deliveryFee.toFixed(2)}`} />
      <View style={styles.divider} />
      <Row label="Total (SGD)" value={`$${total.toFixed(2)}`} bold />
    </View>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.label, bold && styles.bold]}>{label}</Text>
      <Text style={[styles.value, bold && styles.bold]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Brand.card,
    borderRadius: Brand.radius,
    padding: Brand.space,
    borderWidth: 1,
    borderColor: Brand.border,
  },
  title: { fontSize: 16, fontWeight: '900', color: Brand.green, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  label: { fontSize: 14, color: Brand.muted, fontWeight: '600' },
  value: { fontSize: 14, fontWeight: '800', color: Brand.text },
  bold: { fontSize: 17, fontWeight: '900', color: Brand.green },
  divider: {
    height: 1,
    backgroundColor: Brand.border,
    marginVertical: 10,
  },
});
