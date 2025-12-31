import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [hasta, setHasta] = useState(null);
  const [users, setUsers] = useState([]); // kayıtlı kullanıcılar

  // ✅ KAYIT
  const register = (newUser) => {
    const exists = users.find((u) => u.email === newUser.email);
    if (exists) return false;

    setUsers((prev) => [...prev, newUser]);
    return true;
  };

  // ✅ GİRİŞ
  const login = (email, password) => {
    const user = users.find(
      (u) => u.email === email && u.sifre === password
    );

    if (!user) return false;

    setHasta(user);
    return true;
  };

  // ✅ ÇIKIŞ
  const logout = () => {
    setHasta(null);
  };

  // ✅ ŞİFREMİ UNUTTUM
  const sifreGuncelle = (email, yeniSifre) => {
    const index = users.findIndex((u) => u.email === email);
    if (index === -1) return false;

    const updated = [...users];
    updated[index].sifre = yeniSifre;
    setUsers(updated);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        hasta,
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

export const useAuth = () => useContext(AuthContext);
