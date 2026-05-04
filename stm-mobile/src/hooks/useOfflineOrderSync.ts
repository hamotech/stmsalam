import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, type AppStateStatus, Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { processOfflineOrderQueue, getPendingOfflineCount } from '@/src/services/offlineOrderQueue';

function getWebOnline(): boolean {
  if (typeof navigator === 'undefined') {
    return true;
  }
  return Boolean(navigator.onLine);
}

/**
 * Drains the COD offline queue when the app is online; exposes pending count and last sync state.
 */
export function useOfflineOrderSync(enabled = true) {
  const [pending, setPending] = useState(0);
  const [lastSync, setLastSync] = useState<'idle' | 'syncing' | 'done' | 'error'>('idle');
  const [lastError, setLastError] = useState<string | null>(null);
  const mounted = useRef(true);

  const refreshCount = useCallback(() => {
    void getPendingOfflineCount().then((n) => {
      if (mounted.current) {
        setPending(n);
      }
    });
  }, []);

  const drain = useCallback(async () => {
    if (!enabled) return;
    if (Platform.OS === 'web' && !getWebOnline()) {
      return;
    }
    if (Platform.OS !== 'web') {
      const s = await NetInfo.fetch();
      if (s.isConnected === false) {
        return;
      }
    }
    setLastSync('syncing');
    setLastError(null);
    const r = await processOfflineOrderQueue();
    if (r.error && r.error !== 'busy' && r.succeeded === 0 && r.attempted > 0) {
      setLastSync('error');
      setLastError(r.error);
    } else {
      setLastSync('done');
    }
    refreshCount();
  }, [enabled, refreshCount]);

  useEffect(() => {
    mounted.current = true;
    refreshCount();
    return () => {
      mounted.current = false;
    };
  }, [refreshCount]);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    void drain();
    const sub = AppState.addEventListener('change', (s: AppStateStatus) => {
      if (s === 'active') {
        void drain();
      }
    });
    let removeNet: (() => void) | undefined;
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const fn = () => {
        void drain();
      };
      window.addEventListener('online', fn);
      removeNet = () => window.removeEventListener('online', fn);
    } else if (Platform.OS !== 'web') {
      const unsub = NetInfo.addEventListener((s) => {
        if (s.isConnected) {
          void drain();
        }
      });
      removeNet = () => {
        if (typeof unsub === 'function') {
          unsub();
        }
      };
    }
    return () => {
      sub.remove();
      removeNet?.();
    };
  }, [enabled, drain]);

  return { pending, lastSync, lastError, refreshCount, drain };
}
