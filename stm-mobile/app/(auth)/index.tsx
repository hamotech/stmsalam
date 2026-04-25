/**
 * Splash — brand moment, then login (or straight to app if already signed in).
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/src/context/AuthContext';

const GREEN = '#013220';
const GOLD = '#D4AF37';

export default function SplashScreen() {
  const router = useRouter();
  const { authReady, user, isGuest } = useAuth();

  useEffect(() => {
    if (!authReady) return;
    if (user || isGuest) {
      router.replace('/(tabs)/home');
      return;
    }
    const t = setTimeout(() => router.replace('/(auth)/login'), 1600);
    return () => clearTimeout(t);
  }, [authReady, user, isGuest, router]);

  return (
    <View style={styles.root}>
      <Text style={styles.flag}>🇸🇬</Text>
      <View style={styles.logo}>
        <Text style={styles.logoText}>STM</Text>
      </View>
      <Text style={styles.title}>STM Salam</Text>
      <Text style={styles.sub}>Teh Tarik & Kebab · Singapore</Text>
      <ActivityIndicator color={GOLD} style={{ marginTop: 32 }} size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  flag: { fontSize: 48, marginBottom: 16 },
  logo: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: GOLD,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFF',
    marginBottom: 20,
  },
  logoText: { fontSize: 28, fontWeight: '900', color: GREEN },
  title: { fontSize: 32, fontWeight: '900', color: '#FFF', letterSpacing: -0.5 },
  sub: { marginTop: 10, fontSize: 15, color: 'rgba(255,255,255,0.75)', fontWeight: '600' },
});
