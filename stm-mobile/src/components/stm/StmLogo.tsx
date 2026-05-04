import React from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { stmLogoUrl } from '@/src/config/branding';

type Props = {
  /** Width & height in dp (square). */
  size?: number;
  style?: StyleProp<ViewStyle>;
  /** Tints opaque pixels (e.g. match hero headline gold on dark green). */
  tintColor?: string;
};

export default function StmLogo({ size = 72, style, tintColor }: Props) {
  return (
    <View style={[styles.wrap, { width: size, height: size }, style]}>
      <Image
        source={{ uri: stmLogoUrl() }}
        style={[StyleSheet.absoluteFill, tintColor ? { tintColor } : null]}
        contentFit="contain"
        accessibilityLabel="STM Salam logo"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'relative' },
});
