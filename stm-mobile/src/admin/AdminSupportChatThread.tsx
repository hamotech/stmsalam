import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {
  subscribeSupportChatMessages,
  sendSupportChatMessage,
  markSupportChatReadByAdmin,
  markSupportChatResolved,
  type SupportMessage,
} from '@/src/services/supportChatService';

const GREEN = '#013220';
const GOLD = '#D4AF37';

type Props = {
  chatId: string;
};

export default function AdminSupportChatThread({ chatId }: Props) {
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [resolving, setResolving] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (!chatId) return;
    void markSupportChatReadByAdmin(chatId);
  }, [chatId]);

  useEffect(() => {
    if (!chatId) return;
    const unsub = subscribeSupportChatMessages(chatId, setMessages);
    return unsub;
  }, [chatId]);

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 60);
  }, [messages.length]);

  const onSend = async () => {
    const t = input.trim();
    if (!t || sending || !chatId) return;
    setSending(true);
    try {
      await sendSupportChatMessage(chatId, { text: t, senderRole: 'admin' });
      setInput('');
    } catch (e) {
      console.error(e);
    } finally {
      setSending(false);
    }
  };

  const onResolved = async () => {
    if (!chatId || resolving) return;
    setResolving(true);
    try {
      await markSupportChatResolved(chatId, true);
    } finally {
      setResolving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
    >
      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.resolveBtn} onPress={() => void onResolved()} disabled={resolving}>
          {resolving ? (
            <ActivityIndicator color={GREEN} size="small" />
          ) : (
            <Text style={styles.resolveBtnText}>Mark resolved</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {messages.length === 0 ? (
          <Text style={styles.empty}>No messages yet.</Text>
        ) : (
          messages.map((msg) => {
            const admin = msg.senderRole === 'admin';
            const bot = msg.senderRole === 'bot';
            return (
              <View
                key={msg.id}
                style={[styles.row, admin ? styles.rowMe : styles.rowThem]}
              >
                <View style={[styles.bubble, admin ? styles.bubbleMe : bot ? styles.bubbleBot : styles.bubbleThem]}>
                  <Text style={[styles.bubbleText, admin && styles.bubbleTextMe, bot && styles.bubbleTextBot]}>
                    {msg.text}
                  </Text>
                </View>
                <Text style={styles.meta}>
                  {admin ? 'You (admin)' : bot ? 'Bot' : 'Customer'}
                </Text>
              </View>
            );
          })
        )}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Reply as STM…"
          placeholderTextColor="#94A3B8"
          editable={!sending}
          onSubmitEditing={onSend}
        />
        <TouchableOpacity
          style={[styles.sendBtn, (!input.trim() || sending) && styles.sendBtnOff]}
          onPress={onSend}
          disabled={!input.trim() || sending}
        >
          <Text style={styles.sendBtnText}>→</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#FAFAFA' },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  resolveBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  resolveBtnText: { fontWeight: '900', fontSize: 12, color: GREEN },
  scroll: { flex: 1 },
  scrollContent: { padding: 14, paddingBottom: 20 },
  empty: { textAlign: 'center', color: '#94A3B8', marginTop: 32, fontWeight: '600' },
  row: { marginBottom: 10, maxWidth: '92%' },
  rowMe: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  rowThem: { alignSelf: 'flex-start', alignItems: 'flex-start' },
  bubble: { borderRadius: 16, paddingVertical: 10, paddingHorizontal: 14 },
  bubbleMe: { backgroundColor: GREEN, borderBottomRightRadius: 4 },
  bubbleThem: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderBottomLeftRadius: 4,
  },
  bubbleBot: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderBottomLeftRadius: 4,
  },
  bubbleText: { fontSize: 14, fontWeight: '600', color: '#0F172A', lineHeight: 20 },
  bubbleTextMe: { color: '#FFF' },
  bubbleTextBot: { color: '#78350F' },
  meta: { fontSize: 10, color: '#94A3B8', fontWeight: '700', marginTop: 4 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  input: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: GOLD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnOff: { opacity: 0.45 },
  sendBtnText: { color: GREEN, fontSize: 18, fontWeight: '900' },
});
