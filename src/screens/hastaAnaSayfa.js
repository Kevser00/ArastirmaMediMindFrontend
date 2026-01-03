import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HatirlatmaKart from "../components/HatirlatmaKart";
import { useHatirlatma } from "../context/HatirlatmaContext";
import { medicalDataService } from "../api/medicalDataService";

function HastaAnaSayfa() {
  const { hatirlatmalar, loading, refresh } = useHatirlatma();
  const [showOnceki, setShowOnceki] = useState(false);

  const [medicineMap, setMedicineMap] = useState({}); // { [id]: name }

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    const loadMedicines = async () => {
      try {
        const meds = await medicalDataService.getMedicines();
        const map = {};
        (meds || []).forEach((m) => {
          map[m.id] = m.name;
        });
        setMedicineMap(map);
      } catch (e) {
        console.log("MEDICINES ERR:", e?.response?.data || e.message);
      }
    };
    loadMedicines();
  }, []);

  const cards = useMemo(() => {
    const arr = Array.isArray(hatirlatmalar) ? hatirlatmalar : [];
    return arr.map((r) => {
      const start = r?.startDate ? new Date(r.startDate) : null;

      // backend ReminderDto: { id, dosage, startDate, finishDate, medicineId, frequencyOfUseId, note, isTaked }
      const name = medicineMap?.[r.medicineId] || `İlaç #${r.medicineId}`;

      return {
        id: r.id,
        ad: name,
        saat: start ? start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--:--",
        aciklama: r.dosage ? `Doz: ${r.dosage}` : "",
        durum: r.isTaked ? "icildi" : "bekliyor",
      };
    });
  }, [hatirlatmalar, medicineMap]);

  const yakin = useMemo(() => cards.filter((h) => h.durum === "bekliyor"), [cards]);
  const onceki = useMemo(() => cards.filter((h) => h.durum !== "bekliyor"), [cards]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6FAFF" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>Hatırlatmalarım</Text>

        {loading ? (
          <Text style={styles.emptyText}>Yükleniyor...</Text>
        ) : yakin.length === 0 ? (
          <Text style={styles.emptyText}>Şu anda bekleyen hatırlatma yok.</Text>
        ) : null}

        {yakin.map((ilac) => (
          <HatirlatmaKart key={String(ilac.id)} ilac={ilac} readOnly />
        ))}

        <TouchableOpacity style={styles.toggleBtn} onPress={() => setShowOnceki(!showOnceki)}>
          <Text style={styles.toggleText}>
            {showOnceki ? "Öncekileri Gizle" : "Önceki Hatırlatmalarım"}
          </Text>
        </TouchableOpacity>

        {showOnceki && onceki.length === 0 ? (
          <Text style={styles.emptyText}>Henüz önceki hatırlatman yok.</Text>
        ) : null}

        {showOnceki &&
          onceki.map((ilac) => <HatirlatmaKart key={String(ilac.id)} ilac={ilac} readOnly />)}
      </ScrollView>
    </SafeAreaView>
  );
}

export default HastaAnaSayfa;

const styles = StyleSheet.create({
  container: { backgroundColor: "#F4F6FA", padding: 16, paddingBottom: 40 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginVertical: 12, color: "#374151" },
  emptyText: { fontSize: 14, color: "#6B7280", fontStyle: "italic", marginVertical: 6 },
  toggleBtn: {
    marginTop: 16,
    marginBottom: 16,
    paddingVertical: 8,
    alignItems: "center",
    backgroundColor: "#2C4CCF",
    borderRadius: 12,
  },
  toggleText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});
