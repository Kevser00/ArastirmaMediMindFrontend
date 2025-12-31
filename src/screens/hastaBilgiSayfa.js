// MERYEM

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
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

  useEffect(() => {
    setProfile({
      fullName: `${hasta?.ad || ''} ${hasta?.soyad || ''}`,
      email: hasta?.email || '',
      kronikHastaliklar: 'Yok',
      ilacGecmisi: 'Yok',
    });
  }, [hasta]);

  // ✅ ÇIKIŞ + KULLANICI SEÇİM EKRANINA GİT
  const handleLogout = () => {
    logout();
    navigation.replace('kullaniciSecim');
  };

  const handleSave = () => {
    console.log('Kaydedilen bilgiler:', profile);
  };

  const handleChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profil Bilgilerim</Text>
        </View>

        {/* CONTENT */}
        <View style={styles.content}>
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
        </View>
      </ScrollView>

      {/* ÇIKIŞ BUTONU */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={handleLogout}
        >
          <Ionicons
            name="log-out-outline"
            size={16}
            color="#fff"
          />
          <Text style={styles.logoutBtnText}>
            Çıkış Yap
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HastaBilgiSayfa;

/* BİLGİ SATIRI */
const InfoRow = ({
  label,
  value,
  onChangeText,
  keyboardType = 'default',
  multiline = false,
}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <TextInput
        style={[
          styles.rowInput,
          multiline && { height: 60 },
        ]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
      />
    </View>
  );
};

const Divider = () => <View style={styles.divider} />;

/* STYLES */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#1483C7',
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  content: {
    paddingTop: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8EEF6',
    marginBottom: 20,
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
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 12,
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
    fontSize: 14,
    backgroundColor: '#F4F6FA',
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
  logoutContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#E8EEF6',
    backgroundColor: '#fff',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E53935',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  logoutBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});
