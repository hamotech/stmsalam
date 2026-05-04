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
  AppState,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {
  subscribeSupportChatMessages,
  sendSupportChatMessage,
  markSupportChatReadByUser,
  type SupportMessage,
} from '@/src/services/supportChatService';
import { presentSupportReplyNotification } from '@/src/utils/notificationService';

const GREEN = '#013220';

interface Props {
  conversationId: string;
  /** Signed-in Firebase uid — stored on chat head for admin context */
  userId?: string | null;
}

export default function SupportLiveThread({ conversationId, userId }: Props) {
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const isFocused = useIsFocused();
  const prevLenRef = useRef(0);
  const inboxInitRef = useRef(false);

  useEffect(() => {
    if (!conversationId) return;
    const unsub = subscribeSupportChatMessages(conversationId, setMessages);
    return unsub;
  }, [conversationId]);

  useEffect(() => {
    if (!conversationId || !isFocused) return;
    void markSupportChatReadByUser(conversationId);
  }, [conversationId, isFocused, messages.length]);

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 80);
  }, [messages.length]);

  useEffect(() => {
    if (!inboxInitRef.current) {
      inboxInitRef.current = true;
      prevLenRef.current = messages.length;
      return;
    }
    if (messages.length <= prevLenRef.current) {
      prevLenRef.current = messages.length;
      return;
    }
    const newest = messages[messages.length - 1];
    prevLenRef.current = messages.length;
    if (newest.senderRole !== 'admin') return;
    if (isFocused && AppState.currentState === 'active') return;
    void presentSupportReplyNotification();
  }, [messages, isFocused]);

  const onSend = async () => {
    const t = input.trim();
    if (!t || sending || !conversationId) return;
    setSending(true);
    try {
      await sendSupportChatMessage(
        conversationId,
        { text: t, senderRole: 'customer' },
        { userId: userId ?? undefined }
      );
      setInput('');
    } catch (e) {
      console.error(e);
    } finally {
      setSending(false);
    }
  };

  const labelFor = (msg: SupportMessage): string => {
    if (msg.senderRole === 'customer') return 'You';
    if (msg.senderRole === 'admin') return 'STM team';
    return 'STM auto-reply';
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 0}
    >
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Help Chat</Text>
        <Text style={styles.bannerSub}>
          Messages sync in real time. Quick answers are sent automatically; staff can jump in anytime.
        </Text>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {messages.length === 0 ? (
          <Text style={styles.empty}>
            Say hello or ask about your order — you’ll get an instant reply when we recognize your
            question.
          </Text>
        ) : (
          messages.map((msg) => {
            const mine = msg.senderRole === 'customer';
            const bot = msg.senderRole === 'bot';
            return (
              <View
                key={msg.id}
                style={[styles.bubbleRow, mine ? styles.bubbleRowMe : styles.bubbleRowThem]}
              >
                <View
                  style={[
                    styles.bubble,
                    mine ? styles.bubbleMe : bot ? styles.bubbleBot : styles.bubbleThem,
                  ]}
                >
                  <Text
                    style={[
                      styles.bubbleText,
                      mine && styles.bubbleTextMe,
                      bot && styles.bubbleTextBot,
                    ]}
                  >
                    {msg.text}
                  </Text>
                </View>
                <Text style={styles.meta}>{labelFor(msg)}</Text>
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
          placeholder="Type a message…"
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
  banner: {
    backgroundColor: '#ECFDF5',
    borderBottomWidth: 1,
    borderBottomColor: '#A7F3D0',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  bannerTitle: { fontSize: 15, fontWeight: '900', color: GREEN },
  bannerSub: { fontSize: 11, fontWeight: '600', color: '#047857', marginTop: 4, lineHeight: 16 },
  scroll: { flex: 1, backgroundColor: '#FAFAFA' },
  scrollContent: { padding: 14, paddingBottom: 20 },
  empty: {
    textAlign: 'center',
    color: '#64748B',
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 24,
    paddingHorizontal: 12,
  },
  bubbleRow: { marginBottom: 10, maxWidth: '92%' },
  bubbleRowMe: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  bubbleRowThem: { alignSelf: 'flex-start', alignItems: 'flex-start' },
  bubble: { borderRadius: 16, paddingVertical: 10, paddingHorizontal: 14 },
  bubbleMe: { backgroundColor: GREEN, borderBottomRightRadius: 4 },
  bubbleThem: {
    backgroundColor: '#FFFFFF',
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
  bubbleTextMe: { color: '#FFFFFF' },
  bubbleTextBot: { color: '#78350F' },
  meta: { fontSize: 10, color: '#94A3B8', fontWeight: '700', marginTop: 4 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
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
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnOff: { opacity: 0.45 },
  sendBtnText: { color: '#FFF', fontSize: 18, fontWeight: '900' },
});
