import React from 'react';
import { View, StyleSheet, Platform, type StyleProp, type ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { Brand } from '@/src/theme/brand';

const LOGO = require('@/assets/logo.png');

const PLATE_PADDING = 14;

type Props = {
  /** Inner logo width in dp. */
  logoSize?: number;
  style?: StyleProp<ViewStyle>;
};

/**
 * STM badge: green → white gradient plate with centered logo (matches splash + auth).
 */
export default function StmLogoPlate({ logoSize = 112, style }: Props) {
  const inner = logoSize;
  const plateW = inner + PLATE_PADDING * 2;
  const plateH = inner + PLATE_PADDING * 2;
  const r = 26;

  return (
    <View style={[styles.shadowWrap, { width: plateW, height: plateH, borderRadius: r }, style]}>
      <View style={[styles.clip, { width: plateW, height: plateH, borderRadius: r }]}>
        <Svg width={plateW} height={plateH} style={StyleSheet.absoluteFill} pointerEvents="none">
          <Defs>
            <LinearGradient
              id="stmPlateGrad"
              x1="0"
              y1="0"
              x2="0"
              y2={plateH}
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0" stopColor={Brand.green} />
              <Stop offset="0.36" stopColor={Brand.green} />
              <Stop offset="0.52" stopColor="#d8ebe2" />
              <Stop offset="1" stopColor="#ffffff" />
            </LinearGradient>
          </Defs>
          <Rect x={0} y={0} width={plateW} height={plateH} rx={r} ry={r} fill="url(#stmPlateGrad)" />
        </Svg>
        <View style={styles.logoCenter}>
          <Image
            source={LOGO}
            style={{ width: inner, height: inner * 0.92 }}
            contentFit="contain"
            accessibilityLabel="STM Salam logo"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrap: {
    ...Platform.select({
      ios: {
        shadowColor: Brand.green,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.28,
        shadowRadius: 14,
      },
      android: { elevation: 8 },
      default: {},
    }),
  },
  clip: {
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.92)',
  },
  logoCenter: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 2,
  },
});
