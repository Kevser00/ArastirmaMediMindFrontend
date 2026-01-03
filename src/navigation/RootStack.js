// navigation/RootStack.js
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator } from "react-native";

import Acilis from "../screens/acilis";
import KullaniciSecim from "../screens/kullaniciSecim";

import GirisHasta from "../screens/girisHasta";
import GirisDr from "../screens/girisDr";
import KayitHasta from "../screens/kayitHasta";
import KayitDr from "../screens/kayitDr";
import SifremiUnuttum from "../screens/sifremiUnuttum";

import HastaStack from "./HastaStack";
import DoktorStack from "./DoktorStack";

import { useAuth } from "../context/AuthContext";

const Stack = createNativeStackNavigator();

const BootScreen = () => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <ActivityIndicator size="large" />
  </View>
);

const RootStack = () => {
  const { hasta, doctor, booting } = useAuth();

  // booting bitince kullanıcı varsa direkt ilgili stack’e geç
  useEffect(() => {}, [hasta, doctor, booting]);

  if (booting) return <BootScreen />;

  return (
    <Stack.Navigator
      initialRouteName={hasta || doctor ? (doctor ? "DoktorStack" : "HastaStack") : "acilis"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="acilis" component={Acilis} />
      <Stack.Screen name="kullaniciSecim" component={KullaniciSecim} />

      <Stack.Screen name="girisHasta" component={GirisHasta} />
      <Stack.Screen name="kayitHasta" component={KayitHasta} />

      <Stack.Screen name="girisDr" component={GirisDr} />
      <Stack.Screen name="kayitDr" component={KayitDr} />

      <Stack.Screen name="sifremiUnuttum" component={SifremiUnuttum} />

      <Stack.Screen name="HastaStack" component={HastaStack} />
      <Stack.Screen name="DoktorStack" component={DoktorStack} />
    </Stack.Navigator>
  );
};

export default RootStack;
