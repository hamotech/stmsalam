/**
 * Complete password reset after user opens Firebase email link (oobCode).
 * Validates code with verifyPasswordResetCode before allowing confirmPasswordReset.
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  verifyPasswordResetCode,
  confirmPasswordReset,
} from 'firebase/auth';
import { auth } from '@/src/services/firebase';
import { Brand, cardShadow } from '@/src/theme/brand';
import PasswordField from '@/src/components/auth/PasswordField';
import { validateSignupPassword } from '@/src/utils/passwordRules';
import {
  authErrorCode,
  mapConfirmPasswordResetError,
} from '@/src/utils/passwordResetErrors';
import { logPasswordResetConfirmOutcome } from '@/src/telemetry/passwordResetTelemetry';

const GREEN = Brand.green;

type Phase = 'loading' | 'ready' | 'invalid' | 'missing';

export type ResetPasswordScreenProps = {
  oobCode: string;
  /** Navigate after success (e.g. login). */
  onSuccess: () => void;
  /** When code invalid / missing. */
  onRequestNewLink: () => void;
};

export default function ResetPasswordScreen({
  oobCode,
  onSuccess,
  onRequestNewLink,
}: ResetPasswordScreenProps) {
  const [phase, setPhase] = useState<Phase>(() => (oobCode.trim() ? 'loading' : 'missing'));
  const [maskedEmail, setMaskedEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const code = oobCode.trim();
    if (!code) {
      setPhase('missing');
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const email = await verifyPasswordResetCode(auth, code);
        if (!cancelled) {
          const [u, domain] = email.split('@');
          const safe =
            u.length <= 2 ? '••@' + domain : u.slice(0, 2) + '••@' + domain;
          setMaskedEmail(safe);
          setPhase('ready');
        }
      } catch (e) {
        const c = authErrorCode(e);
        logPasswordResetConfirmOutcome(false, c);
        if (!cancelled) {
          setPhase('invalid');
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [oobCode]);

  const submit = async () => {
    setErr('');
    const code = oobCode.trim();
    const check = validateSignupPassword(password);
    if (!check.ok) {
      setErr(`Password must include: ${check.errors.join('; ')}.`);
      return;
    }
    if (password !== passwordAgain) {
      setErr('Passwords do not match.');
      return;
    }
    setBusy(true);
    try {
      await confirmPasswordReset(auth, code, password);
      logPasswordResetConfirmOutcome(true);
      onSuccess();
    } catch (e) {
      const c = authErrorCode(e);
      logPasswordResetConfirmOutcome(false, c);
      setErr(mapConfirmPasswordResetError(e));
    } finally {
      setBusy(false);
    }
  };

  if (phase === 'loading') {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={GREEN} />
        <Text style={styles.muted}>Verifying reset link…</Text>
      </View>
    );
  }

  if (phase === 'missing' || phase === 'invalid') {
    return (
      <View style={styles.centerPadded}>
        <Text style={styles.title}>Link not usable</Text>
        <Text style={styles.muted}>
          {phase === 'missing'
            ? 'Open this screen from the password reset email link.'
            : 'This link is invalid or expired. Request a new reset email.'}
        </Text>
        <TouchableOpacity style={styles.secondary} onPress={onRequestNewLink} activeOpacity={0.88}>
          <Text style={styles.secondaryText}>Request new link</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.flexKb}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollInner}
      >
        <View style={styles.hero}>
          <Text style={styles.title}>Choose a new password</Text>
          {maskedEmail ? (
            <Text style={styles.subtitle}>Account: {maskedEmail}</Text>
          ) : null}
        </View>

        <View style={[styles.card, cardShadow]}>
          <Text style={[styles.label, styles.labelFirst]}>New password</Text>
          <PasswordField
            value={password}
            onChangeText={setPassword}
            placeholder="New password"
            textContentType="newPassword"
            autoComplete="password-new"
            returnKeyType="next"
          />
          <Text style={[styles.label, styles.labelAfterField]}>Confirm password</Text>
          <PasswordField
            value={passwordAgain}
            onChangeText={setPasswordAgain}
            placeholder="Confirm password"
            textContentType="newPassword"
            autoComplete="password-new"
            returnKeyType="go"
            onSubmitEditing={() => void submit()}
          />
          {err ? <Text style={styles.err}>{err}</Text> : null}
          <TouchableOpacity
            style={[styles.primary, busy && styles.primaryDisabled]}
            onPress={() => void submit()}
            disabled={busy}
            activeOpacity={0.88}
          >
            {busy ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.primaryText}>Update password</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flexKb: { flex: 1 },
  scrollInner: { paddingBottom: 24 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  centerPadded: { flex: 1, justifyContent: 'center', padding: 24 },
  hero: { alignItems: 'center', marginBottom: 20 },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: GREEN,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Brand.muted,
    fontWeight: '600',
    textAlign: 'center',
  },
  muted: {
    marginTop: 12,
    fontSize: 14,
    color: Brand.muted,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: Brand.radiusLg,
    padding: Brand.space,
    borderWidth: 1,
    borderColor: 'rgba(1, 50, 32, 0.1)',
  },
  label: { fontSize: 12, fontWeight: '800', color: GREEN, marginBottom: 6 },
  labelFirst: { marginTop: 0 },
  labelAfterField: { marginTop: 8 },
  err: { color: '#B91C1C', fontWeight: '700', marginBottom: 12, fontSize: 14, marginTop: 8 },
  primary: {
    backgroundColor: GREEN,
    paddingVertical: 14,
    borderRadius: Brand.radiusMd,
    alignItems: 'center',
    marginTop: 16,
  },
  primaryDisabled: { opacity: 0.85 },
  primaryText: { color: '#fff', fontWeight: '900', fontSize: 16 },
  secondary: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: Brand.radiusMd,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: GREEN,
  },
  secondaryText: { color: GREEN, fontWeight: '800', fontSize: 16 },
});
