import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
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

        try {
          const profileRef = doc(db, 'users', firebaseUser.uid);
          const profileSnap = await getDoc(profileRef);
          if (profileSnap.exists()) {
            const profileData = profileSnap.data();
            role = resolveUserRole(firebaseUser.email, profileData.role);
            name = profileData.name || name;
          } else {
            role = resolveUserRole(firebaseUser.email, null);
          }
        } catch (profileErr) {
          console.warn('Failed to fetch user profile role:', profileErr);
          role = resolveUserRole(firebaseUser.email, null);
        }

        const userData = {
          id: firebaseUser.uid,
          name: role === 'admin' ? (name || 'Admin Master') : name,
          email: firebaseUser.email,
          role,
        };
        setUser(userData);
        localStorage.setItem('stm_user', JSON.stringify(userData));
      } else {
        // CRITICAL: If Firebase says signed out, PURGE everything to prevent ghost sessions
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('stm_user');
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
