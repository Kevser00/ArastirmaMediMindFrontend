//KEVSER
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DrHastaGoruntule = ({ route }) => {
  // drAnaSayfa'dan gönderilecek: { patient }
  const patient = route?.params?.patient;

  const takipData = useMemo(
    () => [
      { ilacAdi: 'Klamoks', saat: '09:00', durum: 'İçti', not: 'Tok karnına' },
      { ilacAdi: 'B12&Ferritin', saat: '12:00', durum: 'Almadı', not: 'Aç tok farketmez, bir tane içilecek' },
      { ilacAdi: 'Klamoks', saat: '21:00', durum: 'Bekliyor', not: 'Tok karnına' },
    ],
    []
  );

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
        </View>

        <Text style={styles.headerTitle}>Hasta Detayı</Text>

        <Ionicons name="notifications-outline" size={24} color="#fff" />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* HASTA KARTI */}
        <View style={styles.patientCard}>
          <Text style={styles.patientName}>
            {patient?.name ?? 'Hasta Adı'}
          </Text>

          <View style={styles.patientRow}>
            <Ionicons name="call-outline" size={16} color="#EFFFFF" />
            <Text style={styles.patientInfo}>
              İletişim: {patient?.email ?? 'elif@example.com'}
            </Text>
          </View>
        </View>

        {/* HASTA TAKİP */}
        <Text style={styles.sectionTitle}>Hasta Takip</Text>

        <View style={styles.table}>
          {/* Header row */}
          <View style={[styles.row, styles.rowHeader]}>
            <Text style={[styles.cell, styles.cellHeader]}>İlaç Adı</Text>
            <Text style={[styles.cell, styles.cellHeader]}>Saat</Text>
            <Text style={[styles.cell, styles.cellHeader]}>Durum</Text>
            <Text style={[styles.cell, styles.cellHeader]}>Not</Text>
          </View>

          {/* Data rows */}
          {takipData.map((r, idx) => (
            <View key={idx} style={[styles.row, idx % 2 === 0 ? styles.rowEven : styles.rowOdd]}>
              <Text style={styles.cell}>{r.ilacAdi}</Text>
              <Text style={styles.cell}>{r.saat}</Text>
              <Text style={styles.cell}>{r.durum}</Text>
              <Text style={styles.cell}>{r.not}</Text>
            </View>
          ))}
        </View>

        {}
        {}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    backgroundColor: '#1483C7',
    paddingTop: 10,
    paddingBottom: 18,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerLeft: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
  },

  headerLogo: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 120,
  },

  patientCard: {
    backgroundColor: '#19B5D8',
    borderRadius: 16,
    padding: 14,
    marginBottom: 18,
  },

  patientName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },

  patientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  patientInfo: {
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

  table: {
    borderRadius: 10,
    overflow: 'hidden',
  },

  row: {
    flexDirection: 'row',
  },

  rowHeader: {
    backgroundColor: '#00A6D6',
  },

  rowEven: {
    backgroundColor: '#B7D0EA',
  },

  rowOdd: {
    backgroundColor: '#9FC1E3',
  },

  cell: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 11,
    color: '#173A59',
    fontWeight: '600',
  },

  cellHeader: {
    color: '#fff',
    fontWeight: '800',
  },
});

export default DrHastaGoruntule;
