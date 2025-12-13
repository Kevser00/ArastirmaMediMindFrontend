// KEVSER
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DrIlacEkle = () => {
  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER (Figma gibi: sol logo - ortada başlık - sağ zil) */}
      <View style={styles.header}>
        <View style={styles.headerSide}>
          <Image
            source={require('../../assets/medilogo.png')}
            style={styles.headerLogo}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.headerTitle}>İlaç Ekle</Text>

        <View style={styles.headerSideRight}>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
        </View>
      </View>

      {/* ÜSTTEKİ ARAMA (Figma’daki küçük arama) */}
      <View style={styles.topSearchWrap}>
        <View style={styles.topSearchBox}>
          <Ionicons name="search-outline" size={18} color="#666" />
          <TextInput
            placeholder="Hasta ID No giriniz"
            placeholderTextColor="#777"
            style={styles.topSearchInput}
          />
        </View>
      </View>

      {/* SCROLLABLE CONTENT */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* MAVİ CONTAINER */}
        <View style={styles.formCard}>
          <Label title="Hasta ID No" />
          <Input placeholder="Hasta ID giriniz" />

          {/* ✅ “Hasta Bilgileri” KISMI YOK */}

          <Label title="İlaç Adı" />
          <Input placeholder="İlaç adı" />

          <Label title="İlaç Dozu" />
          <Input placeholder="Örn: 1 tablet" />

          <Label title="Tekrar Sıklığı" />
          <Input placeholder="Örn: Günde 2 kez" />

          <View style={styles.row}>
            <View style={styles.half}>
              <Label title="Başlangıç Tarihi" />
              <Input placeholder="GG.AA.YYYY" />
            </View>

            <View style={styles.half}>
              <Label title="Bitiş Tarihi" />
              <Input placeholder="GG.AA.YYYY" />
            </View>
          </View>

          <Label title="İlaç Saati" />
          <View style={styles.row}>
            <Input style={styles.timeInput} placeholder="09" />
            <Text style={styles.timeColon}>:</Text>
            <Input style={styles.timeInput} placeholder="00" />
          </View>

          <Label title="İlaç Notu" />
          <Input
            placeholder="Varsa açıklama"
            multiline
            style={styles.noteInput}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/* 🔹 KÜÇÜK COMPONENTLER */
const Label = ({ title }) => <Text style={styles.label}>{title}</Text>;

const Input = ({ style, ...props }) => (
  <TextInput
    {...props}
    placeholderTextColor="#888"
    style={[styles.input, style]}
  />
);

export default DrIlacEkle;

/* 🎨 STYLES */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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

  headerSide: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  headerSideRight: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  headerLogo: {
    width: 44,
    height: 44,
    borderRadius: 20,
    backgroundColor: '#fff',
  },

  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  /* TOP SEARCH (Figma’daki küçük gri arama) */
  topSearchWrap: {
    paddingHorizontal: 16,
    marginTop: 10,
  },

  topSearchBox: {
    height: 40,
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  topSearchInput: {
    flex: 1,
    fontSize: 13,
    color: '#111',
  },

  /* SCROLL */
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 140, // tabbar için boşluk
  },

  /* FORM CARD */
  formCard: {
    backgroundColor: '#1483C7',
    borderRadius: 26,
    padding: 16,
  },

  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
    marginTop: 12,
  },

  input: {
    backgroundColor: '#E0E0E0',
    borderRadius: 18,
    paddingHorizontal: 14,
    height: 48,
    fontSize: 14,
    color: '#111',
  },

  noteInput: {
    height: 110,
    textAlignVertical: 'top',
    paddingTop: 12,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  half: {
    flex: 1,
  },

  timeInput: {
    flex: 1,
    textAlign: 'center',
  },

  timeColon: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
