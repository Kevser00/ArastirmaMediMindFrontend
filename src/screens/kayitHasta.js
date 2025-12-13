import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import NavigationFooter from '../components/NavigationFooter';

const KayitHasta = ({ navigation }) => {
  const [ad, setAd] = useState('');
  const [soyad, setSoyad] = useState('');
  const [email, setEmail] = useState('');
  const [sifre, setSifre] = useState('');
  const [sifreTekrar, setSifreTekrar] = useState('');

  const [adTouched, setAdTouched] = useState(false);
  const [soyadTouched, setSoyadTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [sifreTouched, setSifreTouched] = useState(false);
  const [sifreTekrarTouched, setSifreTekrarTouched] = useState(false);

  const isValidEmail = (val) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(val.trim());

  const isStrongPassword = (val) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).{8,}$/.test(
      val
    );

  const adError = useMemo(() => {
    if (!adTouched) return '';
    if (!ad.trim()) return 'Ad boş bırakılamaz.';
    return '';
  }, [ad, adTouched]);

  const soyadError = useMemo(() => {
    if (!soyadTouched) return '';
    if (!soyad.trim()) return 'Soyad boş bırakılamaz.';
    return '';
  }, [soyad, soyadTouched]);

  const emailError = useMemo(() => {
    if (!emailTouched) return '';
    if (!email.trim()) return 'E-posta boş bırakılamaz.';
    if (!isValidEmail(email)) return 'Geçerli bir e-posta giriniz.';
    return '';
  }, [email, emailTouched]);

  const sifreError = useMemo(() => {
    if (!sifreTouched) return '';
    if (!sifre) return 'Şifre boş bırakılamaz.';
    if (!isStrongPassword(sifre))
      return 'Şifre en az 8 karakter, 1 büyük, 1 küçük ve 1 özel karakter içermelidir.';
    return '';
  }, [sifre, sifreTouched]);

  const sifreTekrarError = useMemo(() => {
    if (!sifreTekrarTouched) return '';
    if (!sifreTekrar) return 'Şifre tekrar boş bırakılamaz.';
    if (sifreTekrar !== sifre) return 'Şifreler eşleşmiyor.';
    return '';
  }, [sifreTekrar, sifre, sifreTekrarTouched]);

  const isFormValid = useMemo(() => {
    return (
      ad.trim() &&
      soyad.trim() &&
      isValidEmail(email) &&
      isStrongPassword(sifre) &&
      sifreTekrar === sifre &&
      !!sifreTekrar
    );
  }, [ad, soyad, email, sifre, sifreTekrar]);

  const handleRegister = () => {
    setAdTouched(true);
    setSoyadTouched(true);
    setEmailTouched(true);
    setSifreTouched(true);
    setSifreTekrarTouched(true);

    if (!isFormValid) return;

    // ✅ Kayıt başarılı → Hasta giriş ekranına dön
    navigation.replace('girisHasta');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/medilogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Kayıt Ol</Text>

      <View style={styles.box}>
        <TextInput
          placeholder="Ad"
          placeholderTextColor="#888"
          style={[styles.input, adTouched && adError ? styles.inputError : null]}
          value={ad}
          onChangeText={(t) => {
            setAd(t);
            if (!adTouched) setAdTouched(true);
          }}
          onBlur={() => setAdTouched(true)}
        />
        {adTouched && adError ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{adError}</Text>
          </View>
        ) : null}

        <TextInput
          placeholder="Soyad"
          placeholderTextColor="#888"
          style={[
            styles.input,
            soyadTouched && soyadError ? styles.inputError : null,
          ]}
          value={soyad}
          onChangeText={(t) => {
            setSoyad(t);
            if (!soyadTouched) setSoyadTouched(true);
          }}
          onBlur={() => setSoyadTouched(true)}
        />
        {soyadTouched && soyadError ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{soyadError}</Text>
          </View>
        ) : null}

        <TextInput
          placeholder="E-posta"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          style={[
            styles.input,
            emailTouched && emailError ? styles.inputError : null,
          ]}
          value={email}
          onChangeText={(t) => {
            setEmail(t);
            if (!emailTouched) setEmailTouched(true);
          }}
          onBlur={() => setEmailTouched(true)}
        />
        {emailTouched && emailError ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{emailError}</Text>
          </View>
        ) : null}

        <TextInput
          placeholder="Şifre"
          placeholderTextColor="#888"
          secureTextEntry
          autoCapitalize="none"
          style={[
            styles.input,
            sifreTouched && sifreError ? styles.inputError : null,
          ]}
          value={sifre}
          onChangeText={(t) => {
            setSifre(t);
            if (!sifreTouched) setSifreTouched(true);
          }}
          onBlur={() => setSifreTouched(true)}
        />
        {sifreTouched && sifreError ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{sifreError}</Text>
          </View>
        ) : null}

        <TextInput
          placeholder="Şifre Tekrar"
          placeholderTextColor="#888"
          secureTextEntry
          autoCapitalize="none"
          style={[
            styles.input,
            sifreTekrarTouched && sifreTekrarError ? styles.inputError : null,
          ]}
          value={sifreTekrar}
          onChangeText={(t) => {
            setSifreTekrar(t);
            if (!sifreTekrarTouched) setSifreTekrarTouched(true);
          }}
          onBlur={() => setSifreTekrarTouched(true)}
        />
        {sifreTekrarTouched && sifreTekrarError ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{sifreTekrarError}</Text>
          </View>
        ) : null}

        <TouchableOpacity
          style={[styles.button, !isFormValid && styles.buttonDisabled]}
          onPress={handleRegister}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>

      <NavigationFooter onBack={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1483C7', alignItems: 'center' },
  logo: { width: 80, height: 80, marginTop: 60, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: '600', color: 'white', marginBottom: 20 },
  box: {
    marginTop: 10,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingVertical: 30,
    paddingHorizontal: 20,
    elevation: 6,
  },
  input: {
    width: '100%',
    backgroundColor: '#EAEAEA',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputError: { borderColor: '#E53935' },
  errorBox: {
    backgroundColor: '#FDECEA',
    borderColor: '#E53935',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  errorText: { color: '#E53935', fontSize: 12, textAlign: 'center' },
  button: {
    marginTop: 10,
    backgroundColor: '#1642BB',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: 'white', fontSize: 17, fontWeight: '600' },
});

export default KayitHasta;
