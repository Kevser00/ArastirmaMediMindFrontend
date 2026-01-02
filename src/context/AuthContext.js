import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [hasta, setHasta] = useState(null);
  const [users, setUsers] = useState([]);

  // ✅ KAYIT + OTOMATİK GİRİŞ
  const register = (newUser) => {
    const exists = users.some((u) => u.email === newUser.email);
    if (exists) return false;

    setUsers((prev) => [...prev, newUser]);

    // ✅ async state riskini by-pass ediyoruz
    setHasta(newUser);

    return true;
  };

  // ✅ GİRİŞ
  const login = (email, sifre) => {
    const user = users.find(
      (u) => u.email === email && u.sifre === sifre
    );

    if (!user) return false;

    setHasta(user);
    return true;
  };

  // ✅ ÇIKIŞ
  const logout = () => {
    setHasta(null);
  };

  // ✅ ŞİFREMİ UNUTTUM (immutability doğru)
  const sifreGuncelle = (email, yeniSifre) => {
    let found = false;

    const updatedUsers = users.map((u) => {
      if (u.email === email) {
        found = true;
        return { ...u, sifre: yeniSifre };
      }
      return u;
    });

    if (!found) return false;

    setUsers(updatedUsers);

    // Eğer giriş yapan kişi buysa state'i de güncelle
    setHasta((prev) =>
      prev && prev.email === email
        ? { ...prev, sifre: yeniSifre }
        : prev
    );

    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        hasta,
        users,
        register,
        login,
        logout,
        sifreGuncelle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth AuthProvider içinde kullanılmalı');
  }
  return ctx;
};
