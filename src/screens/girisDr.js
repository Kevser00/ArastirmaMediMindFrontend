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
} from "react-native";

import NavigationFooter from "../components/NavigationFooter";
import { useAuth } from "../context/AuthContext";

const GirisDr = ({ navigation }) => {
  const { loginDoctor, loading } = useAuth();

  const [sicilNo, setSicilNo] = useState("");
  const [sifre, setSifre] = useState("");

  const isValidSicil = (val) => /^\d{5,}$/.test(val.trim());
  const isStrongPassword = (val) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~]).{8,}$/.test(val);

  const isFormValid = useMemo(
    () => isValidSicil(sicilNo) && isStrongPassword(sifre),
    [sicilNo, sifre]
  );

  const handleLogin = async () => {
    if (!isFormValid) return;

    const result = await loginDoctor(sicilNo.trim(), sifre);

    if (!result?.ok) {
      Alert.alert("Hata", "Doktor girişi başarısız.");
      return;
    }

    // (opsiyonel) doktor objesini taşımaya devam edebilirsiniz
    const doctor = {
      registrationNumber: sicilNo.trim(),
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
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Image
        source={require("../../assets/medilogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Giriş Yap</Text>

      <View style={styles.box}>
        <TextInput
          placeholder="Sicil No"
          placeholderTextColor="#888"
          style={styles.input}
          value={sicilNo}
          onChangeText={(t) => setSicilNo(t.replace(/[^0-9]/g, ""))}
          keyboardType="number-pad"
        />

        <TextInput
          placeholder="Şifre"
          placeholderTextColor="#888"
          secureTextEntry
          style={styles.input}
          value={sifre}
          onChangeText={setSifre}
          autoCapitalize="none"
        />

        <TouchableOpacity onPress={() => navigation.navigate("kayitDr")} activeOpacity={0.7}>
          <Text style={styles.link}>Hesabın yok mu? Kaydol</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("sifremiUnuttum")} activeOpacity={0.7}>
          <Text style={styles.link}>Şifremi unuttum</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, (!isFormValid || loading) && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={!isFormValid || loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Giriş Yap</Text>
          )}
        </TouchableOpacity>
      </View>

      <NavigationFooter onBack={() => navigation.navigate("kullaniciSecim")} />
    </KeyboardAvoidingView>
  );
};

export default GirisDr;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1483C7", alignItems: "center" },
  logo: { width: 80, height: 80, marginTop: 60, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "600", color: "white", marginBottom: 20 },
  box: { marginTop: 10, width: "80%", backgroundColor: "white", borderRadius: 25, paddingVertical: 30, paddingHorizontal: 20, elevation: 6 },
  input: { width: "100%", backgroundColor: "#EAEAEA", borderRadius: 10, paddingHorizontal: 15, paddingVertical: 10, fontSize: 16, marginBottom: 10 },
  link: { color: "#1642BB", fontSize: 13, marginBottom: 10 },
  button: { backgroundColor: "#1642BB", paddingVertical: 12, borderRadius: 25, alignItems: "center" },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "white", fontSize: 17, fontWeight: "600" },
});
