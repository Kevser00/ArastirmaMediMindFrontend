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
import { useAuth } from '../context/AuthContext'; // Context'i import ettik

const DrBilgiSayfa = ({ navigation }) => {
  // Context'teki doctor state'ini çekiyoruz
  const { doctor, logout } = useAuth(); 
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        // Arka planda verileri tazele
        const res = await api.get('/api/doctors/me');
        setProfile(res.data);
      } catch (e) {
        console.log("Profil güncellenirken hata oluştu, mevcut veriler gösteriliyor.");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigation.replace('kullaniciSecim');
  };

  // ANLIK VERİ ÖNCELİĞİ:
  // 1. profile (API'den taze gelen) 
  // 2. doctor (Kayıt/Giriş anında Context'e yazılan)
  const name = profile?.name || doctor?.name || "Yükleniyor...";
  const surname = profile?.surname || doctor?.surname || "";
  const regNo = profile?.registrationNumber || doctor?.registrationNumber || "-";
  const email = profile?.email || doctor?.email || "-";

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
            <Text style={styles.headerHi}>Hoş Geldiniz,</Text>
            {/* Burası artık anlık olarak dolacak */}
            <Text style={styles.headerName}>{name} {surname}</Text>
          </View>
        </View>
      </View>

      {/* BİLGİ KARTI */}
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Kayıt Bilgileriniz</Text>
            {loading && <ActivityIndicator size="small" color="#1483C7" />}
          </View>

          <InfoRow label="Ad Soyad" value={`${name} ${surname}`} />
          <Divider />

          <InfoRow label="Sicil No" value={regNo} />
          <Divider />

          <InfoRow label="E-posta" value={email} />
        </View>
      </View>

      {/* ÇIKIŞ */}
      <View style={styles.bottomArea}>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutBtnText}>Güvenli Çıkış</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const InfoRow = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value}</Text>
  </View>
);

const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F6F8FB' },
  header: {
    backgroundColor: '#1483C7',
    paddingVertical: 35,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  headerLogo: { width: 55, height: 55, borderRadius: 27.5, backgroundColor: '#fff', padding: 5 },
  headerHi: { color: '#EAF6FF', fontSize: 14, fontWeight: '600' },
  headerName: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
  content: { padding: 20 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  cardTitle: { fontSize: 15, fontWeight: '800', color: '#1483C7' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 14 },
  rowLabel: { color: '#6B7280', fontSize: 14, fontWeight: '600' },
  rowValue: { color: '#111827', fontSize: 14, fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#F3F4F6' },
  bottomArea: { position: 'absolute', bottom: 40, width: '100%', alignItems: 'center' },
  logoutBtn: { backgroundColor: '#E53935', borderRadius: 15, paddingHorizontal: 30, paddingVertical: 15, flexDirection: 'row', alignItems: 'center', gap: 10 },
  logoutBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default DrBilgiSayfa;