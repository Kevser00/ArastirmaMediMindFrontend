import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/api'; // API importu eklendi

const HastaBilgiSayfa = ({ navigation }) => {
  const { hasta, logout } = useAuth();

  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    kronikHastaliklar: 'Yok',
    ilacGecmisi: 'Yok',
  });
  const [loading, setLoading] = useState(false);

  // 🔹 Sayfa açıldığında hem Context'ten hem API'den veriyi al
  useEffect(() => {
    // 1. Önce Context'ten (Kayıt/Giriş anındaki veriler) anlık yükle
    if (hasta) {
      setProfile((prev) => ({
        ...prev,
        fullName: `${hasta.ad || hasta.name || ''} ${hasta.soyad || hasta.surname || ''}`,
        email: hasta.email || '',
      }));
    }

    // 2. Sonra Backend'den en güncel detayları çek
    const fetchPatientData = async () => {
      try {
        setLoading(true);
        const res = await api.get('/api/patients/me'); // Backend endpoint'inize göre güncelleyin
        if (res.data) {
          setProfile({
            fullName: `${res.data.name} ${res.data.surname}`,
            email: res.data.email,
            kronikHastaliklar: res.data.chronicDiseases || 'Yok',
            ilacGecmisi: res.data.medicationHistory || 'Yok',
          });
        }
      } catch (e) {
        console.log("Hasta detayları sunucudan alınamadı, yerel veriler kullanılıyor.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [hasta]);

  const handleChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      console.log('Güncelleniyor:', profile);
      // await api.put('/api/patients/me', profile); // Güncelleme için backend bağlantısı
      alert("Bilgileriniz güncellendi.");
    } catch (e) {
      alert("Güncelleme sırasında bir hata oluştu.");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigation.replace('kullaniciSecim');
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#F4F6FA' }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* 📄 PROFİL KARTI */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Hasta Bilgileri</Text>
          {loading && <ActivityIndicator size="small" color="#1483C7" />}
        </View>

        <InfoRow
          label="Ad / Soyad"
          value={profile.fullName}
          onChangeText={(v) => handleChange('fullName', v)}
        />

        <Divider />

        <InfoRow
          label="E-posta"
          value={profile.email}
          onChangeText={(v) => handleChange('email', v)}
          keyboardType="email-address"
        />

        <Divider />

        <InfoRow
          label="Kronik Hastalıklar"
          value={profile.kronikHastaliklar}
          onChangeText={(v) => handleChange('kronikHastaliklar', v)}
          multiline
        />

        <Divider />

        <InfoRow
          label="İlaç Geçmişi"
          value={profile.ilacGecmisi}
          onChangeText={(v) => handleChange('ilacGecmisi', v)}
          multiline
        />

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={handleSave}
        >
          <Text style={styles.saveBtnText}>Bilgilerimi Güncelle</Text>
        </TouchableOpacity>
      </View>

      {/* 🚪 ÇIKIŞ */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={18} color="#fff" />
        <Text style={styles.logoutText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

/* 🔹 BİLGİ SATIRI BİLEŞENİ */
const InfoRow = ({ label, value, onChangeText, keyboardType = 'default', multiline = false }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <TextInput
      style={[styles.rowInput, multiline && { height: 70, textAlignVertical: 'top' }]}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      multiline={multiline}
      placeholder="Bilgi girilmemiş..."
    />
  </View>
);

const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40 },
  card: { backgroundColor: '#fff', borderRadius: 18, padding: 16, elevation: 2, borderWidth: 1, borderColor: '#E8EEF6' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cardTitle: { fontSize: 16, fontWeight: '800', color: '#1483C7' },
  row: { marginBottom: 15 }, // Yatayda sıkışmaması için alt alta dizilim daha iyi olabilir
  rowLabel: { fontWeight: '700', color: '#6B7280', marginBottom: 5 },
  rowInput: { 
    backgroundColor: '#F9FAFB', 
    borderWidth: 1, 
    borderColor: '#D1D5DB', 
    borderRadius: 10, 
    padding: 10, 
    fontSize: 14, 
    color: '#111827' 
  },
  divider: { height: 1, backgroundColor: '#EEF2F7', marginVertical: 8 },
  saveBtn: { marginTop: 10, backgroundColor: '#1483C7', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  saveBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  logoutBtn: { marginTop: 20, backgroundColor: '#E53935', borderRadius: 12, paddingVertical: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  logoutText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});

export default HastaBilgiSayfa;