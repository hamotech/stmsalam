import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Brand, cardShadow } from '@/src/theme/brand';
import { productImageUrl } from '@/src/utils/productImage';
import type { Product } from '@/src/services/menuService';

type Props = {
  product: Product;
  onPress: () => void;
  /** Optional one-tap add (e.g. menu list) without opening detail. */
  onQuickAdd?: () => void;
};

export default function ProductCard({ product, onPress, onQuickAdd }: Props) {
  const uri = productImageUrl(product.image || product.img);

  return (
    <View style={[styles.card, cardShadow]}>
      <TouchableOpacity style={styles.cardMain} onPress={onPress} activeOpacity={0.9}>
        {uri ? (
          <Image source={{ uri }} style={styles.image} contentFit="cover" />
        ) : (
          <View style={[styles.image, styles.ph]}>
            <Text style={styles.phText}>🍽️</Text>
          </View>
        )}
        <View style={styles.body}>
          <Text style={styles.name} numberOfLines={2}>
            {product.name}
          </Text>
          {product.badge ? <Text style={styles.badge}>{product.badge}</Text> : null}
          <Text style={styles.price}>${Number(product.price).toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
      {onQuickAdd ? (
        <TouchableOpacity style={styles.quickAdd} onPress={onQuickAdd} activeOpacity={0.88}>
          <Text style={styles.quickAddText}>+</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: Brand.card,
    borderRadius: Brand.radius,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Brand.border,
    marginBottom: Brand.spaceSm,
  },
  cardMain: { flex: 1, flexDirection: 'row' },
  quickAdd: {
    width: 48,
    backgroundColor: Brand.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickAddText: { fontSize: 26, fontWeight: '900', color: Brand.green, lineHeight: 28 },
  image: { width: 96, height: 96, backgroundColor: Brand.bg },
  ph: { alignItems: 'center', justifyContent: 'center' },
  phText: { fontSize: 28 },
  body: { flex: 1, padding: Brand.space, justifyContent: 'center' },
  name: { fontSize: 15, fontWeight: '900', color: Brand.text },
  badge: { fontSize: 11, color: Brand.muted, fontWeight: '700', marginTop: 4 },
  price: { fontSize: 17, fontWeight: '900', color: Brand.green, marginTop: 8 },
});
