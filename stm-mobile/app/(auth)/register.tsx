/**
 * Register — creates Firebase Auth user + `users/{uid}` doc (same as web).
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
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/src/services/firebase';

const GREEN = '#013220';
const GOLD = '#D4AF37';

function validateEmail(email: string) {
  const t = email.trim();
  if (!t) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) return 'Enter a valid email';
  return '';
}

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setError('');
    const eErr = validateEmail(email);
    if (eErr) {
      setError(eErr);
      return;
    }
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setBusy(true);
    const safeEmail = email.trim().toLowerCase();
    try {
      const { user } = await createUserWithEmailAndPassword(auth, safeEmail, password);
      try {
        await sendEmailVerification(user);
      } catch {
        /* non-blocking */
      }
      await updateProfile(user, { displayName: name.trim() });
      const userRef = doc(db, 'users', user.uid);
      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: name.trim(),
          email: safeEmail,
          phone: phone.trim() || '',
          role: 'user',
          createdAt: serverTimestamp(),
        });
      }
      router.replace('/(tabs)/home');
    } catch (err: unknown) {
      const code =
        err && typeof err === 'object' && 'code' in err ? String((err as { code: string }).code) : '';
      if (code === 'auth/email-already-in-use') {
        setError('Email already registered. Sign in instead.');
      } else if (code === 'auth/weak-password') {
        setError('Password is too weak.');
      } else {
        setError('Could not register. Try again.');
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <TouchableOpacity onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backTxt}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.head}>Create account</Text>
        <Text style={styles.sub}>Join STM Salam for faster checkout</Text>

        {error ? (
          <View style={styles.err}>
            <Text style={styles.errText}>{error}</Text>
          </View>
        ) : null}

        <Text style={styles.label}>Full name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Your name" placeholderTextColor="#94A3B8" />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="you@email.com"
          placeholderTextColor="#94A3B8"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Phone (optional)</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="91234567"
          placeholderTextColor="#94A3B8"
          keyboardType="phone-pad"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Min 6 characters"
          placeholderTextColor="#94A3B8"
          secureTextEntry
        />
        <Text style={styles.label}>Confirm password</Text>
        <TextInput
          style={styles.input}
          value={confirm}
          onChangeText={setConfirm}
          placeholder="Repeat password"
          placeholderTextColor="#94A3B8"
          secureTextEntry
        />

        <TouchableOpacity style={[styles.primary, busy && styles.off]} onPress={submit} disabled={busy}>
          {busy ? <ActivityIndicator color={GREEN} /> : <Text style={styles.primaryTxt}>Register</Text>}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#F8FAFC' },
  scroll: { padding: 24, paddingTop: Platform.OS === 'ios' ? 52 : 40, paddingBottom: 40 },
  back: { marginBottom: 12, alignSelf: 'flex-start' },
  backTxt: { color: GREEN, fontWeight: '800', fontSize: 16 },
  head: { fontSize: 28, fontWeight: '900', color: GREEN },
  sub: { marginTop: 8, fontSize: 14, color: '#64748B', fontWeight: '600', marginBottom: 16 },
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
  primary: {
    backgroundColor: GOLD,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  primaryTxt: { color: GREEN, fontWeight: '900', fontSize: 16 },
  off: { opacity: 0.7 },
});
