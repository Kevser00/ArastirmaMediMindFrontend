import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { reminderExecutionService } from "../api/reminderExecutionService";
import { useAuth } from "./AuthContext";

const HatirlatmaContext = createContext(null);

export const HatirlatmaProvider = ({ children }) => {
  const { hasta } = useAuth();

  const [hatirlatmalar, setHatirlatmalar] = useState([]);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    if (!hasta?.userId) {
      console.log("USER ID YOK, REPORT ÇEKİLMEDİ");
      return;
    }

    setLoading(true);
    try {
      // 🟢 DOĞRU ENDPOINT
      const data = await reminderExecutionService.getReport(
        hasta.userId
      );

      setHatirlatmalar(Array.isArray(data) ? data : []);
    } catch (e) {
      console.log(
        "REMINDER EXECUTION REPORT ERR:",
        e?.response?.data || e.message
      );
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

  return (
    <HatirlatmaContext.Provider value={value}>
      {children}
    </HatirlatmaContext.Provider>
  );
};

export const useHatirlatma = () => {
  const ctx = useContext(HatirlatmaContext);
  if (!ctx) {
    throw new Error(
      "useHatirlatma HatirlatmaProvider içinde kullanılmalı"
    );
  }
  return ctx;
};
