import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  signInAnonymously,
  sendPasswordResetEmail,
  getIdTokenResult,
  type User,
  type ActionCodeSettings,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import * as Linking from 'expo-linking';
import { auth, db } from '@/src/services/firebase';

export type UserProfile = {
  name?: string;
  email?: string;
  role?: string;
  isAdmin?: boolean;
};

type AuthContextValue = {
  user: User | null;
  profile: UserProfile | null;
  idTokenClaims: Record<string, unknown> | null;
  loading: boolean;
  /** True after authStateReady + guest bootstrap attempt + listener attached. */
  authReady: boolean;
  /** Set only if core auth init throws (not anonymous failure). */
  authBootstrapError: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  refreshIdTokenClaims: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [idTokenClaims, setIdTokenClaims] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);
  const [authBootstrapError, setAuthBootstrapError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let cancelled = false;

    void (async () => {
      try {
        await auth.authStateReady();
        if (cancelled) return;
        if (!auth.currentUser) {
          try {
            await signInAnonymously(auth);
          } catch (err) {
            console.error('[AUTH_FAIL]', err);
          }
        }
        await auth.authStateReady();
      } catch (err) {
        console.error('[AUTH_FAIL]', err);
        if (!cancelled) {
          setAuthBootstrapError('Could not initialize sign-in. Check your connection.');
        }
      }

      if (cancelled) return;

      unsubscribe = onAuthStateChanged(auth, async (u) => {
        setUser(u);
        if (u) {
          try {
            const [snap, tokenResult] = await Promise.all([
              getDoc(doc(db, 'users', u.uid)),
              getIdTokenResult(u),
            ]);
            setProfile(snap.exists() ? (snap.data() as UserProfile) : { email: u.email ?? undefined });
            setIdTokenClaims(tokenResult.claims as Record<string, unknown>);
          } catch (err) {
            console.error('[AUTH_PROFILE]', err);
            try {
              setProfile({ email: u.email ?? undefined });
              const tokenResult = await getIdTokenResult(u);
              setIdTokenClaims(tokenResult.claims as Record<string, unknown>);
            } catch (err2) {
              console.error('[AUTH_PROFILE_FALLBACK]', err2);
              setIdTokenClaims(null);
            }
          }
        } else {
          setProfile(null);
          setIdTokenClaims(null);
        }
        setLoading(false);
      });

      if (!cancelled) {
        console.log('[AUTH_READY]');
        setAuthReady(true);
      }
    })();

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email.trim(), password);
  };

  const signUp = async (email: string, password: string, name: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
    await setDoc(doc(db, 'users', cred.user.uid), {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: 'user',
      createdAt: new Date().toISOString(),
    });
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const sendPasswordResetEmailFn = useCallback(async (email: string) => {
    const customContinue = process.env.EXPO_PUBLIC_PASSWORD_RESET_CONTINUE_URL?.trim();
    const url =
      customContinue && /^https:\/\//.test(customContinue)
        ? customContinue
        : Linking.createURL('/reset-password');
    const actionCodeSettings: ActionCodeSettings = {
      handleCodeInApp: true,
      url,
      android: {
        packageName: 'com.hamotech.stmmobile',
        installApp: false,
        minimumVersion: '1',
      },
      iOS: {
        bundleId: 'com.hamotech.stmmobile',
      },
    };
    await sendPasswordResetEmail(auth, email.trim(), actionCodeSettings);
  }, []);

  const refreshIdTokenClaims = useCallback(async () => {
    const u = auth.currentUser;
    if (!u) {
      setIdTokenClaims(null);
      return;
    }
    await u.getIdToken(true);
    const r = await getIdTokenResult(u);
    setIdTokenClaims(r.claims as Record<string, unknown>);
  }, []);

  const value = useMemo(
    () => ({
      user,
      profile,
      idTokenClaims,
      loading,
      authReady,
      authBootstrapError,
      signIn,
      signUp,
      signOut,
      sendPasswordResetEmail: sendPasswordResetEmailFn,
      refreshIdTokenClaims,
    }),
    [user, profile, idTokenClaims, loading, authReady, authBootstrapError, sendPasswordResetEmailFn, refreshIdTokenClaims]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
