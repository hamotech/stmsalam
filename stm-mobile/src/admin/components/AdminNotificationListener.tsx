import { useEffect } from 'react';
import { Platform } from 'react-native';
import { subscribeAdminOrderAlerts } from '@/src/admin/services/orderNotificationService';

/**
 * Keeps a Firestore listener while admin routes are mounted (via admin _layout).
 */
export default function AdminNotificationListener() {
  useEffect(() => {
    if (Platform.OS === 'web') return undefined;
    const unsub = subscribeAdminOrderAlerts();
    return unsub;
  }, []);

  return null;
}
