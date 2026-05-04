import React from 'react';
import { Stack } from 'expo-router';

const GREEN = '#013220';

export default function AdminChatLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: GREEN },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '900' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Customer chats' }} />
      <Stack.Screen name="[chatId]" options={{ title: 'Conversation' }} />
    </Stack>
  );
}
