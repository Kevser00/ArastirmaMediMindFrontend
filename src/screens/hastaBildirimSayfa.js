import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import { medicalDataService } from "../api/medicalDataService";
import { reminderService } from "../api/reminderService";
import { useHatirlatma } from "../context/HatirlatmaContext";

const HastaBildirimSayfa = ({ navigation }) => {
  const { refresh } = useHatirlatma();

  const [medicines, setMedicines] = useState([]);
  const [freqs, setFreqs] = useState([]);

  const [loadingData, setLoadingData] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [medicineId, setMedicineId] = useState(null);
  const [medicineOpen, setMedicineOpen] = useState(false);

  const [frequencyId, setFrequencyId] = useState(null);
  const [frequencyOpen, setFrequencyOpen] = useState(false);

  const [dosage, setDosage] = useState("");
  const [note, setNote] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setFinishDate] = useState(new Date());

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showFinishPicker, setShowFinishPicker] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingData(true);

        const [m, f] = await Promise.all([
          medicalDataService.getMedicines(),
          medicalDataService.getFrequencies(),
        ]);

        setMedicines(
          (m || []).map((x) => ({
            label: x.name,
            value: x.id,
          }))
        );

        setFreqs(
          (f || []).map((x) => ({
            label: x.name,
            value: x.id,
          }))
        );
      } catch {
        Alert.alert("Hata", "İlaç / sıklık listesi alınamadı");
      } finally {
        setLoadingData(false);
      }
    };

    load();
  }, []);

  const canSubmit = useMemo(
    () => !!medicineId && !!frequencyId && dosage.trim().length > 0,
    [medicineId, frequencyId, dosage]
  );

  const hatirlatmaEkle = async () => {
    if (!canSubmit) {
      Alert.alert("Uyarı", "Zorunlu alanları doldurun");
      return;
    }

    if (finishDate < startDate) {
      Alert.alert("Uyarı", "Bitiş tarihi başlangıçtan önce olamaz");
      return;
    }

    try {
      setSubmitting(true);

      await reminderService.create({
        dosage: dosage.trim(),
        startDate,
        finishDate,
        medicineId,
        frequencyOfUseId: frequencyId,
        note: note?.trim() || null,
      });

      await refresh(); // 🔥 ana sayfa anında güncellenir

      Alert.alert("Başarılı", "Hatırlatma eklendi");
      navigation.goBack();
    } catch {
      Alert.alert("Hata", "Hatırlatma eklenemedi");
    } finally {
      setSubmitting(false);
    }
  };

  const disabled = loadingData || submitting;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formCard}>
          <Text style={styles.label}>İlaç</Text>
          <DropDownPicker
            open={medicineOpen}
            value={medicineId}
            items={medicines}
            setOpen={setMedicineOpen}
            setValue={setMedicineId}
            disabled={disabled}
            style={styles.dropdown}
            zIndex={3000}
          />

          <Text style={styles.label}>Doz</Text>
          <TextInput
            style={styles.inputBox}
            value={dosage}
            onChangeText={setDosage}
            editable={!disabled}
            placeholder="Örn: 1 tablet"
          />

          <Text style={styles.label}>Tekrar Sıklığı</Text>
          <DropDownPicker
            open={frequencyOpen}
            value={frequencyId}
            items={freqs}
            setOpen={setFrequencyOpen}
            setValue={setFrequencyId}
            disabled={disabled}
            style={styles.dropdown}
            zIndex={2000}
            listMode="SCROLLVIEW"
          />

          <Text style={styles.label}>Başlangıç - Bitiş</Text>
          <View style={styles.dateRow}>
            <TouchableOpacity
              style={styles.dateBox}
              onPress={() => setShowStartPicker(true)}
              disabled={disabled}
            >
              <Text>Başlangıç</Text>
              <Text>{startDate.toLocaleDateString("tr-TR")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dateBox}
              onPress={() => setShowFinishPicker(true)}
              disabled={disabled}
            >
              <Text>Bitiş</Text>
              <Text>{finishDate.toLocaleDateString("tr-TR")}</Text>
            </TouchableOpacity>
          </View>

          {showStartPicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(e, d) => {
                setShowStartPicker(Platform.OS === "ios");
                if (d) setStartDate(d);
              }}
            />
          )}

          {showFinishPicker && (
            <DateTimePicker
              value={finishDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(e, d) => {
                setShowFinishPicker(Platform.OS === "ios");
                if (d) setFinishDate(d);
              }}
            />
          )}

          <Text style={styles.label}>Not</Text>
          <TextInput
            style={styles.inputBox}
            value={note}
            onChangeText={setNote}
            placeholder="Örn: Yemekten sonra"
          />

          <TouchableOpacity
            style={[styles.button, (!canSubmit || disabled) && { opacity: 0.6 }]}
            onPress={hatirlatmaEkle}
            disabled={!canSubmit || disabled}
          >
            {submitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Hatırlatmayı Ekle</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HastaBildirimSayfa;

/* STYLES */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { paddingBottom: 40 },
  formCard: {
    backgroundColor: "#1483C7",
    margin: 16,
    padding: 16,
    borderRadius: 24,
  },
  label: {
    color: "#fff",
    marginTop: 14,
    fontWeight: "700",
  },
  dropdown: {
    backgroundColor: "#BDBDBD",
    borderRadius: 10,
    marginTop: 6,
    listMode:"SCROLLVIEW"
  },
  inputBox: {
    backgroundColor: "#EAEAEA",
    borderRadius: 10,
    padding: 10,
    marginTop: 6,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  dateBox: {
    width: "48%",
    backgroundColor: "#BDBDBD",
    padding: 10,
    borderRadius: 10,
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
