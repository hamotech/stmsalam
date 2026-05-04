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
  subscribeOrderChatMessages,
  sendOrderChatMessage,
  OrderChatMessage,
} from '@/src/services/orderChatService';

const GREEN = '#013220';

interface Props {
  orderId: string;
}

export default function OrderLiveChat({ orderId }: Props) {
  const [messages, setMessages] = useState<OrderChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [ready, setReady] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (!orderId?.trim()) return;
    const unsub = subscribeOrderChatMessages(
      orderId,
      (msgs) => {
        setMessages(msgs);
        setReady(true);
      },
      () => setReady(true)
    );
    return unsub;
  }, [orderId]);

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 80);
  }, [messages.length]);

  const onSend = async () => {
    const t = input.trim();
    if (!t || sending || !orderId?.trim()) return;
    setSending(true);
    try {
      await sendOrderChatMessage(orderId, t, 'customer');
      setInput('');
    } catch (e) {
      console.error(e);
    } finally {
      setSending(false);
    }
  };

  if (!orderId?.trim()) return null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
    >
      <View style={styles.wrap}>
        <Text style={styles.title}>Chat about this order</Text>
        <Text style={styles.hint}>
          Messages sync with the kitchen dashboard for this order. For general questions, use Help →
          Live team.
        </Text>

        {!ready ? (
          <ActivityIndicator color={GREEN} style={{ marginVertical: 16 }} />
        ) : (
          <ScrollView
            ref={scrollRef}
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {messages.length === 0 ? (
              <Text style={styles.empty}>No messages yet — say hi to the team.</Text>
            ) : (
              messages.map((msg) => {
                const mine = msg.senderRole === 'customer';
                return (
                  <View
                    key={msg.id}
                    style={[styles.bubbleRow, mine ? styles.bubbleRowMe : styles.bubbleRowThem]}
                  >
                    <View style={[styles.bubble, mine ? styles.bubbleMe : styles.bubbleThem]}>
                      <Text style={[styles.bubbleText, mine && styles.bubbleTextMe]}>
                        {msg.text}
                      </Text>
                    </View>
                    <Text style={styles.meta}>{mine ? 'You' : 'Kitchen / admin'}</Text>
                  </View>
                );
              })
            )}
          </ScrollView>
        )}

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Message about this order…"
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
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    maxHeight: 340,
  },
  title: { fontSize: 16, fontWeight: '900', color: '#0F172A', paddingHorizontal: 16, paddingTop: 14 },
  hint: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 10,
    lineHeight: 16,
  },
  scroll: { maxHeight: 200, backgroundColor: '#F8FAFC' },
  scrollContent: { padding: 12, paddingBottom: 16 },
  empty: { textAlign: 'center', color: '#94A3B8', fontWeight: '600', fontSize: 13, padding: 16 },
  bubbleRow: { marginBottom: 10, maxWidth: '92%' },
  bubbleRowMe: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  bubbleRowThem: { alignSelf: 'flex-start', alignItems: 'flex-start' },
  bubble: {
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  bubbleMe: { backgroundColor: GREEN, borderBottomRightRadius: 4 },
  bubbleThem: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderBottomLeftRadius: 4,
  },
  bubbleText: { fontSize: 14, fontWeight: '600', color: '#0F172A', lineHeight: 20 },
  bubbleTextMe: { color: '#FFFFFF' },
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
