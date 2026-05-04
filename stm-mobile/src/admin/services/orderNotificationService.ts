/**
 * Detects new Firestore `orders` documents and triggers local notifications + sound.
 * Requires Firebase Auth as the Firestore rules–allowed admin user.
 */
import { collection, onSnapshot, orderBy, query, type Unsubscribe } from 'firebase/firestore';
import { Platform } from 'react-native';
import { AndroidImportance } from 'expo-notifications/build/NotificationChannelManager.types';
import { getPermissionsAsync, requestPermissionsAsync } from 'expo-notifications/build/NotificationPermissions';
import { setNotificationHandler } from 'expo-notifications/build/NotificationsHandler';
import scheduleNotificationAsync from 'expo-notifications/build/scheduleNotificationAsync';
import setNotificationChannelAsync from 'expo-notifications/build/setNotificationChannelAsync';
import { db } from '@/src/services/firebase';
import type { OrderBillInput } from '@/src/utils/generateCustomerBill';

setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

let androidChannelReady = false;

async function ensureAndroidChannel(): Promise<void> {
  if (Platform.OS !== 'android' || androidChannelReady) return;
  await setNotificationChannelAsync('new-orders', {
    name: 'New orders',
    importance: AndroidImportance.MAX,
    vibrationPattern: [0, 250, 120, 250],
    sound: 'default',
  });
  androidChannelReady = true;
}

export async function ensureNotificationPermissions(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  await ensureAndroidChannel();
  const { status: existing } = await getPermissionsAsync();
  if (existing === 'granted') return true;
  const { status } = await requestPermissionsAsync();
  return status === 'granted';
}

export async function presentNewOrderNotification(order: OrderBillInput): Promise<void> {
  if (Platform.OS === 'web') return;
  await ensureAndroidChannel();

  const id = String(order.id || '');
  const tail = id.length >= 8 ? id.slice(-8).toUpperCase() : id.toUpperCase() || 'NEW';
  const name = order.customer?.name?.trim() || 'Customer';

  await scheduleNotificationAsync({
    content: {
      title: 'New Order Received',
      body: `Order ${tail} from ${name}`,
      sound: 'default',
      data: { orderId: id },
      ...(Platform.OS === 'android' ? { channelId: 'new-orders' } : {}),
    },
    trigger: null,
  });
}

export type OrderDoc = OrderBillInput & { id: string };

/**
 * Subscribe to `orders`; on each NEW document id (after first snapshot), invoke callback.
 */
export function subscribeNewOrders(onNewOrder: (order: OrderDoc) => void): Unsubscribe {
  const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));

  let initialized = false;
  const prevIds = new Set<string>();

  return onSnapshot(
    q,
    (snap) => {
      const orders: OrderDoc[] = snap.docs.map((d) => ({ id: d.id, ...d.data() } as OrderDoc));
      const idSet = new Set(orders.map((o) => o.id).filter(Boolean));

      if (!initialized) {
        initialized = true;
        idSet.forEach((id) => prevIds.add(id));
        return;
      }

      const added = orders.filter((o) => o.id && !prevIds.has(o.id));
      idSet.forEach((id) => prevIds.add(id));

      for (const order of added) {
        onNewOrder(order);
      }
    },
    (err) => {
      console.error('[orderNotificationService]', err);
    }
  );
}

/**
 * Requests permission (once) and subscribes; each new order shows a local notification with sound.
 */
export function subscribeAdminOrderAlerts(onNew?: (order: OrderDoc) => void): Unsubscribe {
  let permissionPromise = ensureNotificationPermissions();

  return subscribeNewOrders((order) => {
    void (async () => {
      await permissionPromise;
      try {
        await presentNewOrderNotification(order);
      } catch (e) {
        console.warn('[presentNewOrderNotification]', e);
      }
      onNew?.(order);
    })();
  });
}
