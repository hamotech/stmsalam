import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useOfflineOrderSync } from '@/src/hooks/useOfflineOrderSync';

/**
 * Non-blocking banner when COD orders are queued offline or a sync is running.
 */
export default function OfflineOrderSyncBanner() {
  const { pending, lastSync } = useOfflineOrderSync(true);

  if (lastSync !== 'syncing' && pending === 0) {
    return null;
  }

  return (
    <View
      style={[styles.bar, Platform.OS === 'web' ? { top: 0 } : { top: 48 }]}
      accessibilityRole="alert"
    >
      <Text style={styles.text}>
        {lastSync === 'syncing'
          ? 'Syncing pending orders…'
          : `${pending} pending order(s) — will send when you are online`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: '#013220',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 13,
  },
});
