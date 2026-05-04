import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import HeaderBar from '@/src/components/stm/HeaderBar';
import { Brand, cardShadow } from '@/src/theme/brand';
import { db } from '@/src/services/firebase';
import { useAuth } from '@/src/context/AuthContext';

type ChatMessage = {
  id: string;
  senderId?: string;
  text?: string;
  timestamp?: { toDate?: () => Date } | null;
};

export default function MobileOrderChatScreen() {
  const params = useLocalSearchParams<{ orderId?: string | string[] }>();
  const { user } = useAuth();
  const orderId = useMemo(() => {
    const raw = Array.isArray(params.orderId) ? params.orderId[0] : params.orderId;
    return decodeURIComponent(String(raw || '')).trim();
  }, [params.orderId]);

  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }
    console.log('chat initialized', { orderId });
    const q = query(collection(db, 'chats', orderId, 'messages'), orderBy('timestamp', 'asc'));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setMessages(
          snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ChatMessage, 'id'>) }))
        );
        setLoading(false);
      },
      () => {
        setMessages([]);
        setLoading(false);
      }
    );
    return () => unsub();
  }, [orderId]);

  const onSend = async () => {
    const clean = text.trim();
    if (!orderId || !clean) return;
    await addDoc(collection(db, 'chats', orderId, 'messages'), {
      senderId: user?.uid || 'mobile-user',
      text: clean,
      timestamp: serverTimestamp(),
    });
    setText('');
  };

  if (!orderId) {
    return (
      <View style={styles.center}>
        <Text style={styles.err}>Invalid order</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <HeaderBar title="Order Chat" subtitle={`#${orderId.slice(-8).toUpperCase()}`} showBack />
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color={Brand.green} />
        </View>
      ) : (
        <View style={styles.body}>
          {messages.length === 0 ? (
            <View style={[styles.empty, cardShadow]}>
              <Text style={styles.emptyText}>Start conversation</Text>
            </View>
          ) : (
            <FlatList
              data={messages}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.list}
              renderItem={({ item }) => (
                <View style={[styles.msg, item.senderId === user?.uid ? styles.me : styles.them]}>
                  <Text
                    style={[
                      styles.msgText,
                      item.senderId === user?.uid ? styles.msgTextMe : styles.msgTextThem,
                    ]}
                  >
                    {String(item.text || '')}
                  </Text>
                </View>
              )}
            />
          )}
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={text}
              onChangeText={setText}
              placeholder="Type message..."
              placeholderTextColor={Brand.muted}
            />
            <TouchableOpacity style={styles.send} onPress={() => void onSend()}>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Brand.bg },
  body: { flex: 1, padding: Brand.space },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  err: { color: '#b91c1c', fontWeight: '900' },
  empty: {
    borderRadius: Brand.radius,
    borderWidth: 1,
    borderColor: Brand.border,
    backgroundColor: Brand.card,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  emptyText: { color: Brand.muted, fontWeight: '700' },
  list: { paddingBottom: 12 },
  msg: {
    maxWidth: '82%',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  me: { alignSelf: 'flex-end', backgroundColor: Brand.green },
  them: { alignSelf: 'flex-start', backgroundColor: Brand.card, borderWidth: 1, borderColor: Brand.border },
  msgText: { fontWeight: '700' },
  msgTextMe: { color: '#fff' },
  msgTextThem: { color: Brand.text },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Brand.border,
    borderRadius: Brand.radius,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: Brand.text,
    fontWeight: '600',
  },
  send: {
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: Brand.radius,
    backgroundColor: Brand.green,
  },
  sendText: { color: '#fff', fontWeight: '900' },
});
