import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { subscribeSupportChatsList, type SupportChatHead } from '@/src/services/supportChatService';

const GREEN = '#013220';
function formatUpdated(h: SupportChatHead): string {
  const u = h.updatedAt;
  if (u && typeof u === 'object' && 'toDate' in u && typeof (u as { toDate: () => Date }).toDate === 'function') {
    try {
      return (u as { toDate: () => Date }).toDate().toLocaleString();
    } catch {
      /* fall through */
    }
  }
  return '—';
}

export default function AdminChatListScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [chats, setChats] = useState<SupportChatHead[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeSupportChatsList(setChats, (e) => setErr(e.message));
    return unsub;
  }, []);

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom }]}>
      {err ? <Text style={styles.err}>{err}</Text> : null}
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            {err ? null : <ActivityIndicator color={GREEN} style={{ marginBottom: 12 }} />}
            <Text style={styles.emptyText}>{err ? 'Could not load chats.' : 'No conversations yet.'}</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => router.push(`/admin/chat/${encodeURIComponent(item.id)}`)}
            activeOpacity={0.85}
          >
            <View style={styles.rowTop}>
              <Text style={styles.idText} numberOfLines={1}>
                {item.id.length > 28 ? `${item.id.slice(0, 28)}…` : item.id}
              </Text>
              {item.unreadByAdmin ? <View style={styles.dot} /> : null}
            </View>
            <Text style={styles.preview} numberOfLines={2}>
              {item.lastMessage || item.lastPreview || '—'}
            </Text>
            <Text style={styles.meta}>
              {formatUpdated(item)}
              {item.lastSenderRole ? ` · ${item.lastSenderRole}` : ''}
              {item.resolved ? ' · resolved' : ''}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8FAFC' },
  err: { color: '#B91C1C', fontWeight: '700', padding: 16 },
  list: { padding: 16, paddingBottom: 40 },
  empty: { paddingTop: 48, alignItems: 'center' },
  emptyText: { color: '#64748B', fontWeight: '700', fontSize: 14 },
  row: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 6 },
      android: { elevation: 2 },
    }),
  },
  rowTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  idText: { flex: 1, fontSize: 11, fontWeight: '800', color: '#64748B', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#EA580C' },
  preview: { marginTop: 8, fontSize: 14, fontWeight: '700', color: '#0F172A', lineHeight: 20 },
  meta: { marginTop: 6, fontSize: 11, color: '#94A3B8', fontWeight: '600' },
});
