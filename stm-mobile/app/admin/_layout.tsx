import React, { useEffect } from 'react';
import { ActivityIndicator, Platform, StyleSheet, View, type ViewStyle } from 'react-native';
import { Stack, usePathname, useRouter, type Href } from 'expo-router';
import AdminNotificationListener from '@/src/admin/components/AdminNotificationListener';
import { useAuth } from '@/src/context/AuthContext';
import { useAppRole } from '@/src/auth/useAppRole';
import { isFirestoreAdminUser } from '@/src/admin/adminAuth';
import { isAdminAuthBypassEnabled } from '@/src/bootstrap/appMode';

const GREEN = '#013220';

/** Expo Router sometimes yields `admin/login` without a leading slash on web — breaks guards. */
function normalizePathname(raw: string): string {
  const t = (raw || '').trim();
  if (!t) return '';
  return t.startsWith('/') ? t : `/${t}`;
}

function pathnameIsAdminPublic(pathname: string): boolean {
  const p = normalizePathname(pathname);
  return (
    p === '/admin/login' ||
    p.endsWith('/admin/login') ||
    p === '/admin/forgot-password' ||
    p.endsWith('/admin/forgot-password')
  );
}

function pathnameAllowsKitchenStaff(pathname: string): boolean {
  const p = normalizePathname(pathname);
  return (
    p === '/admin/kitchen' ||
    p.endsWith('/admin/kitchen') ||
    p.includes('/admin/order-management')
  );
}

function RedirectGate({ href }: { href: Href }) {
  const router = useRouter();
  useEffect(() => {
    if (typeof __DEV__ !== 'undefined' && __DEV__) {
      console.log('🚨 NAV OVERRIDE SOURCE', {
        file: 'app/admin/_layout.tsx',
        reason: 'RedirectGate_replace',
        href,
      });
    }
    router.replace(href);
  }, [href, router]);
  return (
    <View style={[styles.adminShell, styles.boot]}>
      <ActivityIndicator size="large" color={GREEN} />
    </View>
  );
}

export default function AdminStackLayout() {
  const { user, profile, idTokenClaims, loading } = useAuth();
  const routerPath = usePathname() ?? '';
  const pathname = normalizePathname(
    routerPath ||
      (Platform.OS === 'web' && typeof window !== 'undefined' ? window.location.pathname || '' : '')
  );
  const role = useAppRole();
  const authBypass = isAdminAuthBypassEnabled();
  /** Segments are unreliable on web during first paint; pathname matches the real URL. */
  const isPublicRoute = pathnameIsAdminPublic(pathname);
  const canListen = Boolean(user && isFirestoreAdminUser(profile, user.uid, idTokenClaims));

  const kitchenStaffOk = role === 'kitchen' && pathnameAllowsKitchenStaff(pathname);

  if (loading && !isPublicRoute && !authBypass) {
    return (
      <View style={[styles.boot, styles.adminShell]}>
        <ActivityIndicator size="large" color={GREEN} />
      </View>
    );
  }

  if (!loading && !isPublicRoute && !authBypass) {
    if (!user) {
      return <RedirectGate href="/admin/login" />;
    }
    if (role === 'kitchen' && !kitchenStaffOk) {
      return <RedirectGate href="/admin/kitchen" />;
    }
    if (role !== 'admin' && role !== 'kitchen') {
      return <RedirectGate href="/admin/login" />;
    }
  }

  return (
    <View style={styles.adminShell}>
      {!loading && canListen ? <AdminNotificationListener /> : null}
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: GREEN },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '900' },
          contentStyle: styles.stackContent,
        }}
      >
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ title: 'Kitchen admin', headerShown: false }} />
        <Stack.Screen name="orders" options={{ title: 'Orders' }} />
        <Stack.Screen name="kitchen" options={{ title: 'Kitchen' }} />
        <Stack.Screen name="riders" options={{ title: 'Riders' }} />
        <Stack.Screen name="payments" options={{ title: 'Payments' }} />
        <Stack.Screen name="analytics" options={{ title: 'Analytics' }} />
        <Stack.Screen name="order-management" options={{ title: 'Order management' }} />
        <Stack.Screen name="generate-reset-link" options={{ title: 'Reset link (staff)' }} />
        <Stack.Screen name="chat" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}

const webMinFull: ViewStyle = { minHeight: '100dvh' as never };

const styles = StyleSheet.create({
  /** Web: parent stack used minHeight 0 — nested admin stack could collapse to blank without a floor. */
  adminShell: {
    flex: 1,
    alignSelf: 'stretch',
    width: '100%',
    ...Platform.select({
      web: {
        ...webMinFull,
        height: '100%',
      },
      default: {},
    }),
  },
  stackContent: {
    flex: 1,
    ...Platform.select({
      web: {
        flexGrow: 1,
        ...webMinFull,
      },
      default: {},
    }),
  },
  boot: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' },
});
