import React, { createContext, useContext, useState, useEffect } from 'react';

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
  const [isGuest, setIsGuest] = useState(() => {
    return !!localStorage.getItem('stm_guest');
  });

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
    setIsGuest(false);
    localStorage.removeItem('stm_user');
    localStorage.removeItem('stm_guest');
  };

  return (
    <AuthContext.Provider value={{ user, isGuest, login, loginAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
