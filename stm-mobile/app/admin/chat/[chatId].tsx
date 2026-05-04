import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import AdminSupportChatThread from '@/src/admin/AdminSupportChatThread';

export default function AdminChatDetailScreen() {
  const { chatId: raw } = useLocalSearchParams<{ chatId: string }>();
  const chatId = raw != null ? decodeURIComponent(String(raw)) : '';
  const title = chatId.length > 18 ? `${chatId.slice(0, 18)}…` : chatId || 'Chat';

  return (
    <>
      <Stack.Screen options={{ title }} />
      <View style={styles.fill}>{chatId ? <AdminSupportChatThread chatId={chatId} /> : null}</View>
    </>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
