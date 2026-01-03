import React, { createContext, useContext, useMemo, useState } from "react";
import { reminderService } from "../api/reminderService";

const HatirlatmaContext = createContext(null);

export const HatirlatmaProvider = ({ children }) => {
  const [hatirlatmalar, setHatirlatmalar] = useState([]);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await reminderService.getMine(); // GET /api/reminders
      setHatirlatmalar(Array.isArray(data) ? data : []);
    } catch (e) {
      console.log("REMINDERS GET ERR:", e?.response?.data || e.message);
      setHatirlatmalar([]);
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      hatirlatmalar,
      loading,
      refresh,
    }),
    [hatirlatmalar, loading]
  );

  return <HatirlatmaContext.Provider value={value}>{children}</HatirlatmaContext.Provider>;
};

export const useHatirlatma = () => {
  const ctx = useContext(HatirlatmaContext);
  if (!ctx) throw new Error("useHatirlatma HatirlatmaProvider içinde kullanılmalı");
  return ctx;
};
