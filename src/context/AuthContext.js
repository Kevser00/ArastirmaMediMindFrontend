import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authService } from "../api/authService";
import { tokenStorage } from "../api/tokenStorage";

const AuthContext = createContext(null);
const USER_KEY = "auth_user";

export const AuthProvider = ({ children }) => {
  const [hasta, setHasta] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const token = await tokenStorage.getAccessToken();
        const userStr = await AsyncStorage.getItem(USER_KEY);

        if (token && userStr) {
          const parsed = JSON.parse(userStr);
          if (parsed?.type === "doctor") setDoctor(parsed);
          else setHasta(parsed);
        }
      } catch (e) {
        console.log("AUTH INIT ERR:", e?.message);
      } finally {
        setBooting(false);
      }
    };

    init();
  }, []);

  // ✅ register sırasında loading yönet
  const register = async (payload) => {
    setLoading(true);
    try {
      return await authService.register(payload);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
  setLoading(true);
  try {
    const res = await authService.loginUser(email, password);
    // API'den dönen res.data içinde isim ve soyisim olduğunu varsayıyoruz
    const u = { 
      type: "user", 
      userId: res.userId, 
      email,
      ad: res.data?.ad || res.user?.ad, // Burayı ekledik
      soyad: res.data?.soyad || res.user?.soyad // Burayı ekledik
    };
    setHasta(u);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(u));
    return true;
  } catch (e) {
    return false;
  } finally {
    setLoading(false);
  }
};

  // AuthContext.js içindeki loginDoctor'u bu şekilde güncelle:
const loginDoctor = async (registrationNumber, password) => {
  setLoading(true);
  try {
    const res = await authService.loginDoctor(registrationNumber, password);
    
    // BACKEND'DEN GELEN VERİYE GÖRE BURAYI DÜZENLE:
    // res.data.user veya res.user içinden isim/soyisim geliyordur.
    const d = { 
      type: "doctor", 
      registrationNumber,
      name: res.data?.name || res.user?.name, 
      surname: res.data?.surname || res.user?.surname,
      email: res.data?.email || res.user?.email 
    };

    setDoctor(d);
    setHasta(null);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(d));
    return { ok: true, data: res };
  } catch (e) {
    return { ok: false };
  } finally {
    setLoading(false);
  }
};

  const logout = async () => {
    await tokenStorage.clear();
    await AsyncStorage.removeItem(USER_KEY);
    setHasta(null);
    setDoctor(null);
  };

  const value = useMemo(
    () => ({
      hasta,
      doctor,
      loading,
      booting,
      register,
      loginUser,
      loginDoctor,
      logout,
    }),
    [hasta, doctor, loading, booting]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth AuthProvider içinde kullanılmalı");
  return ctx;
};
