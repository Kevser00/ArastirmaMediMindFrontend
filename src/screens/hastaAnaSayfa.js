import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HatirlatmaKart from '../components/HatirlatmaKart';
import { useAuth } from '../context/AuthContext';
import { useHatirlatma } from '../context/HatirlatmaContext';

function HastaAnaSayfa() {
  const { hasta } = useAuth();
  const { hatirlatmalar, durumGuncelle } = useHatirlatma();

  const [showOnceki, setShowOnceki] = useState(false);

  // 🔹 Bekleyen hatırlatmalar
  const yakinHatirlatmalar = useMemo(
    () => hatirlatmalar.filter((h) => h.durum === 'bekliyor'),
    [hatirlatmalar]
  );

  // 🔹 Önceki hatırlatmalar
  const oncekiHatirlatmalar = useMemo(
    () => hatirlatmalar
      .filter((h) => h.durum !== 'bekliyor')
      .sort((a, b) => b.id - a.id),
    [hatirlatmalar]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6FAFF' }}>
      
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Hatırlatmalarım */}
        <Text style={styles.sectionTitle}>Hatırlatmalarım</Text>
        {yakinHatirlatmalar.length === 0 && (
          <Text style={styles.emptyText}>Şu anda bekleyen hatırlatma yok.</Text>
        )}
        {yakinHatirlatmalar.map((ilac) => (
          <HatirlatmaKart
            key={ilac.id}
            ilac={ilac}
            onIctim={() => durumGuncelle(ilac.id, 'icildi')}
            onAtladim={() => durumGuncelle(ilac.id, 'atlandi')}
          />
        ))}

        {/* Önceki Hatırlatmalarım */}
        <TouchableOpacity
          style={styles.toggleBtn}
          onPress={() => setShowOnceki(!showOnceki)}
        >
          <Text style={styles.toggleText}>
            {showOnceki ? 'Önceki Hatırlatmalarımı Gizle' : 'Önceki Hatırlatmalarım'}
          </Text>
        </TouchableOpacity>

        {showOnceki && oncekiHatirlatmalar.length === 0 && (
          <Text style={styles.emptyText}>Henüz önceki hatırlatman yok.</Text>
        )}

        {showOnceki && oncekiHatirlatmalar.map((ilac) => (
          <HatirlatmaKart
            key={ilac.id}
            ilac={ilac}
            readOnly={true} // artık sadece durum yazacak
          />
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

export default HastaAnaSayfa;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F6FA',
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 12,
    color: '#374151',
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
    marginVertical: 6,
  },
  toggleBtn: {
    marginTop: 16,
    marginBottom: 16,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#2C4CCF',
    borderRadius: 12,
  },
  toggleText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});
