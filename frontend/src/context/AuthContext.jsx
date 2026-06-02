import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, getIdTokenResult } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { resolveUserRole } from '../config/adminAccess';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('stm_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch(e) {
      localStorage.removeItem('stm_user');
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(() => {
    return !!localStorage.getItem('stm_guest');
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setIsAuthenticated(true);
        let role = 'user';
        let name = firebaseUser.displayName || 'Customer';
        let profilePhone = '';
        let profileAddress = '';

        try {
          // ── Step 1: Check `drivers` collection FIRST (uid as doc ID) ──────────
          // Drivers are created by admin with their Firebase UID as the doc ID.
          // We must check this BEFORE users/ so the role is never downgraded to "user".
          const driverRef = doc(db, 'drivers', firebaseUser.uid);
          const driverSnap = await getDoc(driverRef);

          if (driverSnap.exists()) {
            const driverData = driverSnap.data();
            // Trust the stored role ("driver" or "rider") — never override with "user"
            role = driverData.role || 'driver';
            name = driverData.name || name;
            if (typeof driverData.phone === 'string' && driverData.phone.trim()) {
              profilePhone = driverData.phone.trim();
            }
            console.log('[AuthContext] Driver profile found → role:', role, 'uid:', firebaseUser.uid);
          } else {
            // ── Step 2: Fall back to `users` collection (customers / admins) ────
            const profileRef = doc(db, 'users', firebaseUser.uid);
            const profileSnap = await getDoc(profileRef);
            if (profileSnap.exists()) {
              const profileData = profileSnap.data();
              role = resolveUserRole(firebaseUser.email, profileData.role);
              name = profileData.name || name;
              if (typeof profileData.phone === 'string' && profileData.phone.trim()) {
                profilePhone = profileData.phone.trim();
              } else if (typeof profileData.mobile === 'string' && profileData.mobile.trim()) {
                profilePhone = profileData.mobile.trim();
              }
              if (typeof profileData.address === 'string' && profileData.address.trim()) {
                profileAddress = profileData.address.trim();
              } else if (typeof profileData.defaultAddress === 'string' && profileData.defaultAddress.trim()) {
                profileAddress = profileData.defaultAddress.trim();
              }
            } else {
              role = resolveUserRole(firebaseUser.email, null);
            }
            console.log('[AuthContext] User profile found → role:', role, 'uid:', firebaseUser.uid);
          }
        } catch (profileErr) {
          console.warn('[AuthContext] Failed to fetch profile:', profileErr);
          role = resolveUserRole(firebaseUser.email, null);
        }

        try {
          const tokenResult = await getIdTokenResult(firebaseUser);
          if (tokenResult.claims?.admin === true) {
            role = 'admin';
          }
        } catch (tokenErr) {
          console.warn('Could not read ID token claims:', tokenErr);
        }

        const fbPhone =
          typeof firebaseUser.phoneNumber === 'string' && firebaseUser.phoneNumber.trim()
            ? firebaseUser.phoneNumber.trim()
            : '';
        const userData = {
          id: firebaseUser.uid,
          name: role === 'admin' ? (name || 'Admin Master') : name,
          email: firebaseUser.email,
          phone: profilePhone || fbPhone || '',
          address: profileAddress || '',
          role,
        };
        setUser(userData);
        localStorage.setItem('stm_user', JSON.stringify(userData));
      } else {
        // CRITICAL: If Firebase says signed out, PURGE everything to prevent ghost sessions
        // ONLY if there is no custom API token (driver/admin)
        if (!localStorage.getItem('token')) {
          setIsAuthenticated(false);
          setUser(null);
          localStorage.removeItem('stm_user');
        } else {
          // If they have a token, restore their authentication state from localStorage
          try {
            const savedUser = localStorage.getItem('stm_user');
            if (savedUser) {
              setUser(JSON.parse(savedUser));
              setIsAuthenticated(true);
            }
          } catch(e) {
            // Do nothing
          }
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setIsGuest(false);
    localStorage.setItem('stm_user', JSON.stringify(userData));
    localStorage.removeItem('stm_guest');
  };

  const loginAsGuest = () => {
    setIsGuest(true);
    setUser(null);
    localStorage.setItem('stm_guest', 'true');
    localStorage.removeItem('stm_user');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsGuest(false);
    localStorage.removeItem('stm_user');
    localStorage.removeItem('stm_guest');
    auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, isGuest, login, loginAsGuest, logout, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
