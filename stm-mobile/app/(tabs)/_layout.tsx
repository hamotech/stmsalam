/**
 * app/(tabs)/_layout.tsx
 * Bottom tab navigator — Home, Menu, Cart, Orders, Profile
 *
 * Tab bar is `position: 'absolute'` with high z-index / Android elevation so it stays above
 * screen content and support FABs. Scroll areas use `useBottomTabBarHeight()` for padding.
 */

import React from 'react';
import { Tabs } from 'expo-router';
import { Platform, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { HapticTab } from '@/components/haptic-tab';

const GREEN = '#013220';
const GOLD = '#D4AF37';
const INACTIVE_LABEL = 'rgba(255, 255, 255, 0.88)';

/** Keep in sync with SupportFloatingButtons approximate clearance. */
const TAB_BAR_BASE = 60;
const TAB_BAR_Z = 100;
const TAB_BAR_ELEVATION = 30;

type IonName = React.ComponentProps<typeof Ionicons>['name'];

function tabBarIcon(routeName: string) {
  const map: Record<string, { outline: IonName; solid: IonName }> = {
    index: { outline: 'home-outline', solid: 'home' },
    menu: { outline: 'restaurant-outline', solid: 'restaurant' },
    cart: { outline: 'cart-outline', solid: 'cart' },
    orders: { outline: 'receipt-outline', solid: 'receipt' },
    profile: { outline: 'person-outline', solid: 'person' },
  };
  const icons = map[routeName] ?? map.index;
  return ({
    color,
    size,
    focused,
  }: {
    color: string;
    size: number;
    focused: boolean;
  }) => <Ionicons name={focused ? icons.solid : icons.outline} size={size} color={color} />;
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;
  const tabBarPadH = isTablet ? Math.min(72, Math.max(16, Math.round((width - 560) / 2))) : 0;
  const bottomExtra = Platform.OS === 'web' ? 10 : 6;
  const tabBarHeight = TAB_BAR_BASE + insets.bottom + bottomExtra;

  return (
    <Tabs
      screenOptions={({ route }) => ({
        sceneStyle: {
          flex: 1,
          overflow: 'visible',
          ...(Platform.OS === 'web' ? { minHeight: 0 } : {}),
        },
        headerShown: false,
        tabBarShowLabel: true,
        tabBarShowIcon: true,
        tabBarActiveTintColor: GOLD,
        tabBarInactiveTintColor: INACTIVE_LABEL,
        tabBarButton: HapticTab,
        tabBarIcon: tabBarIcon(route.name),
        tabBarStyle: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: GREEN,
          borderTopWidth: 0,
          height: tabBarHeight,
          paddingTop: 8,
          paddingBottom: insets.bottom + bottomExtra,
          paddingHorizontal: tabBarPadH,
          elevation: Platform.OS === 'android' ? TAB_BAR_ELEVATION : 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.22,
          shadowRadius: 10,
          zIndex: TAB_BAR_Z,
        },
        tabBarItemStyle: isTablet
          ? { flex: 1, maxWidth: 120, paddingVertical: 4 }
          : { flex: 1, paddingVertical: 4, justifyContent: 'center' },
        tabBarLabelStyle: {
          fontSize: isTablet ? 12 : 10,
          fontWeight: '800',
          letterSpacing: 0.3,
          marginTop: 2,
          marginBottom: 0,
          lineHeight: isTablet ? 16 : 14,
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="menu" options={{ title: 'Menu' }} />
      <Tabs.Screen name="cart" options={{ title: 'Cart' }} />
      <Tabs.Screen name="orders" options={{ title: 'Orders' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
