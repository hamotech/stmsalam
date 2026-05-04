import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useSegments, usePathname } from 'expo-router';
import { navPush } from '@/src/navigation/appNavigation';
import { useAppRole } from '@/src/auth/useAppRole';
import { useAuth } from '@/src/context/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { openWhatsApp } from '@/src/config/whatsapp';
import WhatsAppIcon from '@/src/components/stm/WhatsAppIcon';

const GREEN = '#013220';
const GOLD = '#D4AF37';

const WHATSAPP_PRESET = 'Hi STM Salam, I need help with my order.';

/** Extra space above tab bar so FABs clear the bar and stay tappable (Grab-style). */
const FAB_ABOVE_TAB = Platform.OS === 'web' ? 56 : Platform.OS === 'ios' ? 48 : 54;
/**
 * Must stay BELOW the tab bar (`app/(tabs)/_layout.tsx` uses zIndex 100, elevation 30).
 * FABs sit above scroll content but under the bottom nav.
 */
const SUPPORT_LAYER_Z = 12;
const SUPPORT_FAB_ELEVATION = 8;

/** Approximate tab bar height for offset math (absolute bar ~60pt + safe area). */
function tabBarContentApprox(): number {
  return 62;
}

export default function SupportFloatingButtons() {
  const router = useRouter();
  const { user, profile } = useAuth();
  const navRole = useAppRole();
  const pathname = usePathname();
  const segments = useSegments();
  const insets = useSafeAreaInsets();

  const inTabs = segments[0] === '(tabs)';
  const tabBarApprox = tabBarContentApprox() + 8;
  const bottomOffset =
    (inTabs ? tabBarApprox + FAB_ABOVE_TAB : 28) + Math.max(insets.bottom, Platform.OS === 'web' ? 12 : 10);

  const onAuth = pathname === '/login' || pathname === '/register';
  if (onAuth) return null;

  const segs = segments as string[];
  const onSupport = pathname.includes('support') || segs.includes('support');
  const hideHelp = onSupport;

  return (
    <View
      pointerEvents="box-none"
      style={[
        StyleSheet.absoluteFill,
        {
          zIndex: SUPPORT_LAYER_Z,
          elevation: Platform.OS === 'android' ? SUPPORT_LAYER_Z : 0,
        },
      ]}
    >
      {!hideHelp && (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Open help and chat"
          style={[styles.fab, styles.fabLeft, { bottom: bottomOffset }]}
          onPress={() => navPush(router, { kind: 'support' }, navRole)}
          activeOpacity={0.88}
        >
          <Ionicons name="chatbubbles-outline" size={22} color="#FFFFFF" />
          <Text style={styles.fabLabel}>Help</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Chat on WhatsApp"
        style={[styles.fab, styles.fabRight, { bottom: bottomOffset }]}
        onPress={() => openWhatsApp(WHATSAPP_PRESET)}
        activeOpacity={0.88}
      >
        <WhatsAppIcon size={22} color={GREEN} />
        <Text style={[styles.fabLabel, { color: GREEN }]}>WhatsApp</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    minWidth: 56,
    height: 56,
    borderRadius: 28,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: SUPPORT_FAB_ELEVATION,
    zIndex: SUPPORT_LAYER_Z + 1,
  },
  fabLeft: {
    left: 16,
    backgroundColor: GREEN,
  },
  fabRight: {
    right: 16,
    backgroundColor: GOLD,
  },
  fabLabel: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 13,
  },
});
