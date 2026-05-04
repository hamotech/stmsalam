import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import ForgotPasswordScreen from '@/src/screens/auth/ForgotPasswordScreen';
import { Brand } from '@/src/theme/brand';

export default function CustomerForgotPasswordScreen() {
  const { email: emailParam } = useLocalSearchParams<{ email?: string }>();
  const initialEmail = typeof emailParam === 'string' ? emailParam : '';

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <StatusBar style="dark" />
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <ForgotPasswordScreen
            initialEmail={initialEmail}
            loginEmailHint={initialEmail}
            backToLoginHref="/login"
            backToLoginLabel="Back to sign in"
          />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#FFFFFF' },
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: {
    paddingHorizontal: Brand.space,
    paddingTop: 12,
    paddingBottom: 32,
  },
});
