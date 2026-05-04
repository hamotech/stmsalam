/**
 * Full-screen (or embedded) forgot-password flow: sendPasswordResetEmail + generic success copy.
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
import { Link } from 'expo-router';
import { useAuth } from '@/src/context/AuthContext';
import { Brand, cardShadow } from '@/src/theme/brand';
import {
  authErrorCode,
  mapPasswordResetRequestError,
} from '@/src/utils/passwordResetErrors';
import { validateEmailFormat } from '@/src/utils/passwordRules';
import {
  logPasswordResetRequested,
  logPasswordResetSendOutcome,
} from '@/src/telemetry/passwordResetTelemetry';

const GREEN = Brand.green;

/** Same message for success and for benign Firebase responses — does not reveal if the email exists. */
export const PASSWORD_RESET_GENERIC_SUCCESS =
  'If an account exists, a reset link has been sent.';

const RESEND_COOLDOWN_SEC = 30;

export type ForgotPasswordScreenProps = {
  initialEmail?: string;
  loginEmailHint?: string;
  onClosePress?: () => void;
  footer?: React.ReactNode;
  compact?: boolean;
  /** Full-screen: show link back to sign-in (e.g. /login or /admin/login). */
  backToLoginHref?: string;
  backToLoginLabel?: string;
};

