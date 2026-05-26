import React, { memo, useCallback } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Platform,
  Pressable,
  Alert,
} from 'react-native';
import { useAuth } from '@/src/context/AuthContext';

const LOADING_MSG = 'Starting…';
const ERROR_HINT = 'Close and reopen the app, or check your connection.';

type BootstrapOverlayProps = {
  variant: 'loading' | 'error';
  errorText: string | null;
  onReloadPress?: () => void;
};

/**
 * Blocks pointer interaction while auth bootstraps. Sits above the navigator in the
 * same flex root so it covers the full screen on native + web (`position: fixed` on web).
 */
const BootstrapOverlay = memo(function BootstrapOverlay({
  variant,
  errorText,
  onReloadPress,
}: BootstrapOverlayProps) {
  return (
    <View
      style={styles.overlay}
      pointerEvents="auto"
      collapsable={false}
      accessibilityViewIsModal
      importantForAccessibility="yes"
    >
      {variant === 'loading' ? (
        <>
          <ActivityIndicator size="large" color="#013220" accessibilityLabel={LOADING_MSG} />
          <Text style={styles.muted}>{LOADING_MSG}</Text>
        </>
      ) : (
        <>
          {errorText ? <Text style={styles.err}>{errorText}</Text> : null}
          <Text style={styles.muted}>{ERROR_HINT}</Text>
          {onReloadPress ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Reload app"
              onPress={onReloadPress}
              style={({ pressed }) => [styles.reloadBtn, pressed && styles.reloadBtnPressed]}
            >
              <Text style={styles.reloadTxt}>Reload app</Text>
            </Pressable>
          ) : null}
        </>
      )}
    </View>
  );
});

async function reloadApplication(): Promise<void> {
  if (Platform.OS === 'web') {
    const webLocation = (globalThis as {
      location?: { pathname?: string; assign?: (url: string) => void };
    }).location;
    if (webLocation?.assign && webLocation.pathname !== '/') {
      webLocation.assign('/');
    }
    return;
  }
  try {
    const Updates = await import('expo-updates');
    await Updates.reloadAsync();
  } catch {
    Alert.alert('Reload failed', 'Please close and reopen the app.');
  }
}

/**
 * Never withhold the Expo Router tree — children (Stack) always mount first frame.
 *
 * Overlay rules:
 * - Loading: `!authReady` only (bootstrap in flight).
 * - Error: `authReady && authBootstrapError` so a fatal bootstrap error never keeps the
 *   loading overlay stuck after `authReady` flips true, and the user can reload.
 */
export default function AuthReadyGate({ children }: { children: React.ReactNode }) {
  const { authReady, authBootstrapError } = useAuth();

  const showLoading = !authReady;
  const showError = authReady && !!authBootstrapError;

  const onReloadPress = useCallback(() => {
    void reloadApplication();
  }, []);

  return (
    <View style={styles.root} collapsable={false}>
      {children}
      {showLoading ? <BootstrapOverlay variant="loading" errorText={null} /> : null}
      {showError ? (
        <BootstrapOverlay variant="error" errorText={authBootstrapError} onReloadPress={onReloadPress} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 24,
    zIndex: 9999,
    elevation: 9999,
    ...Platform.select({
      web: {
        position: 'fixed' as never,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      default: { ...StyleSheet.absoluteFillObject },
    }),
  },
  muted: {
    marginTop: 12,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '600',
  },
  err: {
    color: '#b91c1c',
    fontWeight: '800',
    textAlign: 'center',
    fontSize: 16,
  },
  reloadBtn: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
    backgroundColor: '#013220',
  },
  reloadBtnPressed: {
    opacity: 0.88,
  },
  reloadTxt: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
});
