// KEVSER - drBilgiSayfa.js (Bilgi Kartı)
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DrBilgiSayfa = ({ navigation, route }) => {
  const doctorParam = route?.params?.doctor;

  // ✅ API'den gelecek yapıya hazır
  const [profile, setProfile] = useState({
    fullName: '',
    title: '',
    registryNo: '',
    email: '',
  });

  useEffect(() => {
    // 🔸 Şimdilik mock – sonra API’den dolduracaksın
    const name = doctorParam?.name ?? '';
    setProfile({
      fullName: name,
      title: 'Uzman Doktor',
      registryNo: 'DR-45879',
      email: 'doktor@ornek.com',
    });
  }, [doctorParam?.name]);

  const handleLogout = () => {
    navigation.replace('kullaniciSecim');
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require('../../assets/medilogo.png')}
            style={styles.headerLogo}
            resizeMode="cover"
          />
          <View>
            <Text style={styles.headerHi}>Merhaba</Text>
            <Text style={styles.headerName}>{profile.fullName}</Text>
          </View>
        </View>

        <Ionicons name="notifications-outline" size={22} color="#fff" />
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        {/* ✅ BİLGİ KARTI */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Doktor Bilgileri</Text>

          <InfoRow label="Ad Soyad" value={profile.fullName || '-'} />
          <Divider />

          <InfoRow label="Unvan" value={profile.title || '-'} />
          <Divider />

          <InfoRow label="Sicil No" value={profile.registryNo || '-'} />
          <Divider />

          <InfoRow label="E-posta" value={profile.email || '-'} />
        </View>
      </View>

      {/* ✅ ESKİ STİL ÇIKIŞ */}
      <View style={styles.bottomArea}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.logoutBtn}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={16} color="#fff" />
          <Text style={styles.logoutBtnText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DrBilgiSayfa;

/* 🔹 Bilgi satırı */
const InfoRow = ({ label, value }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
};

const Divider = () => <View style={styles.divider} />;

/* 🎨 STYLES */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F6F8FB', // ✅ kart hissi için hafif gri zemin
  },

  /* HEADER */
  header: {
    backgroundColor: '#1483C7',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    top:12,
    color: '#EAF6FF',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 2,
  },

  headerName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },

  /* CONTENT */
  content: {
    paddingHorizontal: 16,
    paddingTop: 18,
  },

  /* CARD */
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    gap: 12,
  },

  rowLabel: {
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '700',
    width: 90,
  },

  rowValue: {
    flex: 1,
    textAlign: 'right',
    color: '#111827',
    fontSize: 13,
    fontWeight: '800',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEF2F7',
  },

  /* ESKİ STİL ÇIKIŞ */
  bottomArea: {
    position: 'absolute',
    left: 18,
    bottom: 110, // tabbar üstünde
  },

  logoutBtn: {
    alignSelf: 'flex-start',
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
});
