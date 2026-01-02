import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GirisHasta from '../screens/girisHasta';
import KayitHasta from '../screens/kayitHasta';
import SifremiUnuttum from '../screens/sifremiUnuttum';
import HastaTabs from './HastaTabs';

const Stack = createNativeStackNavigator();

const HastaStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1483C7' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '700', fontSize: 20 },
      }}
    >
      <Stack.Screen
        name="girisHasta"
        component={GirisHasta}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="kayitHasta"
        component={KayitHasta}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="sifremiUnuttum"
        component={SifremiUnuttum}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HastaTabs"
        component={HastaTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HastaStack;
