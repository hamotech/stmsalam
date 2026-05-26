/**
 * // UPDATED — Customer notifications: deduped status transitions + dispatch helpers.
 */

import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { isRunningInExpoGo } from 'expo';
import { AndroidImportance } from 'expo-notifications/build/NotificationChannelManager.types';
import { getPermissionsAsync, requestPermissionsAsync } from 'expo-notifications/build/NotificationPermissions';
import { setNotificationHandler } from 'expo-notifications/build/NotificationsHandler';
import scheduleNotificationAsync from 'expo-notifications/build/scheduleNotificationAsync';
import setNotificationChannelAsync from 'expo-notifications/build/setNotificationChannelAsync';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import type { Unsubscribe } from 'firebase/firestore';
import { db } from '@/src/services/firebase';
import {
  subscribeGrabOrderDoc,
  type GrabOrderDoc,
  type GrabOrderStatus,
} from '@/src/services/grabFlowOrderService';
import { readCanonicalOrderStatus } from '@/src/domain/orderStateMachine';

setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

let customerChannelReady = false;
let supportChannelReady = false;

/** // NEW — Survives listener re-subscribe (dedupe real re-fires vs same status). */
const lastNotifiedStatusByOrder = new Map<string, string>();

const DEDUPE_STORAGE_KEY = 'stm_notif_last_order_status_v1';
let dedupeLoadPromise: Promise<void> | null = null;

async function persistLastNotifiedMap(): Promise<void> {
  try {
    const o: Record<string, string> = {};
    lastNotifiedStatusByOrder.forEach((v, k) => {
      o[k] = v;
    });
    await AsyncStorage.setItem(DEDUPE_STORAGE_KEY, JSON.stringify(o));
  } catch (e) {
    console.warn('[notificationService] persist dedupe', e);
  }
}

/** Call once on app start so cold starts don’t re-notify the same orderStatus. */
export function initNotificationStatusDedupe(): Promise<void> {
  if (dedupeLoadPromise) {
    return dedupeLoadPromise;
  }
  dedupeLoadPromise = (async () => {
    try {
      const raw = await AsyncStorage.getItem(DEDUPE_STORAGE_KEY);
      if (!raw) {
        return;
      }
      const o = JSON.parse(raw) as Record<string, string>;
      for (const [k, v] of Object.entries(o)) {
        if (k && v) {
          lastNotifiedStatusByOrder.set(k, v);
        }
      }
    } catch (e) {
      console.warn('[notificationService] load dedupe', e);
    }
  })();
  return dedupeLoadPromise;
}

async function ensureCustomerChannel(): Promise<void> {
  if (Platform.OS !== 'android' || customerChannelReady) return;
  await setNotificationChannelAsync('order-updates', {
    name: 'Order updates',
    importance: AndroidImportance.HIGH,
    vibrationPattern: [0, 220, 110, 220],
    sound: 'default',
  });
  customerChannelReady = true;
}

async function ensureSupportChannel(): Promise<void> {
  if (Platform.OS !== 'android' || supportChannelReady) return;
  await setNotificationChannelAsync('support-chat', {
    name: 'Support',
    importance: AndroidImportance.HIGH,
    vibrationPattern: [0, 180, 100, 180],
    sound: 'default',
  });
  supportChannelReady = true;
}

export async function ensureCustomerNotificationPermissions(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  await ensureCustomerChannel();
  const { status: existing } = await getPermissionsAsync();
  if (existing === 'granted') return true;
  const { status } = await requestPermissionsAsync();
  return status === 'granted';
}

/** Canonical `orders.status` → customer-facing copy (legacy GrabOrderStatus still accepted). */
const CANONICAL_STATUS_COPY: Record<string, string> = {
  pending_payment: 'Complete payment to confirm your order',
  placed: 'Your COD order is placed — pay the rider on delivery 🧾',
  paid: 'Your order has been placed 🧾',
  preparing: 'Your food is being prepared',
  ready_for_pickup: 'Your order is ready for pickup / dispatch 📦',
  out_for_delivery: 'Rider is on the way 🚚',
  delivered: 'Order delivered 🎉',
  cancelled: 'Your order could not be fulfilled — contact us if you were charged',
  failed: 'Payment did not go through',
};

/** For HTTP dispatch / admin (accepts legacy pipeline enum or canonical). */
export function getDispatchMessageForOrderStatus(status: GrabOrderStatus | string): string {
  const k = readCanonicalOrderStatus({ orderStatus: status, status });
  return CANONICAL_STATUS_COPY[k] ?? `Order update: ${k}`;
}

