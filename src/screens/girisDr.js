// src/screens/girisDr.js
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';

import NavigationFooter from '../components/NavigationFooter';

//  Şimdilik mock login (sonra API ile değiştir)
const loginDoctor = async ({ sicilNo, sifre }) => {
  await new Promise((r) => setTimeout(r, 600));
  // örnek dönüş
  return {
    id: 'DR-1',
    name: 'Ahmet Kara', // <-- normalde API’den gelir
    sicilNo,
  };
};

const GirisDr = ({ navigation }) => {
  const [sicilNo, setSicilNo] = useState('');
  const [sifre, setSifre] = useState('');

  const [sicilTouched, setSicilTouched] = useState(false);
  const [sifreTouched, setSifreTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValidSicil = (val) => {
    const v = val.trim();
    if (!v) return false;
    if (!/^\d+$/.test(v)) return false;
    if (v.length < 5) return false;
    return true;
  };

  const isStrongPassword = (val) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).{8,}$/.test(
      val
    );

  const sicilError = useMemo(() => {
    if (!sicilTouched) return '';
    if (!sicilNo.trim()) return 'Sicil no boş bırakılamaz.';
    if (!/^\d+$/.test(sicilNo.trim())) return 'Sicil no sadece rakam olmalı.';
    if (sicilNo.trim().length < 5) return 'Sicil no en az 5 haneli olmalı.';
    return '';
  }, [sicilNo, sicilTouched]);

  const sifreError = useMemo(() => {
    if (!sifreTouched) return '';
    if (!sifre) return 'Şifre boş bırakılamaz.';
    if (!isStrongPassword(sifre))
      return 'Şifre en az 8 karakter, 1 büyük, 1 küçük ve 1 özel karakter içermelidir.';
    return '';
  }, [sifre, sifreTouched]);

  const isFormValid = useMemo(
    () => isValidSicil(sicilNo) && isStrongPassword(sifre),
    [sicilNo, sifre]
  );

  const handleLogin = async () => {
    setSicilTouched(true);
    setSifreTouched(true);
    if (!isFormValid) return;

    try {
      setLoading(true);

      const doctor = await loginDoctor({
        sicilNo: sicilNo.trim(),
        sifre,
      });

      //  doctor bilgisini DoktorTabs’e taşı
      navigation.replace('DoktorStack', {
        screen: 'DoktorTabs',
        params: { doctor }, // <-- drAnaSayfa bunu kullanacak
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Image
        source={require('../../assets/medilogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Giriş Yap</Text>

      <View style={styles.box}>
        <TextInput
          placeholder="Sicil No"
          placeholderTextColor="#888"
          style={[
            styles.input,
            sicilTouched && sicilError ? styles.inputError : null,
          ]}
          value={sicilNo}
          onChangeText={(t) => {
            const onlyDigits = t.replace(/[^0-9]/g, '');
            setSicilNo(onlyDigits);
            if (!sicilTouched) setSicilTouched(true);
          }}
          onBlur={() => setSicilTouched(true)}
          keyboardType="number-pad"
        />
        {sicilTouched && sicilError ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{sicilError}</Text>
          </View>
        ) : null}

        <TextInput
          placeholder="Şifre"
          placeholderTextColor="#888"
          secureTextEntry
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
          autoCapitalize="none"
        />
        {sifreTouched && sifreError ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{sifreError}</Text>
          </View>
        ) : null}

        <TouchableOpacity
          onPress={() => navigation.navigate('kayitDr')}
          activeOpacity={0.7}
        >
          <Text style={styles.kaydolText}>Hesabın yok mu? Kaydol</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('sifremiUnuttum')}
          activeOpacity={0.7}
        >
          <Text style={styles.sifreunuttumText}>Şifremi unuttum</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, (!isFormValid || loading) && styles.buttonDisabled]}
          onPress={handleLogin}
          activeOpacity={0.8}
          disabled={!isFormValid || loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Giriş Yap</Text>
          )}
        </TouchableOpacity>
      </View>

      <NavigationFooter onBack={() => navigation.navigate('kullaniciSecim')} />
    </KeyboardAvoidingView>
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
  kaydolText: { color: '#1642BB', fontSize: 13, marginBottom: 5 },
  sifreunuttumText: { color: '#1642BB', fontSize: 13, marginBottom: 20 },
  button: {
    backgroundColor: '#1642BB',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: 'white', fontSize: 17, fontWeight: '600' },
});

export default GirisDr;
