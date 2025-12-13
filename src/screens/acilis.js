//KEVSER
import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const Acilis = ({ navigation }) => {
  // Uygulama açılınca otomatik geçiş
  useEffect(() => {
    const timer = setTimeout(() => {
      // Geri tuşuna basınca splash'e dönmesin diye replace kullandım
      navigation.replace('kullaniciSecim');
      // Eğer geri tuşuyla açılış ekranına dönülsün istersen:
      // navigation.navigate('kullaniciSecim');
    }, 10000); // 2 saniye  

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/medilogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.mediBox}>
        <Text style={styles.mediText}>MediMind</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1483C7',
    alignItems: 'center',
    paddingTop: '70%', // 👈 burayla oynayarak ince ayar yapabilirsin
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 12,
  },
  mediBox: {
    backgroundColor: 'white',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 40,
  },
  mediText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1483C7',
  },
});


export default Acilis;
