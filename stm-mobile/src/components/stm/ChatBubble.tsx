import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Brand } from '@/src/theme/brand';

type Props = {
  text: string;
  mine: boolean;
  label?: string;
};

export default function ChatBubble({ text, mine, label }: Props) {
  return (
    <View style={[styles.wrap, mine ? styles.wrapMe : styles.wrapThem]}>
      <View style={[styles.bubble, mine ? styles.bubbleMe : styles.bubbleThem]}>
        <Text style={[styles.text, mine && styles.textMe]}>{text}</Text>
      </View>
      {label ? <Text style={styles.meta}>{label}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { maxWidth: '88%', marginBottom: 10 },
  wrapMe: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  wrapThem: { alignSelf: 'flex-start', alignItems: 'flex-start' },
  bubble: {
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  bubbleMe: { backgroundColor: Brand.green, borderBottomRightRadius: 4 },
  bubbleThem: {
    backgroundColor: Brand.card,
    borderWidth: 1,
    borderColor: Brand.border,
    borderBottomLeftRadius: 4,
  },
  text: { fontSize: 14, fontWeight: '600', color: Brand.text, lineHeight: 20 },
  textMe: { color: '#fff' },
  meta: { fontSize: 10, color: Brand.muted, fontWeight: '700', marginTop: 4 },
});
