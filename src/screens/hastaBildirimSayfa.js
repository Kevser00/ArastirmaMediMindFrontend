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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import { medicalDataService } from "../api/medicalDataService";
import { reminderService } from "../api/reminderService";

const HastaBildirimSayfa = ({ navigation }) => {
  const [medicines, setMedicines] = useState([]);
  const [freqs, setFreqs] = useState([]);

  const [loadingData, setLoadingData] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [medicineId, setMedicineId] = useState(null);
  const [medicineOpen, setMedicineOpen] = useState(false);

  const [frequencyId, setFrequencyId] = useState(null);
  const [frequencyOpen, setFrequencyOpen] = useState(false);

  const [dosage, setDosage] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setFinishDate] = useState(new Date());
  const [note, setNote] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingData(true);

        const [m, f] = await Promise.all([
          medicalDataService.getMedicines(),
          medicalDataService.getFrequencies(),
        ]);

        // hem camelCase hem PascalCase güvenli
        setMedicines(
          (m || []).map((x) => ({
            label: x.name ?? x.Name ?? "",
            value: x.id ?? x.Id ?? null,
          }))
        );

        setFreqs(
          (f || []).map((x) => ({
            label: x.name ?? x.Name ?? "",
            value: x.id ?? x.Id ?? null,
          }))
        );
      } catch (e) {
        console.log("MEDICAL DATA ERR:", e?.response?.data || e.message);
        Alert.alert("Hata", "İlaç/Sıklık listesi alınamadı. Token var mı kontrol edin.");
      } finally {
        setLoadingData(false);
      }
    };

    load();
  }, []);

  const canSubmit = useMemo(() => {
    return !!medicineId && !!frequencyId && dosage.trim().length > 0;
  }, [medicineId, frequencyId, dosage]);

  const hatirlatmaEkle = async () => {
    if (!canSubmit) {
      Alert.alert("Uyarı", "İlaç, sıklık ve doz alanlarını doldurun.");
      return;
    }

    // küçük koruma: bitiş başlangıçtan önce olmasın
    if (finishDate < startDate) {
      Alert.alert("Uyarı", "Bitiş tarihi başlangıç tarihinden önce olamaz.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        dosage: dosage.trim(),
        startDate,          // axios ISO stringe çevirir
        finishDate,
        medicineId,
        frequencyOfUseId: frequencyId,
        note: note?.trim() || null,
      };

      await reminderService.create(payload);

      Alert.alert("Başarılı", "Hatırlatma eklendi.");
      navigation.goBack();
    } catch (e) {
      console.log("REMINDER CREATE ERR:", e?.response?.data || e.message);
      Alert.alert("Hata", "Hatırlatma eklenemedi. Token/Authorize kontrol edin.");
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
            setValue={(cb) => setMedicineId(cb)}
            placeholder={loadingData ? "Yükleniyor..." : "İlaç seçiniz"}
            disabled={disabled}
            containerStyle={{ marginBottom: 10, zIndex: 3000 }}
            style={styles.dropdown}
            listMode="SCROLLVIEW"
          />

          <Text style={styles.label}>Doz</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Örn: 1 tablet"
            placeholderTextColor="#555"
            value={dosage}
            onChangeText={setDosage}
            editable={!disabled}
          />

          <Text style={styles.label}>Tekrar Sıklığı</Text>
          <DropDownPicker
            open={frequencyOpen}
            value={frequencyId}
            items={freqs}
            setOpen={setFrequencyOpen}
            setValue={(cb) => setFrequencyId(cb)}
            placeholder={loadingData ? "Yükleniyor..." : "Sıklık seçiniz"}
            disabled={disabled}
            containerStyle={{ marginBottom: 10, zIndex: 2000 }}
            style={styles.dropdown}
            listMode="SCROLLVIEW"
          />

          <Text style={styles.label}>Başlangıç ve Bitiş Tarihi</Text>
          <View style={styles.dateRow}>
            <View style={styles.dateBox}>
              <Text style={styles.dateLabel}>Başlangıç</Text>
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={(e, d) => d && setStartDate(d)}
                disabled={disabled}
              />
            </View>

            <View style={styles.dateBox}>
              <Text style={styles.dateLabel}>Bitiş</Text>
              <DateTimePicker
                value={finishDate}
                mode="date"
                display="default"
                onChange={(e, d) => d && setFinishDate(d)}
                disabled={disabled}
              />
            </View>
          </View>

          <Text style={styles.label}>Not</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Örn: Yemekten sonra alın"
            placeholderTextColor="#555"
            value={note}
            onChangeText={setNote}
            editable={!disabled}
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
