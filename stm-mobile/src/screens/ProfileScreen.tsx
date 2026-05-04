/**
 * Profile, help links, WhatsApp — same support paths as stmsalam.sg.
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
import { navPush } from '@/src/navigation/appNavigation';
import { useAppRole } from '@/src/auth/useAppRole';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { openWhatsApp, WHATSAPP_ME_URL } from '@/src/config/whatsapp';
import SupportFloatingButtons from '@/src/components/SupportFloatingButtons';
import { useTabBarBottomInset } from '@/src/navigation/useTabBarBottomInset';
import StmLogo from '@/src/components/stm/StmLogo';
import { useAuth } from '@/src/context/AuthContext';

const GREEN = '#013220';
const GOLD = '#D4AF37';

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const tabBarBottomInset = useTabBarBottomInset(24);
  const { user, profile, signOut } = useAuth();
  const navRole = useAppRole();
  const pt = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: tabBarBottomInset + 88 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, { paddingTop: Math.max(insets.top, pt) + 12 }]}>
          <View style={styles.headerBrand}>
            <StmLogo size={56} />
            <View style={styles.headerText}>
              <Text style={styles.title}>Profile &amp; help</Text>
              <Text style={styles.sub}>STM Salam mobile — same support as the website.</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account</Text>
          {user ? (
            <>
              <Text style={styles.cardBody}>
                {profile?.name ? `${profile.name}\n` : ''}
                {user.email ?? 'Signed in'}
              </Text>
              <TouchableOpacity style={styles.btnGhost} onPress={() => signOut()} activeOpacity={0.9}>
                <Text style={styles.btnGhostText}>Sign out</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.cardBody}>Sign in to sync your details at checkout.</Text>
              <TouchableOpacity
                style={styles.btnPrimary}
                onPress={() => navPush(router, { kind: 'login' }, navRole)}
                activeOpacity={0.9}
              >
                <Text style={styles.btnPrimaryText}>Sign in</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnSecondary}
                onPress={() => navPush(router, { kind: 'register' }, navRole)}
                activeOpacity={0.9}
              >
                <Text style={styles.btnSecondaryText}>Create account</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Contact</Text>
          <Text style={styles.cardBody}>
            Order questions, PayNow, and special requests: reach us on WhatsApp or open Live team in
            Help.
          </Text>
          <TouchableOpacity
            style={styles.btnWa}
            onPress={() => openWhatsApp('Hi STM Salam, I need help with my order.')}
            activeOpacity={0.9}
          >
            <Text style={styles.btnWaText}>WhatsApp ({WHATSAPP_ME_URL.replace('https://', '')})</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>STM Help</Text>
          <Text style={styles.cardBody}>
            AI answers + chat with staff (Firestore), like the web widget.
          </Text>
          <TouchableOpacity
            style={styles.btnHelp}
            onPress={() => navPush(router, { kind: 'support' }, navRole)}
            activeOpacity={0.9}
          >
            <Text style={styles.btnHelpText}>Help Chat 💬</Text>
          </TouchableOpacity>
        </View>

        {Platform.OS !== 'web' ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Kitchen staff</Text>
            <Text style={styles.cardBody}>
              New-order alerts, sounds, and PDF bills (sign in with your Firestore admin account).
            </Text>
            <TouchableOpacity
              style={styles.btnStaff}
              onPress={() => router.push('/admin')}
              activeOpacity={0.9}
            >
              <Text style={styles.btnStaffText}>Open kitchen admin</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>
      <SupportFloatingButtons />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { flexGrow: 1 },
  header: {
    backgroundColor: GREEN,
    paddingHorizontal: 22,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerBrand: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  headerText: { flex: 1 },
  title: { fontSize: 28, fontWeight: '900', color: '#FFF' },
  sub: {
    marginTop: 8,
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '600',
    lineHeight: 20,
  },
  card: {
    marginHorizontal: 18,
    marginTop: 18,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardTitle: { fontSize: 17, fontWeight: '900', color: '#0F172A', marginBottom: 8 },
  cardBody: { fontSize: 14, color: '#64748B', fontWeight: '600', lineHeight: 21, marginBottom: 16 },
  btnWa: {
    backgroundColor: '#25D366',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
  },
  btnWaText: { color: '#FFF', fontWeight: '900', fontSize: 15 },
  btnHelp: {
    backgroundColor: GOLD,
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
  },
  btnHelpText: { color: GREEN, fontWeight: '900', fontSize: 15 },
  btnStaff: {
    backgroundColor: GREEN,
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
  },
  btnStaffText: { color: GOLD, fontWeight: '900', fontSize: 15 },
  btnPrimary: {
    backgroundColor: GREEN,
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnPrimaryText: { color: '#FFF', fontWeight: '900', fontSize: 15 },
  btnSecondary: {
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  btnSecondaryText: { color: GREEN, fontWeight: '900', fontSize: 15 },
  btnGhost: {
    marginTop: 4,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  btnGhostText: { color: '#64748B', fontWeight: '800', fontSize: 14 },
});
