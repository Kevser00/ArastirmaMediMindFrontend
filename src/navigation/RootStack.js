// KEVSER - RootStack

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Acilis from '../screens/acilis';
import KullaniciSecim from '../screens/kullaniciSecim';

// Giriş & Kayıt ekranları
import GirisHasta from '../screens/girisHasta';
import GirisDr from '../screens/girisDr';
import KayitHasta from '../screens/kayitHasta';
import KayitDr from '../screens/kayitDr';
import SifremiUnuttum from '../screens/sifremiUnuttum';


import HastaStack from './HastaStack';
import DoktorStack from './DoktorStack';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="acilis"
      screenOptions={{ headerShown: false }}
    >
      {/* Açılış ve kullanıcı seçimi */}
      <Stack.Screen name="acilis" component={Acilis} />
      <Stack.Screen name="kullaniciSecim" component={KullaniciSecim} />

      {/* HASTA akışı */}
      <Stack.Screen name="girisHasta" component={GirisHasta} />
      <Stack.Screen name="kayitHasta" component={KayitHasta} />

      {/* DOKTOR akışı */}
      <Stack.Screen name="girisDr" component={GirisDr} />
      <Stack.Screen name="kayitDr" component={KayitDr} />

      {/* Ortak */}
      <Stack.Screen name="sifremiUnuttum" component={SifremiUnuttum} />

      {/* Giriş yaptıktan sonrası için (tabs vb.) */}
      <Stack.Screen name="HastaStack" component={HastaStack} />
      <Stack.Screen name="DoktorStack" component={DoktorStack} />
    </Stack.Navigator>
  );
};

export default RootStack;
