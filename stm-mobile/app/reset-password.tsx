/**
 * Firebase password reset completion — opened via deep link with oobCode or manual param.
 */

import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import ResetPasswordScreen from '@/src/screens/auth/ResetPasswordScreen';

export default function ResetPasswordRoute() {
  const router = useRouter();
  const { oobCode: raw } = useLocalSearchParams<{ oobCode?: string }>();
  const oobCode = typeof raw === 'string' ? raw : Array.isArray(raw) ? raw[0] : '';

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <View style={styles.flex}>
        <ResetPasswordScreen
          oobCode={oobCode}
          onSuccess={() => {
            router.replace('/login');
          }}
          onRequestNewLink={() => {
            router.replace('/forgot-password');
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  flex: { flex: 1, ...Platform.select({ web: { minHeight: 0 }, default: {} }) },
});
