import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useAuth } from '@/src/context/AuthContext';

/**
 * Blocks the navigation tree until anonymous (or restored) auth bootstrap completes.
 */
export default function AuthReadyGate({ children }: { children: React.ReactNode }) {
  const { authReady, authBootstrapError } = useAuth();

  if (!authReady) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#013220" />
        <Text style={styles.muted}>Starting…</Text>
      </View>
    );
  }

  if (authBootstrapError) {
    return (
      <View style={styles.center}>
        <Text style={styles.err}>{authBootstrapError}</Text>
        <Text style={styles.muted}>Close and reopen the app, or check your connection.</Text>
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 24 },
  muted: { marginTop: 12, color: '#64748b', textAlign: 'center', fontWeight: '600' },
  err: { color: '#b91c1c', fontWeight: '800', textAlign: 'center', fontSize: 16 },
});
