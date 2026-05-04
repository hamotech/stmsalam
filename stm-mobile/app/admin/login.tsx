/**
 * Admin staff login — Firebase Auth + Firestore users/{uid} (role + isAdmin).
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/src/services/firebase';
import { useAuth } from '@/src/context/AuthContext';
import { isAdminAccessAllowed, isFirestoreAdminUser } from '@/src/admin/adminAuth';
import { adminSignInErrorMessage } from '@/src/utils/firebaseAuthErrors';
import { validateEmailFormat } from '@/src/utils/passwordRules';
import PasswordField from '@/src/components/auth/PasswordField';
import { Brand, cardShadow } from '@/src/theme/brand';

const GREEN = Brand.green;

export default function AdminLoginScreen() {
  const router = useRouter();
  const { user, profile, idTokenClaims, loading: authLoading, refreshIdTokenClaims } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (authLoading) return;
    if (user && isFirestoreAdminUser(profile, user.uid, idTokenClaims)) {
      router.replace('/admin');
    }
  }, [authLoading, user, profile, idTokenClaims, router]);

  const onSubmit = async () => {
    setErr('');
    const e = email.trim();
    if (!validateEmailFormat(e)) {
      setErr('Enter a valid email address.');
      return;
    }
    if (!password) {
      setErr('Enter your password.');
      return;
    }
    setBusy(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, e, password);
      const tokenResult = await cred.user.getIdTokenResult();
      const snap = await getDoc(doc(db, 'users', cred.user.uid));
      const data = snap.exists() ? (snap.data() as Record<string, unknown>) : null;
      if (!isAdminAccessAllowed(tokenResult.claims as Record<string, unknown>, data, cred.user.uid)) {
        await signOut(auth);
        setErr('Access denied. This account is not authorized for admin.');
        return;
      }
      await cred.user.getIdToken(true);
      await refreshIdTokenClaims();
      router.replace('/admin');
    } catch (unknownErr) {
      setErr(adminSignInErrorMessage(unknownErr));
    } finally {
      setBusy(false);
    }
  };

  if (authLoading) {
    return (
      <View style={[styles.centered, Platform.OS === 'web' && styles.centeredWeb]}>
        <ActivityIndicator size="large" color={GREEN} />
        <Text style={styles.loadingHint}>Loading…</Text>
      </View>
    );
  }

  const emailTrimmed = email.trim();

  return (
    <>
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
            <View style={styles.hero}>
              <Text style={styles.kicker}>STM Salam</Text>
              <Text style={styles.title}>Admin sign in</Text>
              <Text style={styles.subtitle}>Staff dashboard — Firebase secured</Text>
            </View>

            <View style={[styles.card, cardShadow]}>
              <Text style={styles.label}>Work email</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                placeholder="admin@company.com"
                placeholderTextColor={Brand.muted}
                autoCorrect={false}
                textContentType="username"
                autoComplete="email"
              />
              <Text style={styles.label}>Password</Text>
              <PasswordField
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                textContentType="password"
                autoComplete="password"
                returnKeyType="go"
                onSubmitEditing={onSubmit}
              />
              {err ? <Text style={styles.err}>{err}</Text> : null}
              <TouchableOpacity style={styles.primary} onPress={onSubmit} disabled={busy} activeOpacity={0.88}>
                {busy ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryText}>Sign in</Text>}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.linkWrap}
                activeOpacity={0.8}
                onPress={() =>
                  router.push({
                    pathname: '/admin/forgot-password',
                    params: emailTrimmed ? { email: emailTrimmed } : {},
                  })
                }
              >
                <Text style={styles.link}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#FFFFFF' },
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' },
  centeredWeb: { minHeight: 480 },
  loadingHint: { marginTop: 14, fontSize: 15, fontWeight: '700', color: Brand.muted },
  scroll: {
    paddingHorizontal: Brand.space,
    paddingTop: 12,
    paddingBottom: 32,
  },
  hero: { alignItems: 'center', marginBottom: 24 },
  kicker: { fontSize: 12, fontWeight: '800', color: Brand.muted, letterSpacing: 1.2, marginBottom: 6 },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: GREEN,
    letterSpacing: -0.5,
  },
  subtitle: { marginTop: 8, fontSize: 14, color: Brand.muted, fontWeight: '600', textAlign: 'center' },
  card: {
    backgroundColor: '#fff',
    borderRadius: Brand.radiusLg,
    padding: Brand.space,
    borderWidth: 1,
    borderColor: 'rgba(1, 50, 32, 0.1)',
  },
  label: { fontSize: 12, fontWeight: '800', color: GREEN, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(1, 50, 32, 0.14)',
    borderRadius: Brand.radiusMd,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 14,
    backgroundColor: '#FAFAFA',
  },
  err: { color: '#B91C1C', fontWeight: '700', marginBottom: 12, fontSize: 14 },
  primary: {
    backgroundColor: GREEN,
    paddingVertical: 14,
    borderRadius: Brand.radiusMd,
    alignItems: 'center',
    marginTop: 4,
  },
  primaryText: { color: '#fff', fontWeight: '900', fontSize: 16 },
  linkWrap: { marginTop: 18, alignItems: 'center' },
  link: { color: GREEN, fontWeight: '800', fontSize: 14 },
});
