// KEVSER - DrHastaGoruntule.js (DEFAULT STATİK)
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DrHastaGoruntule = () => {
  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/medilogo.png')}
          style={styles.headerLogo}
        />
        <Text style={styles.headerTitle}>Hasta Detayı</Text>
        <Ionicons name="person-outline" size={22} color="#fff" />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* HASTA BİLGİ KARTI */}
        <View style={styles.card}>
          <Text style={styles.name}>Aslı Çiçek</Text>

          <View style={styles.row}>
            <Ionicons name="mail-outline" size={16} color="#EFFFFF" />
            <Text style={styles.info}>aslicicek05@gmail.com</Text>
          </View>
        </View>

        {/* KULLANILAN İLAÇLAR */}
        <Text style={styles.sectionTitle}>Kullandığı İlaçlar</Text>

        <View style={styles.medicineBox}>
          <Text style={styles.medicineItem}>• Tansiyon İlacı</Text>
          <Text style={styles.medicineItem}>• B12 Vitamini</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DrHastaGoruntule;

/* STYLES */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    backgroundColor: '#1483C7',
    padding: 16,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerLogo: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  content: {
    padding: 16,
    paddingBottom: 100,
  },

  card: {
    backgroundColor: '#19B5D8',
    borderRadius: 16,
    padding: 16,
    marginBottom: 22,
  },

  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  info: {
    color: '#EFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 10,
  },

  medicineBox: {
    backgroundColor: '#F2F6FA',
    borderRadius: 12,
    padding: 14,
  },

  medicineItem: {
    fontSize: 14,
    fontWeight: '600',
    color: '#173A59',
    marginBottom: 8,
  },
});