import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HatirlatmaContext = createContext(null);

const STORAGE_KEY = "HATIRLATMALAR";

export const HatirlatmaProvider = ({ children }) => {
  const [hatirlatmalar, setHatirlatmalar] = useState([]);

  // 🔹 Uygulama açılınca hatırlatmaları yükle
  useEffect(() => {
    const yukle = async () => {
      try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data) {
          setHatirlatmalar(JSON.parse(data));
        }
      } catch (e) {
        console.log("Hatırlatma yükleme hatası:", e);
      }
    };
    yukle();
  }, []);

  // 🔹 Her değişimde AsyncStorage’a kaydet
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(hatirlatmalar));
  }, [hatirlatmalar]);

  // 🔹 Hatırlatma ekle
  const ekleHatirlatma = (yeni) => {
    setHatirlatmalar((prev) => [yeni, ...prev]);
  };

  // 🔹 Durum güncelle (aktif / tamamlandı vs.)
  const durumGuncelle = (id, durum) => {
    setHatirlatmalar((prev) =>
      prev.map((h) =>
        h.id === id ? { ...h, durum } : h
      )
    );
  };

  return (
    <HatirlatmaContext.Provider
      value={{
        hatirlatmalar,
        ekleHatirlatma,
        durumGuncelle,
      }}
    >
      {children}
    </HatirlatmaContext.Provider>
  );
};

// ✅ GÜVENLİ HOOK (Provider yoksa net hata verir)
export const useHatirlatma = () => {
  const ctx = useContext(HatirlatmaContext);
  if (!ctx) {
    throw new Error(
      "useHatirlatma must be used within a HatirlatmaProvider"
    );
  }
  return ctx;
};
