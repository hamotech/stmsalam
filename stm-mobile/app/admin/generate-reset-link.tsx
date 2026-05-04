/**
 * Staff helper: copy the CLI that generates a Firebase password-reset link (Admin SDK).
 * Links are secrets — generate only on trusted machines with GOOGLE_APPLICATION_CREDENTIALS.
 */

import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share,
  Alert,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/src/context/AuthContext';
import { useAppRole } from '@/src/auth/useAppRole';
import { validateEmailFormat } from '@/src/utils/passwordRules';
import { Brand } from '@/src/theme/brand';

const GREEN = '#013220';

export default function AdminGenerateResetLinkScreen() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const role = useAppRole();
  const [email, setEmail] = useState('');
  const [err, setErr] = useState('');

  const command = useMemo(() => {
    const e = email.trim().toLowerCase();
    if (!e) {
      return 'node scripts/generate-password-reset-link.cjs --email user@example.com';
    }
    return `node scripts/generate-password-reset-link.cjs --email ${e}`;
  }, [email]);

  const onShare = async () => {
    try {
      await Share.share({
        message: command,
        title: 'Password reset CLI',
      });
    } catch {
      Alert.alert('Share', 'Could not open share sheet.');
    }
  };

  if (loading || !user || role !== 'admin') {
    return (
      <View style={styles.boot}>
        <Text style={styles.muted}>Admin only.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.lead}>
          Password reset links must be created with the Firebase Admin SDK on a secure machine (never in the
          client). Enter the customer or staff email, then copy the command and run it where your service account
          JSON is configured.
        </Text>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={(t) => {
            setEmail(t);
            setErr('');
          }}
          placeholder="user@example.com"
          placeholderTextColor={Brand.muted}
        />
        {err ? <Text style={styles.err}>{err}</Text> : null}
        <Text style={styles.monoLabel}>Command (select & copy)</Text>
        <Text style={styles.mono} selectable>
          {command}
        </Text>
        <TouchableOpacity
          style={styles.primary}
          onPress={() => {
            const e = email.trim();
            if (e && !validateEmailFormat(e)) {
              setErr('Enter a valid email');
              return;
            }
            void onShare();
          }}
          activeOpacity={0.88}
        >
          <Text style={styles.primaryText}>Share / copy command</Text>
        </TouchableOpacity>
        <Text style={styles.hint}>
          Requires: GOOGLE_APPLICATION_CREDENTIALS and firebase-admin (see script header in repo
          scripts/generate-password-reset-link.cjs).
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8FAFC' },
  scroll: { padding: 16, paddingBottom: 32 },
  boot: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  muted: { color: '#64748B', fontWeight: '700' },
  backBtn: { marginTop: 16, padding: 12 },
  backBtnText: { color: GREEN, fontWeight: '800' },
  lead: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
    marginBottom: 20,
    fontWeight: '600',
  },
  label: { fontSize: 12, fontWeight: '800', color: GREEN, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(1, 50, 32, 0.2)',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  err: { color: '#B91C1C', fontWeight: '700', marginBottom: 12 },
  monoLabel: { fontSize: 12, fontWeight: '800', color: GREEN, marginTop: 8, marginBottom: 6 },
  mono: {
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }),
    fontSize: 13,
    color: '#0f172a',
    backgroundColor: '#e2e8f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  primary: {
    backgroundColor: GREEN,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryText: { color: '#fff', fontWeight: '900', fontSize: 16 },
  hint: { marginTop: 16, fontSize: 12, color: '#64748B', lineHeight: 18 },
});
