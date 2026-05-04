import SupportScreen from '@/src/screens/SupportScreen';
import SupportFloatingButtons from '@/src/components/SupportFloatingButtons';
import React from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * Help hub — AI + Live team (Firestore `support_chats`), WhatsApp shortcut via floating button.
 */
export default function SupportRoute() {
  return (
    <View style={styles.fill}>
      <SupportScreen />
      <SupportFloatingButtons />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
