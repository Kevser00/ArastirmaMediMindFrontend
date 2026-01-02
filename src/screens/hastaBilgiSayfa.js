import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const HastaBilgiSayfa = ({ navigation }) => {
  const { hasta, logout } = useAuth();

  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    kronikHastaliklar: '',
    ilacGecmisi: '',
  });

  // 🔹 Kullanıcı bilgilerini doldur
  useEffect(() => {
    if (!hasta) return;

    setProfile({
      fullName: `${hasta.ad || ''} ${hasta.soyad || ''}`,
      email: hasta.email || '',
      kronikHastaliklar: 'Yok',
      ilacGecmisi: 'Yok',
    });
  }, [hasta]);

  const handleChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log('Kaydedilen bilgiler:', profile);
    // 🔜 Backend bağlanabilir
  };

  const handleLogout = () => {
    logout();
    navigation.replace('kullaniciSecim');
  };

  return (
    <ScrollView
  style={{ flex: 1, backgroundColor: '#F4F6FA' }}  // scrollView tamamen beyaz
  contentContainerStyle={styles.container}
  showsVerticalScrollIndicator={false}
>
      

      {/* 📄 PROFİL KARTI */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Hasta Bilgileri</Text>

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
          label="Kronik Hastalıklarım"
          value={profile.kronikHastaliklar}
          onChangeText={(v) =>
            handleChange('kronikHastaliklar', v)
          }
          multiline
        />

        <Divider />

        <InfoRow
          label="İlaç Geçmişim"
          value={profile.ilacGecmisi}
          onChangeText={(v) =>
            handleChange('ilacGecmisi', v)
          }
          multiline
        />

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={handleSave}
        >
          <Text style={styles.saveBtnText}>Kaydet</Text>
        </TouchableOpacity>
      </View>

      {/* 🚪 ÇIKIŞ */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={handleLogout}
      >
        <Ionicons
          name="log-out-outline"
          size={18}
          color="#fff"
        />
        <Text style={styles.logoutText}>
          Çıkış Yap
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HastaBilgiSayfa;

/* 🔹 BİLGİ SATIRI */
const InfoRow = ({
  label,
  value,
  onChangeText,
  keyboardType = 'default',
  multiline = false,
}) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <TextInput
      style={[
        styles.rowInput,
        multiline && { height: 70 },
      ]}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      multiline={multiline}
    />
  </View>
);

const Divider = () => <View style={styles.divider} />;

/* 🎨 STYLES */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#1483C7',
  },

  container: {
    backgroundColor: '#F4F6FA',
    padding: 16,
    paddingBottom: 40,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8EEF6',
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1483C7',
    marginBottom: 12,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },

  rowLabel: {
    width: 120,
    fontWeight: '700',
    color: '#6B7280',
  },

  rowInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#F4F6FA',
    fontSize: 14,
  },

  divider: {
    height: 1,
    backgroundColor: '#EEF2F7',
    marginVertical: 4,
  },

  saveBtn: {
    marginTop: 20,
    backgroundColor: '#2C4CCF',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },

  saveBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  logoutBtn: {
    marginTop: 24,
    backgroundColor: '#E53935',
    borderRadius: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  logoutText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});
