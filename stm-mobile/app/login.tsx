import React, { useState } from 'react';
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
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getIdTokenResult } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth, type UserProfile } from '@/src/context/AuthContext';
import { resolveAppRole, navReplaceUnsafe } from '@/src/navigation/appNavigation';
import { auth, db } from '@/src/services/firebase';
import { Brand, cardShadow } from '@/src/theme/brand';
import { friendlyFirebaseAuthMessage } from '@/src/utils/firebaseAuthErrors';
import { validateEmailFormat } from '@/src/utils/passwordRules';
import StmLogoPlate from '@/src/components/stm/StmLogoPlate';
import PasswordField from '@/src/components/auth/PasswordField';

const GREEN = Brand.green;
const BORDER = 'rgba(1, 50, 32, 0.14)';
const INPUT_BG = '#FFFFFF';

function authErrorCode(e: unknown): string | undefined {
  if (typeof e === 'object' && e !== null && 'code' in e && typeof (e as { code: unknown }).code === 'string') {
    return (e as { code: string }).code;
  }
  return undefined;
}

export default function LoginScreen() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const onSubmit = async () => {
    if (busy) return;
    setErr('');
    const emailTrimmedForAuth = email.trim();
    if (!emailTrimmedForAuth) {
      setErr('Enter your email address.');
      return;
    }
    if (!validateEmailFormat(email)) {
      setErr('Enter a valid email address.');
      return;
    }
    if (!password) {
      setErr('Enter your password.');
      return;
    }
    setBusy(true);
    console.log('[AUTH_START]', { email: emailTrimmedForAuth });
    try {
      await signIn(email, password);
      const u = auth.currentUser;
      if (u) {
        console.log('[AUTH_SUCCESS]', { email: u.email ?? emailTrimmedForAuth, uid: u.uid });
        const [tokenResult, snap] = await Promise.all([
          getIdTokenResult(u),
          getDoc(doc(db, 'users', u.uid)),
        ]);
        const profile = snap.exists() ? (snap.data() as UserProfile) : { email: u.email ?? undefined };
        const role = resolveAppRole(u, profile, tokenResult.claims as Record<string, unknown>);
        if (role === 'admin' || role === 'kitchen') {
          navReplaceUnsafe(router, { kind: 'admin' });
        } else {
          navReplaceUnsafe(router, { kind: 'tabs' });
        }
      } else {
        console.log('[AUTH_SUCCESS]', { email: emailTrimmedForAuth, uid: null });
        navReplaceUnsafe(router, { kind: 'tabs' });
      }
    } catch (e: unknown) {
      const code = authErrorCode(e);
      console.error('[AUTH_FAIL]', { email: emailTrimmedForAuth, code }, e);
      setErr(friendlyFirebaseAuthMessage(e, 'Sign-in failed. Please try again.'));
    } finally {
      setBusy(false);
    }
  };

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
              <StmLogoPlate logoSize={108} style={styles.logoPlate} />
              <Text style={styles.title}>Sign in</Text>
              <Text style={styles.subtitle}>Welcome back to STM Salam</Text>
            </View>

            <View style={[styles.card, cardShadow]}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                testID="login-email-input"
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                placeholder="you@email.com"
                placeholderTextColor={Brand.muted}
                autoCorrect={false}
                textContentType="username"
                autoComplete="email"
                editable={!busy}
              />
              <Text style={styles.label}>Password</Text>
              <PasswordField
                testID="login-password-input"
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                textContentType="password"
                autoComplete="password"
                returnKeyType="go"
                onSubmitEditing={onSubmit}
                editable={!busy}
              />
              {err ? <Text style={styles.err}>{err}</Text> : null}
              <TouchableOpacity
                testID="login-submit-button"
                style={styles.primary}
                onPress={onSubmit}
                disabled={busy}
                activeOpacity={0.88}
              >
                {busy ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.primaryText}>Sign in</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                testID="login-forgot-password"
                style={styles.linkWrap}
                activeOpacity={0.8}
                disabled={busy}
                onPress={() => {
                  if (busy) return;
                  router.push({
                    pathname: '/forgot-password',
                    params: emailTrimmed ? { email: emailTrimmed } : {},
                  });
                }}
              >
                <Text style={styles.link}>Forgot password?</Text>
              </TouchableOpacity>
              <Link href="/register" asChild>
                <TouchableOpacity
                  testID="login-register-button"
                  style={styles.linkWrapSecondary}
                  activeOpacity={0.8}
                  disabled={busy}
                >
                  <Text style={styles.link}>New here? Sign up</Text>
                </TouchableOpacity>
              </Link>
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
  scroll: {
    paddingHorizontal: Brand.space,
    paddingTop: 12,
    paddingBottom: 32,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoPlate: {
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: GREEN,
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: '600',
    color: Brand.muted,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: Brand.radius,
    padding: Brand.space,
    borderWidth: 1.5,
    borderColor: BORDER,
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: GREEN,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    opacity: 0.85,
  },
  input: {
    borderWidth: 1.5,
    borderColor: BORDER,
    borderRadius: Brand.radius,
    padding: 14,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 14,
    backgroundColor: INPUT_BG,
    color: Brand.text,
  },
  err: { color: '#b91c1c', fontWeight: '700', marginBottom: 12 },
  primary: {
    backgroundColor: GREEN,
    borderRadius: Brand.radius,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryText: { color: '#fff', fontWeight: '900', fontSize: 16 },
  linkWrap: { marginTop: 16, alignItems: 'center', paddingVertical: 4 },
  linkWrapSecondary: { marginTop: 8, alignItems: 'center', paddingVertical: 4 },
  link: { color: GREEN, fontWeight: '800', fontSize: 14 },
});
