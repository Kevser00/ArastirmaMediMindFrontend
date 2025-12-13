// KEVSER - GirisHasta
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

const GirisHasta = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const isValidEmail = (val) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(val.trim());

  const isStrongPassword = (val) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).{8,}$/.test(
      val
    );

  const emailError = useMemo(() => {
    if (!emailTouched) return '';
    if (!email.trim()) return 'E-posta boş bırakılamaz.';
    if (!isValidEmail(email)) return 'Geçerli bir e-posta giriniz.';
    return '';
  }, [email, emailTouched]);

  const passwordError = useMemo(() => {
    if (!passwordTouched) return '';
    if (!password) return 'Şifre boş bırakılamaz.';
    if (!isStrongPassword(password))
      return 'Şifre en az 8 karakter, 1 büyük, 1 küçük ve 1 özel karakter içermelidir.';
    return '';
  }, [password, passwordTouched]);

  const isFormValid = useMemo(
    () => isValidEmail(email) && isStrongPassword(password),
    [email, password]
  );

  const handleLogin = () => {
    setEmailTouched(true);
    setPasswordTouched(true);

    if (!isFormValid) return;

    console.log('Giriş başarılı');
    // navigation.navigate('HastaAnasayfa');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/medilogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Giriş Yap</Text>

      <View style={styles.box}>
        {/* EMAIL */}
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
        />

        {emailTouched && emailError ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{emailError}</Text>
          </View>
        ) : null}

        {/* PASSWORD */}
        <TextInput
          placeholder="Şifre"
          placeholderTextColor="#888"
          secureTextEntry
          style={[
            styles.input,
            passwordTouched && passwordError ? styles.inputError : null,
          ]}
          value={password}
          onChangeText={(t) => {
            setPassword(t);
            if (!passwordTouched) setPasswordTouched(true);
          }}
          onBlur={() => setPasswordTouched(true)}
          autoCapitalize="none"
        />

        {passwordTouched && passwordError ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{passwordError}</Text>
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
          <Text style={styles.sifreUnuttumText}>Şifremi unuttum</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, !isFormValid && styles.buttonDisabled]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>

      <NavigationFooter onBack={() => navigation.navigate('kullaniciSecim')} />
    </View>
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
  sifreUnuttumText: {
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
