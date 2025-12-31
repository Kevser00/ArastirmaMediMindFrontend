import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useHatirlatma } from "../context/HatirlatmaContext";

const ILACLAR = [
  { label: "Klamoks (Antibiyotik)", value: "Klamoks" },
  { label: "Tansiyon İlacı", value: "Tansiyon İlacı" },
  { label: "Kalp İlacı", value: "Kalp İlacı" },
  { label: "B12 Vitamini", value: "B12 Vitamini" },
];

const TEKRAR_SEKLI = [
  { label: "Günde 1", value: "Günde 1" },
  { label: "Günde 2", value: "Günde 2" },
  { label: "12 Saatte 1", value: "12 Saatte 1" },
  { label: "8 Saatte 1", value: "8 Saatte 1" },
];

const HastaBildirimSayfa = ({ navigation }) => {
  const { ekleHatirlatma } = useHatirlatma();

  const [ilacAdi, setIlacAdi] = useState(null);
  const [ilacOpen, setIlacOpen] = useState(false);

  const [tekrar, setTekrar] = useState(null);
  const [tekrarOpen, setTekrarOpen] = useState(false);

  const [ilacDozu, setIlacDozu] = useState("");
  const [tarihBaslangic, setTarihBaslangic] = useState(new Date());
  const [tarihBitis, setTarihBitis] = useState(new Date());
  const [saat, setSaat] = useState(new Date());
  const [ilacNotu, setIlacNotu] = useState("");

  const hatirlatmaEkle = () => {
    if (!ilacAdi || !tekrar) return;

    const yeniHatirlatma = {
      id: Date.now(),
      ad: ilacAdi,
      doz: ilacDozu,
      aciklama: tekrar,
      saat: saat.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      durum: "bekliyor",
      tarihBaslangic,
      tarihBitis,
      not: ilacNotu,
    };

    console.log("Yeni hatırlatma eklendi:", yeniHatirlatma);
    ekleHatirlatma(yeniHatirlatma);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Bildirim Ekle</Text>
        </View>

        <View style={styles.formCard}>
          {/* İLAÇ ADI */}
          <Text style={styles.label}>İlaç Adı</Text>
          <DropDownPicker
            open={ilacOpen}
            value={ilacAdi}
            items={ILACLAR}
            setOpen={setIlacOpen}
            setValue={setIlacAdi}
            placeholder="İlaç seçiniz"
            containerStyle={{ marginBottom: 10, zIndex: 3000 }}
            style={styles.dropdown}
            listMode="SCROLLVIEW"
          />

          {/* İLAÇ DOZU */}
          <Text style={styles.label}>İlaç Dozu</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="İlaç Dozu"
            placeholderTextColor="#555"
            value={ilacDozu}
            onChangeText={setIlacDozu}
          />

          {/* TEKRAR */}
          <Text style={styles.label}>Tekrar Sıklığı</Text>
          <DropDownPicker
            open={tekrarOpen}
            value={tekrar}
            items={TEKRAR_SEKLI}
            setOpen={setTekrarOpen}
            setValue={setTekrar}
            placeholder="Tekrar Sıklığını seçiniz"
            containerStyle={{ marginBottom: 10, zIndex: 2000 }}
            style={styles.dropdown}
            listMode="SCROLLVIEW"
          />

          {/* TARİH */}
          <Text style={styles.label}>Başlangıç ve Bitiş Tarihi</Text>
          <View style={styles.dateRow}>
            <View style={styles.dateBox}>
              <Text style={styles.dateLabel}>Başlangıç</Text>
              <DateTimePicker
                value={tarihBaslangic}
                mode="date"
                display="default"
                onChange={(e, d) => d && setTarihBaslangic(d)}
              />
            </View>

            <View style={styles.dateBox}>
              <Text style={styles.dateLabel}>Bitiş</Text>
              <DateTimePicker
                value={tarihBitis}
                mode="date"
                display="default"
                onChange={(e, d) => d && setTarihBitis(d)}
              />
            </View>
          </View>

          {/* SAAT */}
          <Text style={styles.label}>İlaç Saati</Text>
          <View style={[styles.dateBox, { width: "100%" }]}>
            <DateTimePicker
              value={saat}
              mode="time"
              display="default"
              onChange={(e, d) => d && setSaat(d)}
            />
          </View>

          {/* İLAÇ NOTU */}
          <Text style={styles.label}>İlaç Notu</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Örn: Yemekten sonra alın"
            placeholderTextColor="#555"
            value={ilacNotu}
            onChangeText={setIlacNotu}
          />

          <TouchableOpacity style={styles.button} onPress={hatirlatmaEkle}>
            <Text style={styles.buttonText}>Hatırlatmayı Ekle</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HastaBildirimSayfa;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: "#1483C7",
    paddingVertical: 22,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  formCard: {
    backgroundColor: "#1483C7",
    margin: 16,
    padding: 16,
    borderRadius: 24,
  },
  label: {
    color: "#fff",
    marginBottom: 6,
    marginTop: 14,
    fontWeight: "600",
  },
  dropdown: {
    backgroundColor: "#BDBDBD",
    borderRadius: 10,
  },
  inputBox: {
    width: "100%",
    backgroundColor: "#EAEAEA",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 10,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateBox: {
    backgroundColor: "#BDBDBD",
    borderRadius: 10,
    padding: 6,
    width: "48%",
    marginBottom: 10,
  },
  dateLabel: {
    fontSize: 12,
    color: "#fff",
    marginBottom: 2,
  },
  button: {
    backgroundColor: "#2C4CCF",
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
