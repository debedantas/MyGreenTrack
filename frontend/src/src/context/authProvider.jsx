import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Check localStorage for an existing token (you could also store more user details)
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const full_name = localStorage.getItem('full_name');
    const type = localStorage.getItem('type');
    return token ? { token, email, full_name, type } : null;
  });

  const login = (userData) => {
    setUser(userData);
    // Save token to localStorage
    if (userData.token) {
      localStorage.setItem('token', userData.token);
    }
    if (userData.email) {
      localStorage.setItem('email', userData.email);
    }
    if (userData.full_name) {
      localStorage.setItem('full_name', userData.full_name);
    }
    if (userData.type) {
      localStorage.setItem('type', userData.type);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('full_name');
    localStorage.removeItem('type');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
