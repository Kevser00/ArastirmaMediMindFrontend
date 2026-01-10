import React, { useMemo, useState } from "react";
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
  ScrollView,
} from "react-native";

import NavigationFooter from "../components/NavigationFooter";
import { useAuth } from "../context/AuthContext";

const GirisDr = ({ navigation }) => {
  const { loginDoctor, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [sifreTouched, setSifreTouched] = useState(false);

  // Email doğrulama: Standart e-posta formatı
  const isValidEmail = (val) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(val.trim());

  /**
   * Şifre doğrulama (Regex Düzeltildi):
   * - En az 8 karakter
   * - En az 1 Büyük harf (?=.*[A-Z])
   * - En az 1 Küçük harf (?=.*[a-z])
   * - En az 1 Rakam (?=.*[0-9])
   * - En az 1 Özel karakter (?=.*[^a-zA-Z0-9])
   */
  const isStrongPassword = (val) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/.test(val);

  const emailError = useMemo(() => {
    if (!emailTouched) return "";
    if (!email.trim()) return "E-posta boş bırakılamaz.";
    if (!isValidEmail(email)) return "Geçerli bir e-posta giriniz.";
    return "";
  }, [email, emailTouched]);

  const sifreError = useMemo(() => {
    if (!sifreTouched) return "";
    if (!sifre) return "Şifre boş bırakılamaz.";
    if (!isStrongPassword(sifre))
      return "Şifre en az 8 karakter, 1 büyük, 1 küçük, 1 sayı ve 1 özel karakter içermelidir.";
    return "";
  }, [sifre, sifreTouched]);

  const isFormValid = useMemo(
    () => isValidEmail(email) && isStrongPassword(sifre),
    [email, sifre]
  );

  const handleLogin = async () => {
    setEmailTouched(true);
    setSifreTouched(true);

    if (!isFormValid) {
      Alert.alert("Uyarı", "Lütfen bilgileri eksiksiz ve doğru giriniz.");
      return;
    }

    const result = await loginDoctor(email.trim().toLowerCase(), sifre);

    if (!result?.ok) {
      Alert.alert("Hata", "E-posta veya şifre hatalı.");
      return;
    }

    const doctor = {
      email: email.trim().toLowerCase(),
      raw: result.data,
    };

    navigation.replace("DoktorStack", {
      screen: "DoktorTabs",
      params: { doctor },
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Image
          source={require("../../assets/medilogo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Doktor Girişi</Text>

        <View style={styles.box}>
          <TextInput
            placeholder="E-posta"
            placeholderTextColor="#888"
            style={[styles.input, emailError ? styles.inputError : null]}
            value={email}
            onChangeText={setEmail}
            onBlur={() => setEmailTouched(true)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {emailError ? <Text style={styles.err}>{emailError}</Text> : null}

          <TextInput
            placeholder="Şifre"
            placeholderTextColor="#888"
            secureTextEntry
            style={[styles.input, sifreError ? styles.inputError : null]}
            value={sifre}
            onChangeText={setSifre}
            onBlur={() => setSifreTouched(true)}
            autoCapitalize="none"
          />
          {sifreError ? <Text style={styles.err}>{sifreError}</Text> : null}

          <TouchableOpacity onPress={() => navigation.navigate("kayitDr")} activeOpacity={0.7}>
            <Text style={styles.link}>Hesabın yok mu? Kaydol</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("sifremiUnuttum")} activeOpacity={0.7}>
            <Text style={styles.link}>Şifremi unuttum</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, (!isFormValid || loading) && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Giriş Yap</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      <NavigationFooter onBack={() => navigation.navigate("kullaniciSecim")} />
    </KeyboardAvoidingView>
  );
};

export default GirisDr;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1483C7" },
  scrollContent: { alignItems: "center", paddingBottom: 100 },
  logo: { width: 80, height: 80, marginTop: 60, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "600", color: "white", marginBottom: 20 },
  box: { 
    width: "85%", 
    backgroundColor: "white", 
    borderRadius: 25, 
    paddingVertical: 30, 
    paddingHorizontal: 20, 
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  input: { 
    width: "100%", 
    backgroundColor: "#EAEAEA", 
    borderRadius: 10, 
    paddingHorizontal: 15, 
    paddingVertical: 12, 
    fontSize: 16, 
    marginBottom: 5, 
    borderWidth: 1, 
    borderColor: "transparent" 
  },
  inputError: { borderColor: "#E53935", backgroundColor: "#FDECEA" },
  err: { color: "#E53935", fontSize: 11, textAlign: "left", marginBottom: 10, paddingHorizontal: 5 },
  link: { color: "#1642BB", fontSize: 14, marginBottom: 12, fontWeight: "500" },
  button: { backgroundColor: "#1642BB", paddingVertical: 14, borderRadius: 25, alignItems: "center", marginTop: 10 },
  buttonDisabled: { backgroundColor: "#A0A0A0" },
  buttonText: { color: "white", fontSize: 17, fontWeight: "600" },
});