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
  Alert,
} from 'react-native';

import NavigationFooter from '../components/NavigationFooter';
import { useAuth } from '../context/AuthContext';

const GirisHasta = ({ navigation }) => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [sifre, setSifre] = useState('');

  const [emailTouched, setEmailTouched] = useState(false);
  const [sifreTouched, setSifreTouched] = useState(false);

  const [loading, setLoading] = useState(false);

  const isValidEmail = (val) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(val.trim());

  // Doktor ekranındakiyle aynı güçlü şifre kuralı
  const isStrongPassword = (val) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~]).{8,}$/.test(
      val
    );

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

  const isFormValid = useMemo(
    () => isValidEmail(email) && isStrongPassword(sifre),
    [email, sifre]
  );

  const handleLogin = async () => {
    setEmailTouched(true);
    setSifreTouched(true);

    if (!isFormValid) return;

    try {
      setLoading(true);

      // AuthContext login senkron (true/false) dönüyor
      const success = login(email.trim(), sifre);

      if (!success) {
        Alert.alert('Hata', 'E-posta veya şifre hatalı');
        return;
      }

      // ✅ Başarılıysa hasta tarafına geç (route isimlerin farklıysa söyle)
      navigation.replace('HastaStack', { screen: 'HastaTabs' });
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
          placeholder="E-posta"
          placeholderTextColor="#888"
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
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
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
          onPress={() => navigation.navigate('kayitHasta')}
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
          style={[
            styles.button,
            (!isFormValid || loading) && styles.buttonDisabled,
          ]}
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
  inputError: {
    borderColor: '#E53935',
  },
  errorBox: {
    backgroundColor: '#FDECEA',
    borderColor: '#E53935',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  errorText: {
    color: '#E53935',
    fontSize: 12,
    textAlign: 'center',
  },
  kaydolText: {
    color: '#1642BB',
    fontSize: 13,
    marginBottom: 5,
  },
  sifreunuttumText: {
    color: '#1642BB',
    fontSize: 13,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1642BB',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
});

export default GirisHasta;
