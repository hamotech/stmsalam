import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

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
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setIsAuthenticated(true);
        const safeEmail = firebaseUser.email?.toLowerCase() || '';
        const isAdmin = safeEmail.includes('admin') || safeEmail.includes('manager') || safeEmail === 'stmsalam@gmail.com';
        
        if (isAdmin) {
           const userData = { id: firebaseUser.uid, name: 'Admin Master', email: firebaseUser.email, role: 'admin' };
           setUser(userData);
           localStorage.setItem('stm_user', JSON.stringify(userData));
        } else {
           // Standard User Sync
           const userData = { id: firebaseUser.uid, name: firebaseUser.displayName || 'Customer', email: firebaseUser.email, role: 'user' };
           setUser(userData);
           localStorage.setItem('stm_user', JSON.stringify(userData));
        }
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
