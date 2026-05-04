import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  subtitle?: string;
  onRetry?: () => void;
  retryLabel?: string;
};

export default function ErrorState({ title, subtitle, onRetry, retryLabel = 'Try again' }: Props) {
  return (
    <View style={styles.wrap} accessibilityRole="alert">
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.sub}>{subtitle}</Text> : null}
      {onRetry ? (
        <TouchableOpacity style={styles.btn} onPress={onRetry} activeOpacity={0.88}>
          <Text style={styles.btnText}>{retryLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  title: { fontSize: 18, fontWeight: '800', color: '#0f172a', textAlign: 'center' },
  sub: { marginTop: 10, fontSize: 14, color: '#64748b', textAlign: 'center', lineHeight: 20, fontWeight: '600' },
  btn: { marginTop: 20, backgroundColor: '#0f172a', paddingHorizontal: 22, paddingVertical: 12, borderRadius: 12 },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 15 },
});
