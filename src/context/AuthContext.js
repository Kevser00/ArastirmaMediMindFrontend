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
      const u = { type: "user", userId: res.userId, email };
      setHasta(u);
      setDoctor(null);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(u));
      return true;
    } catch (e) {
      console.log("LOGIN USER ERR:", e?.response?.data || e.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const loginDoctor = async (registrationNumber, password) => {
    setLoading(true);
    try {
      const res = await authService.loginDoctor(registrationNumber, password);
      const d = { type: "doctor", registrationNumber };
      setDoctor(d);
      setHasta(null);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(d));
      return { ok: true, data: res };
    } catch (e) {
      console.log("LOGIN DOCTOR ERR:", e?.response?.data || e.message);
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
