import React, { useMemo, useState } from 'react';
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
import { navReplaceUnsafe } from '@/src/navigation/appNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/src/context/AuthContext';
import { Brand, cardShadow } from '@/src/theme/brand';
import { friendlyFirebaseAuthMessage } from '@/src/utils/firebaseAuthErrors';
import {
  validateEmailFormat,
  validateSignupPassword,
  passwordRulesSummary,
} from '@/src/utils/passwordRules';
import StmLogoPlate from '@/src/components/stm/StmLogoPlate';
import PasswordField from '@/src/components/auth/PasswordField';

const GREEN = Brand.green;
const BORDER = 'rgba(1, 50, 32, 0.14)';
const INPUT_BG = '#FFFFFF';

export default function RegisterScreen() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const pwdCheck = useMemo(() => validateSignupPassword(password), [password]);

  const onSubmit = async () => {
    setErr('');
    if (!name.trim()) {
      setErr('Enter your name.');
      return;
    }
    if (!email.trim()) {
      setErr('Enter your email address.');
      return;
    }
    if (!validateEmailFormat(email)) {
      setErr('Enter a valid email address.');
      return;
    }
    if (!pwdCheck.ok) {
      setErr(`Password must include: ${pwdCheck.errors.join('; ')}.`);
      return;
    }
    if (password !== passwordAgain) {
      setErr('Passwords do not match. Re-enter the same password.');
      return;
    }
    setBusy(true);
    try {
      await signUp(email, password, name);
      navReplaceUnsafe(router, { kind: 'tabs' });
    } catch (e: unknown) {
      setErr(friendlyFirebaseAuthMessage(e, 'Could not complete sign-up. Please try again.'));
    } finally {
      setBusy(false);
    }
  };

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
          <View style={styles.hero}>
            <StmLogoPlate logoSize={108} style={styles.logoPlate} />
            <Text style={styles.title}>Sign up</Text>
            <Text style={styles.subtitle}>Join STM Salam</Text>
          </View>

          <View style={[styles.card, cardShadow]}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor={Brand.muted}
              textContentType="name"
              autoComplete="name"
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              placeholder="you@email.com"
              placeholderTextColor={Brand.muted}
              autoCorrect={false}
              textContentType="emailAddress"
              autoComplete="email"
            />
            <Text style={styles.label}>Password</Text>
            <Text style={styles.ruleHint}>{passwordRulesSummary()}</Text>
            <PasswordField
              value={password}
              onChangeText={setPassword}
              placeholder="Create password"
              textContentType="newPassword"
              autoComplete="password-new"
              returnKeyType="next"
            />
            {password.length > 0 && !pwdCheck.ok ? (
              <Text style={styles.ruleWarn}>Still needed: {pwdCheck.errors.join(' · ')}</Text>
            ) : null}
            <Text style={styles.label}>Re-enter password</Text>
            <PasswordField
              value={passwordAgain}
              onChangeText={setPasswordAgain}
              placeholder="Same password again"
              textContentType="newPassword"
              autoComplete="password-new"
              returnKeyType="go"
              onSubmitEditing={onSubmit}
            />
            {err ? <Text style={styles.err}>{err}</Text> : null}
            <TouchableOpacity style={styles.primary} onPress={onSubmit} disabled={busy} activeOpacity={0.88}>
              {busy ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.primaryText}>Sign up</Text>
              )}
            </TouchableOpacity>
            <Link href="/login" asChild>
              <TouchableOpacity style={styles.linkWrap} activeOpacity={0.8}>
                <Text style={styles.link}>Already a member? Sign in</Text>
              </TouchableOpacity>
            </Link>
          </View>
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
  ruleHint: {
    fontSize: 12,
    fontWeight: '600',
    color: Brand.muted,
    marginBottom: 8,
    lineHeight: 17,
  },
  ruleWarn: {
    fontSize: 12,
    fontWeight: '700',
    color: '#b45309',
    marginTop: -8,
    marginBottom: 10,
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
  linkWrap: { marginTop: 20, alignItems: 'center', paddingVertical: 4 },
  link: { color: GREEN, fontWeight: '800', fontSize: 14 },
});
