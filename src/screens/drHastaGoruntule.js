// KEVSER - DrHastaGoruntule.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../api/api';

const DrHastaGoruntule = ({ route }) => {
  // DrAnaSayfa’dan sadece veritabanındaki ID geliyor
  const patientId = route?.params?.patientId;

  const [patient, setPatient] = useState(null);
  const [takipData, setTakipData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!patientId) {
      setError('Hasta ID bulunamadı');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        // Hasta bilgisi
        const patientRes = await api.get(
          `/api/doctors/patients/${patientId}`
        );

        // Hasta ilaç takip raporu
        const reportRes = await api.get(
          `/api/doctors/patients/${patientId}/medication-report`
        );

        setPatient(patientRes.data);
        setTakipData(reportRes.data || []);
      } catch (err) {
        setError('Hasta bilgileri alınamadı');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [patientId]);

  /* LOADING */
  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator size="large" color="#1483C7" />
      </SafeAreaView>
    );
  }

  /* ERROR */
  if (error) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.errorText}>{error}</Text>
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
        </View>

        <Text style={styles.headerTitle}>Hasta Detayı</Text>

        <Ionicons name="notifications-outline" size={24} color="#fff" />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* HASTA KARTI */}
        <View style={styles.patientCard}>
          <Text style={styles.patientName}>
            {patient?.name} {patient?.surname}
          </Text>

          <View style={styles.patientRow}>
            <Ionicons name="call-outline" size={16} color="#EFFFFF" />
            <Text style={styles.patientInfo}>
              İletişim: {patient?.email || '-'}
            </Text>
          </View>

          <View style={styles.patientRow}>
            <Ionicons name="id-card-outline" size={16} color="#EFFFFF" />
            <Text style={styles.patientInfo}>
              Hasta ID: {patient?.id}
            </Text>
          </View>
        </View>

        {/* TAKİP TABLOSU */}
        <Text style={styles.sectionTitle}>Hasta Takip</Text>

        <View style={styles.table}>
          {/* Header */}
          <View style={[styles.row, styles.rowHeader]}>
            <Text style={[styles.cell, styles.cellHeader]}>İlaç Adı</Text>
            <Text style={[styles.cell, styles.cellHeader]}>Saat</Text>
            <Text style={[styles.cell, styles.cellHeader]}>Durum</Text>
            <Text style={[styles.cell, styles.cellHeader]}>Not</Text>
          </View>

          {/* Data */}
          {takipData.length === 0 ? (
            <Text style={styles.emptyText}>Kayıt bulunamadı</Text>
          ) : (
            takipData.map((r, idx) => (
              <View
                key={idx}
                style={[
                  styles.row,
                  idx % 2 === 0 ? styles.rowEven : styles.rowOdd,
                ]}
              >
                <Text style={styles.cell}>{r.medicineName}</Text>
                <Text style={styles.cell}>{r.time}</Text>
                <Text style={styles.cell}>{r.status}</Text>
                <Text style={styles.cell}>{r.note || '-'}</Text>
              </View>
            ))
          )}
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

  errorText: {
    textAlign: 'center',
    color: '#E53935',
    marginTop: 20,
    fontWeight: '700',
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

  emptyText: {
    textAlign: 'center',
    padding: 12,
    width: '100%',
    color: '#444',
    fontWeight: '600',
  },
});
