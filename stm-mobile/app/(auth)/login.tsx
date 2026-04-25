/**
 * Login + guest — existing Firebase Auth (no backend changes).
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/src/services/firebase';
import { useAuth } from '@/src/context/AuthContext';

const GREEN = '#013220';
const GOLD = '#D4AF37';

function validateEmail(email: string) {
  const t = email.trim();
  if (!t) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) return 'Enter a valid email';
  return '';
}

export default function LoginScreen() {
  const router = useRouter();
  const { loginAsGuest } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const onLogin = async () => {
    setError('');
    const eErr = validateEmail(email);
    if (eErr) {
      setError(eErr);
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }
    setBusy(true);
    const safeEmail = email.trim().toLowerCase();
    try {
      await signInWithEmailAndPassword(auth, safeEmail, password);
    } catch (err: unknown) {
      const code =
        err && typeof err === 'object' && 'code' in err ? String((err as { code: string }).code) : '';
      if (
        code === 'auth/user-not-found' ||
        code === 'auth/invalid-email' ||
        code === 'auth/invalid-credential' ||
        code === 'auth/wrong-password'
      ) {
        setError('Invalid email or password.');
      } else if (code === 'auth/too-many-requests') {
        setError('Too many attempts. Try again later.');
      } else if (code === 'auth/network-request-failed') {
        setError('Network error. Check your connection.');
      } else {
        setError('Sign in failed. Try again.');
      }
    } finally {
      setBusy(false);
    }
  };

  const onGuest = async () => {
    setError('');
    setBusy(true);
    try {
      await loginAsGuest();
    } finally {
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.head}>Welcome back</Text>
        <Text style={styles.sub}>Sign in to order from STM Salam</Text>

        {error ? (
          <View style={styles.err}>
            <Text style={styles.errText}>{error}</Text>
          </View>
        ) : null}

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="you@email.com"
          placeholderTextColor="#94A3B8"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor="#94A3B8"
          secureTextEntry={!showPass}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPass(!showPass)} style={styles.toggle}>
          <Text style={styles.toggleTxt}>{showPass ? 'Hide' : 'Show'} password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.primary, busy && styles.off]} onPress={onLogin} disabled={busy}>
          {busy ? <ActivityIndicator color={GREEN} /> : <Text style={styles.primaryTxt}>Sign in</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={() => router.push('/(auth)/register')}>
          <Text style={styles.linkTxt}>New here? Create an account</Text>
        </TouchableOpacity>

        <View style={styles.divider} />
        <Text style={styles.guestHint}>No account needed to browse and order.</Text>
        <TouchableOpacity style={styles.secondary} onPress={onGuest} disabled={busy}>
          <Text style={styles.secondaryTxt}>Continue as guest</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#F8FAFC' },
  scroll: { padding: 24, paddingTop: Platform.OS === 'ios' ? 64 : 48, paddingBottom: 40 },
  head: { fontSize: 28, fontWeight: '900', color: GREEN },
  sub: { marginTop: 8, fontSize: 14, color: '#64748B', fontWeight: '600', marginBottom: 20 },
  err: {
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  errText: { color: '#DC2626', fontWeight: '700' },
  label: { fontSize: 12, fontWeight: '800', color: '#64748B', marginTop: 10 },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 14 : 12,
    marginTop: 6,
    fontWeight: '600',
    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  toggle: { alignSelf: 'flex-end', marginTop: 6 },
  toggleTxt: { color: GREEN, fontWeight: '800', fontSize: 13 },
  primary: {
    backgroundColor: GOLD,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 22,
  },
  primaryTxt: { color: GREEN, fontWeight: '900', fontSize: 16 },
  off: { opacity: 0.7 },
  link: { marginTop: 18, alignItems: 'center' },
  linkTxt: { color: GREEN, fontWeight: '800' },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 28 },
  guestHint: { textAlign: 'center', color: '#64748B', fontWeight: '600', fontSize: 13 },
  secondary: {
    marginTop: 14,
    borderWidth: 2,
    borderColor: GREEN,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryTxt: { color: GREEN, fontWeight: '900', fontSize: 15 },
});
