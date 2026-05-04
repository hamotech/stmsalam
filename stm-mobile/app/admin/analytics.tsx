import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GREEN = '#013220';

export default function AdminAnalyticsPlaceholder() {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Analytics</Text>
      <Text style={styles.sub}>Prep times, SLA, and rider stats — connect your warehouse next.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 24, backgroundColor: '#f8fafc' },
  title: { fontSize: 24, fontWeight: '900', color: GREEN },
  sub: { marginTop: 12, color: '#64748b', fontWeight: '600', lineHeight: 22 },
});
