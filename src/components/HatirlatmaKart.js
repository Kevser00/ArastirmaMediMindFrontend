import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const statusLabel = (durum) => {
  if (durum === "icildi") return { text: "İçildi", color: "#7ED321" };
  if (durum === "atlandi") return { text: "Atlandı", color: "#D0021B" };
  return { text: "Bekliyor", color: "#F5A623" }; // ✅ bekliyor
};

const HatirlatmaKart = ({ ilac, gecmis, readOnly, onIctim, onAtladim }) => {
  if (!ilac) return null;

  return (
    <View style={[styles.card, gecmis && styles.gecmis]}>
      <View style={styles.row}>
        <Text style={styles.ilacAdi}>{ilac.ad || "İlaç Adı"}</Text>
        <Text style={styles.saat}>{ilac.saat || "--:--"}</Text>
      </View>

      {ilac.aciklama ? <Text style={styles.aciklama}>• {ilac.aciklama}</Text> : null}

      {!readOnly ? (
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.btn, styles.ok]} onPress={onIctim}>
            <Text style={styles.btnText}>✓</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.btn, styles.no]} onPress={onAtladim}>
            <Text style={styles.btnText}>✕</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={[styles.durumText, { color: statusLabel(ilac.durum).color }]}>
          {statusLabel(ilac.durum).text}
        </Text>
      )}
    </View>
  );
};

export default HatirlatmaKart;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#3F7FC1",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
  },
  gecmis: { opacity: 0.6 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ilacAdi: { color: "white", fontSize: 16, fontWeight: "700" },
  saat: {
    backgroundColor: "#2C4BBE",
    color: "white",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    fontWeight: "600",
  },
  aciklama: { color: "white", marginTop: 6, fontSize: 13 },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    gap: 10,
  },
  btn: { width: 40, height: 40, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  ok: { backgroundColor: "#7ED321" },
  no: { backgroundColor: "#D0021B" },
  btnText: { color: "white", fontSize: 18, fontWeight: "700" },
  durumText: { marginTop: 12, fontWeight: "700", fontSize: 14 },
});
