import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../../services/api'; // axios instance

// 🔹 DB'deki USER ID ile hasta getir
const fetchPatientById = async (userId) => {
  const res = await api.get(`/api/reminderselectbyId/${userId}`);

  // Backend Reminder list dönüyor → ekrana uygun hale getiriyoruz
  return {
    id: userId.toString(),
    name: res.data?.[0]?.userName ?? 'Hasta',
    activeDrugCount: res.data?.length ?? 0,
    lastDrug: res.data?.[0]?.time ?? '-',
    alertText: 'Takip ediliyor',
    reminders: res.data,
  };
};

const DrAnaSayfa = ({ navigation, route }) => {
  const doctor = route?.params?.doctor;

  const [query, setQuery] = useState('');
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const q = query.trim();
    setError('');

    if (!q) {
      setPatient(null);
      return;
    }

    if (isNaN(q)) {
      setError('Hasta ID sadece sayı olmalıdır.');
      return;
    }

    const t = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetchPatientById(q);
        setPatient(res);
      } catch (err) {
        setPatient(null);
        setError('Bu ID ile hasta bulunamadı.');
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(t);
  }, [query]);

  const data = useMemo(() => (patient ? [patient] : []), [patient]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardName}>{item.name}</Text>
      <Text style={styles.cardText}>🧪 {item.activeDrugCount} aktif ilaç</Text>
      <Text style={styles.cardText}>💊 Son ilaç: {item.lastDrug}</Text>
      <Text style={styles.cardText}>⚠️ {item.alertText}</Text>

      <TouchableOpacity
        style={styles.detailBtn}
        onPress={() =>
          navigation.navigate('drHastaGoruntule', {
            patient: item.id,
          })
        }
      >
        <Text style={styles.detailBtnText}>Detay Gör</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require('../../assets/medilogo.png')}
            style={styles.headerLogo}
          />
          <Text style={styles.headerTitle}>
            Merhaba {doctor?.name ?? 'Doktor'}
          </Text>
        </View>
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={20} color="#666" />
        <TextInput
          placeholder="Hasta ID (DB ID)"
          placeholderTextColor="#777"
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          keyboardType="numeric"
        />
        {loading && <ActivityIndicator size="small" color="#1483C7" />}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* CONTENT */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          !loading && !error ? (
            <Text style={styles.hint}>
              Hasta ID girince hasta kartı burada görünecek.
            </Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default DrAnaSayfa;

/* 🎨 STYLES */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#1483C7',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerLogo: {
    width: 44,
    height: 44,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  searchBox: {
    marginTop: 16,
    marginHorizontal: 16,
    height: 52,
    backgroundColor: '#E0E0E0',
    borderRadius: 26,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 120,
  },
  hint: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#888',
  },
  error: {
    marginTop: 10,
    textAlign: 'center',
    color: '#E53935',
    fontSize: 13,
  },
  card: {
    width: 190,
    backgroundColor: '#19B5D8',
    borderRadius: 22,
    padding: 14,
  },
  cardName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
  },
  cardText: {
    color: '#EFFFFF',
    fontSize: 13,
    marginBottom: 6,
    fontWeight: '600',
  },
  detailBtn: {
    marginTop: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 14,
    alignSelf: 'flex-start',
  },
  detailBtnText: {
    color: '#1483C7',
    fontWeight: '800',
    fontSize: 12,
  },
});
