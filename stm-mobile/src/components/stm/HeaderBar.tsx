import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Brand, cardShadow } from '@/src/theme/brand';

const HEADER_INNER_MAX = 720;

type Props = {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightLabel?: string;
  onRightPress?: () => void;
};

export default function HeaderBar({
  title,
  subtitle,
  showBack = true,
  rightLabel,
  onRightPress,
}: Props) {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const pt = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0;
  const innerWide = width >= 600;

  return (
    <View style={[styles.wrap, { paddingTop: pt + 8 }, cardShadow]}>
      <View style={[styles.row, innerWide && styles.rowCentered, innerWide && { maxWidth: HEADER_INNER_MAX, width: '100%', alignSelf: 'center' }]}>
        {showBack ? (
          <TouchableOpacity onPress={() => router.back()} hitSlop={12} style={styles.backBtn}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.backPlaceholder} />
        )}
        <View style={styles.titleBlock}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={styles.sub} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        {rightLabel && onRightPress ? (
          <TouchableOpacity onPress={onRightPress}>
            <Text style={styles.right}>{rightLabel}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.backPlaceholder} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Brand.green,
    paddingBottom: 12,
    paddingHorizontal: Brand.spaceSm,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  rowCentered: { paddingHorizontal: 4 },
  backBtn: { width: 36, height: 36, justifyContent: 'center' },
  backPlaceholder: { width: 36 },
  backText: { color: 'rgba(255,255,255,0.85)', fontSize: 20, fontWeight: '800' },
  titleBlock: { flex: 1, alignItems: 'center', minWidth: 0, paddingHorizontal: 4 },
  title: { color: '#fff', fontSize: 17, fontWeight: '900' },
  sub: { color: 'rgba(255,255,255,0.65)', fontSize: 11, fontWeight: '600', marginTop: 1 },
  right: { color: Brand.gold, fontWeight: '900', fontSize: 12, maxWidth: 76 },
});
