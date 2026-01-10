// KEVSER - DrIlacEkle.js (API'ye bağlı)
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../../services/api';

const DrIlacEkle = () => {
  const [patientId, setPatientId] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [dose, setDose] = useState('');
  const [frequency, setFrequency] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!patientId || !medicineName) {
      Alert.alert('Uyarı', 'Hasta ID ve ilaç adı zorunludur');
      return;
    }

    try {
      setLoading(true);

      await api.post(
        `/api/doctors/patients/${patientId}/medications`,
        {
          medicineName,
          dose,
          frequency,
          startDate,
          endDate,
          time: `${hour}:${minute}`,
          note,
        }
      );

      Alert.alert('Başarılı', 'İlaç başarıyla eklendi');

      // Form reset
      setMedicineName('');
      setDose('');
      setFrequency('');
      setStartDate('');
      setEndDate('');
      setHour('');
      setMinute('');
      setNote('');
    } catch (err) {
      Alert.alert('Hata', 'İlaç eklenemedi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerSide}>
          <Image
            source={require('../../assets/medilogo.png')}
            style={styles.headerLogo}
          />
        </View>
        <Text style={styles.headerTitle}>İlaç Ekle</Text>
      </View>

      {/* ÜST ARAMA */}
      <View style={styles.topSearchWrap}>
        <View style={styles.topSearchBox}>
          <Ionicons name="search-outline" size={18} color="#666" />
          <TextInput
            placeholder="Hasta ID giriniz"
            placeholderTextColor="#777"
            style={styles.topSearchInput}
            keyboardType="numeric"
            value={patientId}
            onChangeText={setPatientId}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formCard}>
          <Label title="İlaç Adı" />
          <Input value={medicineName} onChangeText={setMedicineName} />

          <Label title="İlaç Dozu" />
          <Input value={dose} onChangeText={setDose} />

          <Label title="Tekrar Sıklığı" />
          <Input value={frequency} onChangeText={setFrequency} />

          <View style={styles.row}>
            <View style={styles.half}>
              <Label title="Başlangıç Tarihi" />
              <Input
                placeholder="YYYY-MM-DD"
                value={startDate}
                onChangeText={setStartDate}
              />
            </View>

            <View style={styles.half}>
              <Label title="Bitiş Tarihi" />
              <Input
                placeholder="YYYY-MM-DD"
                value={endDate}
                onChangeText={setEndDate}
              />
            </View>
          </View>

          <Label title="İlaç Saati" />
          <View style={styles.row}>
            <Input
              style={styles.timeInput}
              placeholder="09"
              keyboardType="numeric"
              value={hour}
              onChangeText={setHour}
            />
            <Text style={styles.timeColon}>:</Text>
            <Input
              style={styles.timeInput}
              placeholder="00"
              keyboardType="numeric"
              value={minute}
              onChangeText={setMinute}
            />
          </View>

          <Label title="İlaç Notu" />
          <Input
            multiline
            style={styles.noteInput}
            value={note}
            onChangeText={setNote}
          />

          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#1483C7" />
            ) : (
              <Text style={styles.submitText}>İlaç Ekle</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DrIlacEkle;

/* Küçük componentler */
const Label = ({ title }) => <Text style={styles.label}>{title}</Text>;

const Input = ({ style, ...props }) => (
  <TextInput
    {...props}
    placeholderTextColor="#888"
    style={[styles.input, style]}
  />
);

/* STYLES */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },

  header: {
    backgroundColor: '#1483C7',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  headerSide: { width: 44 },
  headerLogo: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff' },
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  topSearchWrap: { padding: 16 },
  topSearchBox: {
    height: 40,
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topSearchInput: { flex: 1, fontSize: 13 },

  scrollContent: { padding: 16, paddingBottom: 140 },

  formCard: {
    backgroundColor: '#1483C7',
    borderRadius: 26,
    padding: 16,
  },

  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 12,
  },

  input: {
    backgroundColor: '#E0E0E0',
    borderRadius: 18,
    paddingHorizontal: 14,
    height: 48,
    marginTop: 6,
  },

  noteInput: { height: 110, textAlignVertical: 'top' },

  row: { flexDirection: 'row', gap: 12 },
  half: { flex: 1 },

  timeInput: { flex: 1, textAlign: 'center' },
  timeColon: { color: '#fff', fontSize: 18, fontWeight: '700' },

  submitBtn: {
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 14,
    marginTop: 24,
    alignItems: 'center',
  },

  submitText: {
    color: '#1483C7',
    fontWeight: '800',
    fontSize: 15,
  },
});
