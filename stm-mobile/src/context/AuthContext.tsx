/**
 * Customer auth — Firebase email/password + optional guest mode (parity with web).
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '@/src/services/firebase';
import { resolveUserRole } from '@/src/config/adminAccess';

const GUEST_KEY = 'stm_guest';

export type AppUser = {
  id: string;
  name: string;
  email: string | null;
  role: 'user' | 'admin';
};

type AuthContextValue = {
  user: AppUser | null;
  isGuest: boolean;
  /** True after guest flag is read and first `onAuthStateChanged` has fired. */
  authReady: boolean;
  loginAsGuest: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [guestHydrated, setGuestHydrated] = useState(false);
  const [authHandled, setAuthHandled] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const g = await AsyncStorage.getItem(GUEST_KEY);
        if (alive) setIsGuest(g === 'true');
      } catch {
        /* ignore */
      } finally {
        if (alive) setGuestHydrated(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          await AsyncStorage.removeItem(GUEST_KEY);
        } catch {
          /* ignore */
        }
        setIsGuest(false);

        let role: 'user' | 'admin' = 'user';
        let name = firebaseUser.displayName || 'Customer';
        const email = firebaseUser.email;

        try {
          const profileRef = doc(db, 'users', firebaseUser.uid);
          const profileSnap = await getDoc(profileRef);
          if (profileSnap.exists()) {
            const profileData = profileSnap.data();
            role = resolveUserRole(email, profileData.role as string | undefined) as 'user' | 'admin';
            name = (profileData.name as string) || name;
          } else {
            role = resolveUserRole(email, null) as 'user' | 'admin';
          }
        } catch {
          role = resolveUserRole(email, null) as 'user' | 'admin';
        }

        setUser({
          id: firebaseUser.uid,
          name: role === 'admin' ? name || 'Admin' : name,
          email,
          role,
        });
      } else {
        setUser(null);
      }
      setAuthHandled(true);
    });
    return () => unsub();
  }, []);

  const authReady = guestHydrated && authHandled;

  const loginAsGuest = useCallback(async () => {
    try {
      await signOut(auth);
    } catch {
      /* ignore */
    }
    await AsyncStorage.setItem(GUEST_KEY, 'true');
    setIsGuest(true);
    setUser(null);
  }, []);

  const logout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(GUEST_KEY);
    } catch {
      /* ignore */
    }
    setIsGuest(false);
    setUser(null);
    try {
      await signOut(auth);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isGuest,
      authReady,
      loginAsGuest,
      logout,
    }),
    [user, isGuest, authReady, loginAsGuest, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
