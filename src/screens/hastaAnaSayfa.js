import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import HatirlatmaKart from '../components/HatirlatmaKart';
import { useAuth } from '../context/AuthContext';
import { useHatirlatma } from '../context/HatirlatmaContext';

function HastaAnaSayfa({ route }) {
  const { hasta } = useAuth();
  const { hatirlatmalar, durumGuncelle } = useHatirlatma(); // <- context’ten alıyoruz

  const [showOnceki, setShowOnceki] = useState(false);

  const yakinHatirlatmalar = hatirlatmalar.filter(
    (h) => h.durum === 'bekliyor'
  );

  const oncekiHatirlatmalar = hatirlatmalar
    .filter((h) => h.durum !== 'bekliyor')
    .sort((a, b) => b.id - a.id);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.baslik}>
          Merhaba {hasta?.ad} {hasta?.soyad}
        </Text>

        <Text style={styles.sectionTitle}>Hatırlatmalarım</Text>

        {yakinHatirlatmalar.map((ilac) => (
          <HatirlatmaKart
            key={ilac.id}
            ilac={ilac}
            onIctim={() =>
              durumGuncelle(ilac.id, 'icildi')
            }
            onAtladim={() =>
              durumGuncelle(ilac.id, 'atlandi')
            }
          />
        ))}

        <TouchableOpacity
          onPress={() => setShowOnceki(!showOnceki)}
        >
          <Text style={styles.sectionTitle}>
            Önceki Hatırlatmalarım {showOnceki ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>

        {showOnceki &&
          oncekiHatirlatmalar.map((ilac) => (
            <HatirlatmaKart
              key={ilac.id}
              ilac={ilac}
              gecmis
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default HastaAnaSayfa;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
    backgroundColor: '#F4F6FA',
  },
  baslik: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 12,
  },
});
