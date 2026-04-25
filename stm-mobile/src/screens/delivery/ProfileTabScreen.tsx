/**
 * Profile — account summary + sign out (single-restaurant customer app).
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/src/context/AuthContext';

const GREEN = '#013220';
const GOLD = '#D4AF37';

export default function ProfileTabScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const pt = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0;

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.header, { paddingTop: pt + 24 }]}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.sub}>STM Salam SG</Text>
      </View>

      <View style={styles.card}>
        {user ? (
          <>
            <Text style={styles.label}>Signed in</Text>
            <Text style={styles.value}>{user.name}</Text>
            {user.email ? <Text style={styles.email}>{user.email}</Text> : null}
            <TouchableOpacity style={styles.outBtn} onPress={() => logout()}>
              <Text style={styles.outTxt}>Sign out</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.label}>Guest mode</Text>
            <Text style={styles.hint}>
              Sign in to sync preferences. You can still order as a guest.
            </Text>
            <TouchableOpacity
              style={styles.primary}
              onPress={() => router.replace('/(auth)/login')}
            >
              <Text style={styles.primaryTxt}>Sign in or register</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.outBtn} onPress={() => logout()}>
              <Text style={styles.outTxt}>Exit guest</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <Text style={styles.footer}>Halal · Singapore</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { paddingBottom: 40 },
  header: {
    backgroundColor: GREEN,
    paddingHorizontal: 24,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  title: { fontSize: 28, fontWeight: '900', color: '#FFF' },
  sub: { marginTop: 6, color: 'rgba(255,255,255,0.7)', fontWeight: '600' },
  card: {
    margin: 20,
    backgroundColor: '#FFF',
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: '#EEF2F6',
  },
  label: { fontSize: 12, fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase' },
  value: { marginTop: 8, fontSize: 22, fontWeight: '900', color: '#0F172A' },
  email: { marginTop: 6, fontSize: 15, color: '#64748B', fontWeight: '600' },
  hint: { marginTop: 10, fontSize: 14, color: '#64748B', lineHeight: 20, fontWeight: '600' },
  primary: {
    marginTop: 20,
    backgroundColor: GOLD,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryTxt: { color: GREEN, fontWeight: '900', fontSize: 16 },
  outBtn: {
    marginTop: 16,
    borderWidth: 2,
    borderColor: GREEN,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  outTxt: { color: GREEN, fontWeight: '900' },
  footer: { textAlign: 'center', color: '#94A3B8', fontWeight: '600', marginTop: 8 },
});