export async function presentCustomerOrderNotification(
  status: GrabOrderStatus | string,
  orderShort: string
): Promise<void> {
  if (Platform.OS === 'web') return;
  await ensureCustomerChannel();
  const k = readCanonicalOrderStatus({ orderStatus: status, status });
  const body = CANONICAL_STATUS_COPY[k] ?? `Order update: ${k}`;
  await scheduleNotificationAsync({
    content: {
      title: `Order ${orderShort}`,
      body,
      sound: 'default',
      data: { status: k },
      ...(Platform.OS === 'android' ? { channelId: 'order-updates' } : {}),
    },
    trigger: null,
  });
}

/** Local notification when staff replies in Help Chat (foreground / background-capable via Expo). */
export async function presentSupportReplyNotification(): Promise<void> {
  if (Platform.OS === 'web') return;
  await ensureSupportChannel();
  await scheduleNotificationAsync({
    content: {
      title: 'New reply from Support',
      body: 'Open Help Chat to read the latest message.',
      sound: 'default',
      data: { kind: 'support_chat' },
      ...(Platform.OS === 'android' ? { channelId: 'support-chat' } : {}),
    },
    trigger: null,
  });
}

export async function saveCustomerPushTokenToFirestore(userId: string, token: string): Promise<void> {
  await setDoc(
    doc(db, 'customer_push_tokens', userId),
    { token, updatedAt: Timestamp.now() },
    { merge: true }
  );
}

export async function registerCustomerPushToken(userId: string): Promise<string | null> {
  if (Platform.OS === 'web' || !userId) return null;
  // Remote push / Expo push token APIs are not supported in Expo Go (SDK 53+); avoid loading that module graph.
  if (isRunningInExpoGo()) return null;
  const ok = await ensureCustomerNotificationPermissions();
  if (!ok) return null;
  try {
    const easProjectId =
      process.env.EXPO_PUBLIC_EAS_PROJECT_ID ||
      (Constants.expoConfig?.extra as { eas?: { projectId?: string } } | undefined)?.eas
        ?.projectId;
    const { default: getExpoPushTokenAsync } = await import(
      'expo-notifications/build/getExpoPushTokenAsync'
    );
    const token = await getExpoPushTokenAsync(
      easProjectId ? { projectId: easProjectId } : undefined
    );
    const value = token.data;
    if (value) await saveCustomerPushTokenToFirestore(userId, value);
    return value;
  } catch (e) {
    console.warn('[notificationService] push token', e);
    return null;
  }
}

export async function requestCustomerPushDispatch(payload: {
  userId: string;
  orderId: string;
  orderStatus: GrabOrderStatus | string;
  message: string;
}): Promise<void> {
  const url = process.env.EXPO_PUBLIC_ORDER_PUSH_DISPATCH_URL?.trim();
  if (!url) return;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.warn('[notificationService] dispatch', e);
  }
}

/**
 * // NEW — FCM / background: call once at app root when native Firebase Messaging is wired.
 * Placeholder until @react-native-firebase/messaging or Expo FCM bridge is added.
 */
export function registerBackgroundFCMPlaceholder(): void {
  if (__DEV__) {
    console.info(
      '[notificationService] Background FCM: wire Firebase Messaging + setBackgroundMessageHandler in a native entry (see Expo + FCM docs).'
    );
  }
}

/**
 * // UPDATED — Dedupes: same \`orderStatus\` never triggers twice; reconnect-safe via module Map.
 */
export function subscribeGrabOrderWithNotifications(
  orderId: string,
  onData: (order: GrabOrderDoc | null) => void,
  onError?: (e: Error) => void
): Unsubscribe {
  const key = orderId.trim();
  return subscribeGrabOrderDoc(
    key,
    (docSnap) => {
      onData(docSnap);
      if (!docSnap) return;
      const st = readCanonicalOrderStatus(docSnap as unknown as Record<string, unknown>);
      const prevNotified = lastNotifiedStatusByOrder.get(key);
      if (prevNotified === st) {
        return;
      }
      if (prevNotified !== undefined) {
        const short = key.length >= 8 ? key.slice(-8).toUpperCase() : key.toUpperCase();
        void presentCustomerOrderNotification(st, short);
      }
      lastNotifiedStatusByOrder.set(key, st);
      void persistLastNotifiedMap();
    },
    onError
  );
}
