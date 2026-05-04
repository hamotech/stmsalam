import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getOrCreateSupportConversationId, sendSupportChatMessage } from '@/src/services/supportChatService';
import SupportLiveThread from '@/src/components/SupportLiveThread';
import { SUPPORT_BOT_QUICK_PROMPTS } from '@/src/utils/supportBotReply';
import { openWhatsApp } from '@/src/config/whatsapp';
import WhatsAppIcon from '@/src/components/stm/WhatsAppIcon';
import { useAuth } from '@/src/context/AuthContext';

const GREEN = '#013220';
const GOLD = '#D4AF37';

export default function SupportScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const pt = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0;

  const [convId, setConvId] = useState<string | null>(null);
  const [quickBusy, setQuickBusy] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const id = await getOrCreateSupportConversationId();
      if (!cancelled) setConvId(id);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const headerPadTop = pt + 12;

  const sendQuick = async (text: string) => {
    if (!convId || quickBusy) return;
    setQuickBusy(text);
    try {
      await sendSupportChatMessage(
        convId,
        { text, senderRole: 'customer' },
        { userId: user?.uid ?? undefined }
      );
    } catch (e) {
      console.error(e);
    } finally {
      setQuickBusy(null);
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.header, { paddingTop: headerPadTop, paddingBottom: 14 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} hitSlop={12}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help Chat 💬</Text>
        <Text style={styles.headerSub}>Live team + smart replies · same inbox as stm admin</Text>

        <TouchableOpacity
          style={styles.waRow}
          onPress={() => openWhatsApp('Hi STM Salam, I need help with my order.')}
        >
          <WhatsAppIcon size={20} color="#25D366" />
          <Text style={styles.waRowText}>WhatsApp shop</Text>
        </TouchableOpacity>
      </View>

      {!convId ? (
        <View style={styles.loading}>
          <ActivityIndicator color={GREEN} />
          <Text style={styles.loadingText}>Starting your chat…</Text>
        </View>
      ) : (
        <>
          <View style={styles.quickWrap}>
            <Text style={styles.quickLabel}>Quick questions</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickScroll}>
              {SUPPORT_BOT_QUICK_PROMPTS.map((p) => (
                <TouchableOpacity
                  key={p}
                  style={[styles.quickChip, quickBusy === p && styles.quickChipBusy]}
                  onPress={() => void sendQuick(p)}
                  disabled={Boolean(quickBusy)}
                >
                  <Text style={styles.quickChipText}>{p}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={styles.threadFill}>
            <SupportLiveThread conversationId={convId} userId={user?.uid ?? null} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    backgroundColor: GREEN,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backBtn: { alignSelf: 'flex-start', marginBottom: 8 },
  backText: { color: 'rgba(255,255,255,0.85)', fontWeight: '800', fontSize: 15 },
  headerTitle: { fontSize: 24, fontWeight: '900', color: '#FFF', letterSpacing: -0.5 },
  headerSub: { fontSize: 12, color: 'rgba(255,255,255,0.65)', fontWeight: '600', marginTop: 4, marginBottom: 12 },
  waRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: 'rgba(37,211,102,0.2)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(37,211,102,0.35)',
  },
  waRowText: { flex: 1, color: '#DCFCE7', fontWeight: '800', fontSize: 12 },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  loadingText: { color: '#64748B', fontWeight: '700', fontSize: 14 },
  quickWrap: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  quickLabel: { fontSize: 11, fontWeight: '800', color: '#64748B', marginBottom: 8, textTransform: 'uppercase' },
  quickScroll: { flexDirection: 'row', gap: 8, paddingRight: 8 },
  quickChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  quickChipBusy: { opacity: 0.5 },
  quickChipText: { fontSize: 12, fontWeight: '800', color: GREEN },
  threadFill: { flex: 1, minHeight: 0 },
});
