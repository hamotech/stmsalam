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
        // If a Firebase user exists, ensure they are synced to our local state if they are admin
        const adminEmail = JSON.parse(localStorage.getItem('stm_admin_creds'))?.email || 'admin@stm.com';
        if (firebaseUser.email?.toLowerCase() === adminEmail.toLowerCase()) {
           const userData = { id: firebaseUser.uid, name: 'Admin Master', email: firebaseUser.email, role: 'admin' };
           setUser(userData);
           localStorage.setItem('stm_user', JSON.stringify(userData));
        }
      } else {
        setIsAuthenticated(false);
        const currentUser = JSON.parse(localStorage.getItem('stm_user') || 'null');
        if (currentUser?.role === 'admin' && !firebaseUser) {
           // Potentially a mock login session still active
        }
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
