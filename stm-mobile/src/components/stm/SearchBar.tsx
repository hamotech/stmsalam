import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Brand, cardShadow } from '@/src/theme/brand';

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  onSubmitEditing?: () => void;
  /** Merged with default wrap styles (e.g. `{ marginHorizontal: 0 }`). */
  wrapStyle?: object;
};

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search…',
  onSubmitEditing,
  wrapStyle,
}: Props) {
  return (
    <View style={[styles.wrap, cardShadow, wrapStyle]}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Brand.muted}
        returnKeyType="search"
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Brand.card,
    borderRadius: Brand.radius,
    borderWidth: 1,
    borderColor: Brand.border,
    marginHorizontal: Brand.space,
  },
  input: {
    paddingHorizontal: Brand.space,
    paddingVertical: 14,
    fontSize: 15,
    fontWeight: '600',
    color: Brand.text,
  },
});
