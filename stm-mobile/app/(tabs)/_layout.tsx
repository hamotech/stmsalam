/**
 * app/(tabs)/_layout.tsx
 * Bottom tab navigator — Home + Orders
 */

import React from 'react';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/haptic-tab';

const GREEN = '#013220';
const GOLD  = '#D4AF37';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown:          false,
        tabBarButton:         HapticTab,
        tabBarActiveTintColor:   GOLD,
        tabBarInactiveTintColor: 'rgba(255,255,255,0.45)',
        tabBarStyle: {
          backgroundColor:     GREEN,
          borderTopWidth:      0,
          height:              Platform.OS === 'ios' ? 86 : 62,
          paddingBottom:       Platform.OS === 'ios' ? 26 : 10,
          paddingTop:          10,
          shadowColor:         '#000',
          shadowOffset:        { width: 0, height: -4 },
          shadowOpacity:       0.15,
          shadowRadius:        16,
          elevation:           12,
        },
        tabBarLabelStyle: {
          fontSize:   11,
          fontWeight: '700',
          marginTop:  2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title:        'Home',
          tabBarIcon:   ({ color }) => (
            <TabIcon emoji="🏠" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title:        'Orders',
          tabBarIcon:   ({ color }) => (
            <TabIcon emoji="📋" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

// Lightweight emoji icon — avoids font loading issues on first run
import { Text } from 'react-native';

function TabIcon({ emoji, color }: { emoji: string; color: string }) {
  return (
    <Text style={{ fontSize: 22, opacity: color === GOLD ? 1 : 0.55 }}>
      {emoji}
    </Text>
  );
}
