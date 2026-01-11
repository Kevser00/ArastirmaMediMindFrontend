// KEVSER - DrBilgiSayfa.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../api/api';

const DrBilgiSayfa = ({ navigation }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);

        // 🔗 Backend endpoint (örnek)
        const res = await api.get('/api/doctors/me');

        setProfile(res.data);
      } catch (e) {
        setError('Doktor bilgileri alınamadı');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, []);

  const handleLogout = () => {
    navigation.replace('kullaniciSecim');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator size="large" color="#1483C7" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.error}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require('../../assets/medilogo.png')}
            style={styles.headerLogo}
          />
          <View>
            <Text style={styles.headerHi}>Profil Bilgilerim</Text>
            <Text style={styles.headerName}>
              {profile?.name} {profile?.surname}
            </Text>
          </View>
        </View>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Doktor Bilgileri</Text>

          <InfoRow
            label="Ad Soyad"
            value={`${profile?.name} ${profile?.surname}`}
          />
          <Divider />

          <InfoRow label="Sicil No" value={profile?.registiration_number} />
        </View>
      </View>

      {/* ÇIKIŞ */}
      <View style={styles.bottomArea}>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={16} color="#fff" />
          <Text style={styles.logoutBtnText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DrBilgiSayfa;

/* Küçük componentler */
const InfoRow = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value || '-'}</Text>
  </View>
);

const Divider = () => <View style={styles.divider} />;

/* STYLES */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F6F8FB',
  },
  header: {
    backgroundColor: '#1483C7',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerLogo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
  },
  headerHi: {
    color: '#EAF6FF',
    fontSize: 16,
    fontWeight: '700',
  },
  headerName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  card: {
    backgroundColor: '#FFFFFF',
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
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  rowLabel: {
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '700',
  },
  rowValue: {
    color: '#111827',
    fontSize: 13,
    fontWeight: '800',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEF2F7',
  },
  bottomArea: {
    position: 'absolute',
    left: 18,
    bottom: 110,
  },
  logoutBtn: {
    backgroundColor: '#E53935',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  logoutBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  error: {
    textAlign: 'center',
    color: 'red',
    marginTop: 40,
  },
});
