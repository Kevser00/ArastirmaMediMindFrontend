import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

import { useAuth } from '../context/AuthContext';
import NavigationFooter from '../components/NavigationFooter';

const SifremiUnuttum = ({ navigation }) => {
  const { sifreGuncelle } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [touched, setTouched] = useState(false);

  const isValidEmail = (val) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(val.trim());

  const isStrongPassword = (val) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(val);

  const formError = useMemo(() => {
    if (!touched) return '';
    if (!email || !password || !password2)
      return 'Tüm alanlar doldurulmalıdır.';
    if (!isValidEmail(email)) return 'Geçerli bir e-posta giriniz.';
    if (!isStrongPassword(password))
      return 'Şifre en az 8 karakter, büyük harf ve özel karakter içermelidir.';
    if (password !== password2) return 'Şifreler uyuşmuyor.';
    return '';
  }, [email, password, password2, touched]);

  const handleSubmit = () => {
    setTouched(true);
    if (formError) return;

    const success = sifreGuncelle(email, password);

    if (!success) {
      Alert.alert('Hata', 'Bu e-posta ile kayıtlı bir hesap bulunamadı.');
      return;
    }

    Alert.alert(
      'Başarılı',
      'Şifreniz güncellendi. Giriş yapabilirsiniz.',
      [
        {
          text: 'Giriş Yap',
          onPress: () => navigation.navigate('girisHasta'),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/medilogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Şifre Yenile</Text>

      <View style={styles.box}>
        <TextInput
          placeholder="E-posta"
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Yeni Şifre"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          placeholder="Yeni Şifre (Tekrar)"
          secureTextEntry
          style={styles.input}
          value={password2}
          onChangeText={setPassword2}
        />

        {touched && formError ? (
          <Text style={styles.errorText}>{formError}</Text>
        ) : null}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Şifreyi Güncelle</Text>
        </TouchableOpacity>
      </View>

      <NavigationFooter onBack={() => navigation.goBack()} />
    </View>
  );
};

export default SifremiUnuttum;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1483C7',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    marginBottom: 20,
  },
  box: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 20,
    elevation: 6,
  },
  input: {
    backgroundColor: '#EAEAEA',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  errorText: {
    color: '#E53935',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1642BB',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