export default function ForgotPasswordScreen({
  initialEmail = '',
  loginEmailHint = '',
  onClosePress,
  footer,
  compact,
  backToLoginHref,
  backToLoginLabel = 'Back to sign in',
}: ForgotPasswordScreenProps) {
  const { sendPasswordResetEmail } = useAuth();
  const [email, setEmail] = useState(initialEmail.trim());
  const [err, setErr] = useState('');
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);
  /** Seconds remaining before resend is allowed; 0 = can send / resend. */
  const [cooldownSec, setCooldownSec] = useState(0);

  useEffect(() => {
    setEmail(initialEmail.trim());
  }, [initialEmail]);

  useEffect(() => {
    if (cooldownSec <= 0) return;
    const t = setInterval(() => {
      setCooldownSec((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => clearInterval(t);
  }, [cooldownSec]);

  const hint = loginEmailHint.trim();
  const showUseHint =
    hint.length > 0 && email.trim().toLowerCase() !== hint.toLowerCase();

  const startCooldown = () => {
    setCooldownSec(RESEND_COOLDOWN_SEC);
  };

  const resetFormForDifferentEmail = () => {
    setOk(false);
    setErr('');
    setEmail('');
    setCooldownSec(0);
  };

  const submit = async () => {
    setErr('');
    setOk(false);
    const e = email.trim();
    if (!e) {
      setErr('Enter your email');
      return;
    }
    if (!validateEmailFormat(e)) {
      setErr('Enter a valid email');
      return;
    }
    setBusy(true);
    logPasswordResetRequested();
    try {
      await sendPasswordResetEmail(e);
      logPasswordResetSendOutcome(true);
      setOk(true);
      startCooldown();
    } catch (unknownErr) {
      const mapped = mapPasswordResetRequestError(unknownErr);
      if (mapped === null) {
        logPasswordResetSendOutcome(true);
        setOk(true);
        startCooldown();
      } else {
        logPasswordResetSendOutcome(false, authErrorCode(unknownErr));
        setErr(mapped);
      }
    } finally {
      setBusy(false);
    }
  };

  const sendDisabled = busy || cooldownSec > 0;
  const isResend = ok;
  const primaryLabel =
    cooldownSec > 0
      ? `Resend in ${cooldownSec}s`
      : isResend
        ? 'Resend link'
        : 'Send reset link';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={compact ? styles.embedKb : styles.flexKb}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollInner, compact && styles.scrollCompact]}
      >
        {onClosePress ? (
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Reset password</Text>
            <TouchableOpacity
              onPress={onClosePress}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel="Close"
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.hero}>
            <Text style={styles.title}>Reset password</Text>
            <Text style={styles.subtitle}>
              We never confirm whether an email is registered — you will see the same message every time.
            </Text>
          </View>
        )}

        {backToLoginHref && !compact ? (
          <Link href={backToLoginHref} asChild>
            <TouchableOpacity style={styles.backToLoginWrap} activeOpacity={0.85}>
              <Text style={styles.backToLoginText}>← {backToLoginLabel}</Text>
            </TouchableOpacity>
          </Link>
        ) : null}

        {onClosePress ? (
          <Text style={styles.modalBlurb}>Enter your account email.</Text>
        ) : null}

        <View style={[styles.card, cardShadow, compact && styles.cardCompact]}>
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
            autoComplete="email"
            editable={!busy}
          />

          {showUseHint ? (
            <TouchableOpacity
              style={styles.hintBtn}
              onPress={() => setEmail(hint)}
              disabled={busy}
              activeOpacity={0.85}
            >
              <Text style={styles.hintBtnText}>Use email from sign-in</Text>
            </TouchableOpacity>
          ) : null}

          {err ? <Text style={styles.err}>{err}</Text> : null}
          {ok ? (
            <View style={styles.successBox}>
              <Text style={styles.successTitle}>Check your inbox</Text>
              <Text style={styles.success}>{PASSWORD_RESET_GENERIC_SUCCESS}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={[styles.primary, sendDisabled && styles.primaryDisabled]}
            onPress={() => void submit()}
            disabled={sendDisabled}
            activeOpacity={0.88}
          >
            {busy ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.primaryText}>{primaryLabel}</Text>
            )}
          </TouchableOpacity>

          {ok ? (
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={resetFormForDifferentEmail}
              disabled={busy}
              activeOpacity={0.88}
            >
              <Text style={styles.secondaryBtnText}>Try different email</Text>
            </TouchableOpacity>
          ) : null}

          {footer}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flexKb: { flex: 1 },
  embedKb: { width: '100%' },
  scrollInner: { paddingBottom: 24 },
  scrollCompact: { paddingTop: 4 },
  backToLoginWrap: {
    alignSelf: 'flex-start',
    marginBottom: 14,
    paddingVertical: 6,
  },
  backToLoginText: { color: GREEN, fontWeight: '800', fontSize: 15 },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 2,
  },
  modalTitle: { fontSize: 18, fontWeight: '900', color: GREEN },
  closeText: { fontSize: 20, color: Brand.muted, fontWeight: '700' },
  modalBlurb: {
    fontSize: 13,
    color: Brand.muted,
    fontWeight: '600',
    lineHeight: 18,
    marginBottom: 12,
  },
  hero: { alignItems: 'center', marginBottom: 20 },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: GREEN,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 10,
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
  cardCompact: {
    borderWidth: 0,
    paddingHorizontal: Brand.spaceSm,
    paddingTop: Brand.spaceSm,
  },
  label: { fontSize: 12, fontWeight: '800', color: GREEN, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(1, 50, 32, 0.14)',
    borderRadius: Brand.radiusMd,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: '#FAFAFA',
    color: Brand.text,
  },
  hintBtn: {
    alignSelf: 'flex-start',
    marginBottom: 12,
    paddingVertical: 6,
  },
  hintBtnText: { color: GREEN, fontWeight: '800', fontSize: 14 },
  err: { color: '#B91C1C', fontWeight: '700', marginBottom: 12, fontSize: 14 },
  successBox: {
    backgroundColor: 'rgba(21, 128, 61, 0.08)',
    borderRadius: Brand.radiusMd,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(21, 128, 61, 0.2)',
  },
  successTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#15803D',
    marginBottom: 6,
  },
  success: { color: '#166534', fontWeight: '700', fontSize: 14, lineHeight: 20 },
  primary: {
    backgroundColor: GREEN,
    paddingVertical: 14,
    borderRadius: Brand.radiusMd,
    alignItems: 'center',
    marginTop: 4,
  },
  primaryDisabled: { opacity: 0.65 },
  primaryText: { color: '#fff', fontWeight: '900', fontSize: 16 },
  secondaryBtn: {
    marginTop: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryBtnText: { color: GREEN, fontWeight: '800', fontSize: 15 },
});
