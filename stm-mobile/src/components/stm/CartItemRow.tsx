import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Brand, cardShadow } from '@/src/theme/brand';
import type { CartLine } from '@/src/context/CartContext';

type Props = {
  line: CartLine;
  onInc: () => void;
  onDec: () => void;
  onRemove: () => void;
  onEdit?: () => void;
};

export default function CartItemRow({ line, onInc, onDec, onRemove, onEdit }: Props) {
  return (
    <View style={[styles.card, cardShadow]}>
      <View style={styles.main}>
        <Text style={styles.name} numberOfLines={3}>
          {line.name}
        </Text>
        <Text style={styles.meta}>
          ${line.price.toFixed(2)} × {line.qty} = ${(line.price * line.qty).toFixed(2)}
        </Text>
      </View>
      <View style={styles.actions}>
        {onEdit ? (
          <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
            <Text style={styles.editTxt}>Edit</Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity style={styles.qtyBtn} onPress={onDec}>
          <Text style={styles.qtyTxt}>−</Text>
        </TouchableOpacity>
        <Text style={styles.qtyVal}>{line.qty}</Text>
        <TouchableOpacity style={styles.qtyBtn} onPress={onInc}>
          <Text style={styles.qtyTxt}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.del} onPress={onRemove}>
          <Text style={styles.delTxt}>✕</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: Brand.spaceSm,
  },
  main: { marginBottom: 12 },
  name: { fontSize: 15, fontWeight: '900', color: Brand.text },
  meta: { fontSize: 13, color: Brand.muted, fontWeight: '700', marginTop: 4 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  editBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Brand.gold,
    marginRight: 4,
  },
  editTxt: { fontSize: 13, fontWeight: '900', color: Brand.green },
  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Brand.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyTxt: { fontSize: 18, fontWeight: '900', color: Brand.green },
  qtyVal: { fontSize: 16, fontWeight: '900', minWidth: 28, textAlign: 'center' },
  del: { marginLeft: 'auto', padding: 8 },
  delTxt: { fontSize: 16, color: Brand.muted, fontWeight: '800' },
});
