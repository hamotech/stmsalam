import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Platform, type StyleProp, type ViewStyle } from 'react-native';
import { Brand, cardShadow } from '@/src/theme/brand';
import type { Category } from '@/src/services/menuService';

type Props = {
  category: Category;
  active: boolean;
  onPress: () => void;
  /** Home page: green + gold accent chips (Menu tab keeps `default`). */
  variant?: 'default' | 'home';
  style?: StyleProp<ViewStyle>;
};

export default function CategoryCard({ category, active, onPress, variant = 'default', style }: Props) {
  const isHome = variant === 'home';
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        !isHome && cardShadow,
        isHome ? styles.chipHome : null,
        active && (isHome ? styles.chipHomeOn : styles.chipOn),
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={[isHome ? styles.textHome : styles.text, active && (isHome ? styles.textHomeOn : styles.textOn)]}>
        {category.emoji ? `${category.emoji} ` : ''}
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: Brand.card,
    borderWidth: 1,
    borderColor: Brand.border,
    marginRight: 8,
  },
  chipHome: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: Brand.green,
    marginRight: 10,
    marginBottom: Platform.OS === 'web' ? 10 : 8,
    ...Platform.select({
      web: { boxShadow: '0 2px 8px rgba(1,50,32,0.12)' },
      default: {
        shadowColor: Brand.green,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 2,
      },
    }),
  },
  chipOn: { backgroundColor: Brand.gold, borderColor: Brand.gold },
  chipHomeOn: { backgroundColor: Brand.gold, borderColor: Brand.gold },
  text: { fontSize: 13, fontWeight: '800', color: Brand.text },
  textHome: { fontSize: 14, fontWeight: '900', color: Brand.green, letterSpacing: 0.2 },
  textOn: { color: Brand.green },
  textHomeOn: { color: Brand.green },
});
