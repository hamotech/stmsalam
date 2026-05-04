import { Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

/**
 * Coarse “can reach the internet” check for checkout gating. Web uses `navigator.onLine` only;
 * native uses NetInfo (includes airplane mode, etc.).
 */
export async function isDeviceOnline(): Promise<boolean> {
  if (Platform.OS === 'web') {
    if (typeof navigator === 'undefined') return true;
    return navigator.onLine !== false;
  }
  const s = await NetInfo.fetch();
  if (s.isConnected === false) return false;
  if (s.isInternetReachable === false) return false;
  return true;
}
