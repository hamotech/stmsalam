/**
 * Site support chat — Firestore `support_chats/{chatId}` + `messages` subcollection
 * (same paths as web admin inbox). Optional bot + unread flags for Grab-style UX.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Unsubscribe,
} from 'firebase/firestore';
import { getSupportBotReply } from '@/src/utils/supportBotReply';
import { db } from './firebase';

const STORAGE_KEY = 'stm_support_conv_id';

function newConversationId(): string {
  const c = globalThis.crypto;
  if (c && typeof c.randomUUID === 'function') {
    return `sc-${c.randomUUID()}`;
  }
  return `sc-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export async function getOrCreateSupportConversationId(): Promise<string> {
  try {
    let id = await AsyncStorage.getItem(STORAGE_KEY);
    if (!id?.trim()) {
      id = newConversationId();
      await AsyncStorage.setItem(STORAGE_KEY, id);
    }
    return id;
  } catch {
    return newConversationId();
  }
}

/** Aligns with web `senderRole`; `bot` is mobile + automation. */
export type SupportSenderRole = 'customer' | 'admin' | 'bot';

export interface SupportMessage {
  id: string;
  text: string;
  senderRole: SupportSenderRole;
  createdAt?: { toDate: () => Date } | null;
}

export interface SupportChatHead {
  id: string;
  userId?: string | null;
  lastMessage?: string;
  lastPreview?: string;
  lastSenderRole?: SupportSenderRole;
  unreadByAdmin?: boolean;
  unreadByUser?: boolean;
  resolved?: boolean;
  updatedAt?: { toDate: () => Date } | null;
}

function normalizeSender(raw: unknown): SupportSenderRole {
  if (raw === 'admin' || raw === 'bot' || raw === 'customer') return raw;
  return 'customer';
}

type SendOptions = {
  /** Firebase Auth uid — stored on chat head for admin context */
  userId?: string | null;
  /** When true, do not append a bot reply (internal bot sends use this). */
  skipBot?: boolean;
};

export async function sendSupportChatMessage(
  conversationId: string,
  payload: { text: string; senderRole: SupportSenderRole },
  options?: SendOptions
): Promise<void> {
  const trimmed = (payload.text || '').trim();
  if (!trimmed || !conversationId) throw new Error('Invalid support message');

  const chatRef = doc(db, 'support_chats', conversationId);
  const preview = trimmed.slice(0, 140);
  const role = payload.senderRole;

  if (role === 'customer') {
    await setDoc(
      chatRef,
      {
        updatedAt: serverTimestamp(),
        lastPreview: preview,
        lastMessage: preview,
        lastSenderRole: 'customer',
        unreadByAdmin: true,
        unreadByUser: false,
        ...(options?.userId ? { userId: options.userId } : {}),
      },
      { merge: true }
    );
  } else if (role === 'admin') {
    await setDoc(
      chatRef,
      {
        updatedAt: serverTimestamp(),
        lastPreview: preview,
        lastMessage: preview,
        lastSenderRole: 'admin',
        unreadByUser: true,
        unreadByAdmin: false,
        resolved: false,
      },
      { merge: true }
    );
  } else {
    await setDoc(
      chatRef,
      {
        updatedAt: serverTimestamp(),
        lastPreview: preview,
        lastMessage: preview,
        lastSenderRole: 'bot',
      },
      { merge: true }
    );
  }

  await addDoc(collection(db, 'support_chats', conversationId, 'messages'), {
    text: trimmed,
    senderRole: role,
    createdAt: serverTimestamp(),
  });

  if (role === 'customer' && !options?.skipBot) {
    const botText = getSupportBotReply(trimmed);
    if (botText) {
      await sendSupportChatMessage(
        conversationId,
        { text: botText, senderRole: 'bot' },
        { skipBot: true }
      );
    }
  }
}

export async function markSupportChatReadByUser(conversationId: string): Promise<void> {
  if (!conversationId) return;
  await setDoc(doc(db, 'support_chats', conversationId), { unreadByUser: false }, { merge: true });
}

export async function markSupportChatReadByAdmin(conversationId: string): Promise<void> {
  if (!conversationId) return;
  await setDoc(doc(db, 'support_chats', conversationId), { unreadByAdmin: false }, { merge: true });
}

export async function markSupportChatResolved(conversationId: string, resolved: boolean): Promise<void> {
  if (!conversationId) return;
  await setDoc(doc(db, 'support_chats', conversationId), { resolved }, { merge: true });
}

export const subscribeSupportChatMessages = (
  conversationId: string,
  onData: (messages: SupportMessage[]) => void,
  onError?: (err: Error) => void
): Unsubscribe => {
  if (!conversationId) {
    onData([]);
    return () => {};
  }

  const q = query(
    collection(db, 'support_chats', conversationId, 'messages'),
    orderBy('createdAt', 'asc')
  );

  return onSnapshot(
    q,
    (snap) => {
      onData(
        snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            text: String(data.text ?? ''),
            senderRole: normalizeSender(data.senderRole),
            createdAt: data.createdAt,
          };
        })
      );
    },
    (err) => {
      console.error('[supportChatService] messages:', err);
      onError?.(err as Error);
    }
  );
};

/** Admin inbox: conversation heads, newest first (same query as web). */
export const subscribeSupportChatsList = (
  onData: (chats: SupportChatHead[]) => void,
  onError?: (err: Error) => void
): Unsubscribe => {
  const q = query(collection(db, 'support_chats'), orderBy('updatedAt', 'desc'));
  return onSnapshot(
    q,
    (snap) => {
      onData(
        snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            userId: data.userId != null ? String(data.userId) : null,
            lastMessage: data.lastMessage != null ? String(data.lastMessage) : String(data.lastPreview ?? ''),
            lastPreview: data.lastPreview != null ? String(data.lastPreview) : undefined,
            lastSenderRole: data.lastSenderRole != null ? normalizeSender(data.lastSenderRole) : undefined,
            unreadByAdmin: data.unreadByAdmin === true,
            unreadByUser: data.unreadByUser === true,
            resolved: data.resolved === true,
            updatedAt: data.updatedAt,
          };
        })
      );
    },
    (err) => {
      console.error('[supportChatService] inbox:', err);
      onError?.(err as Error);
      onData([]);
    }
  );
};
