// KEVSER - HastaStack

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GirisHasta from '../screens/girisHasta';
import KayitHasta from '../screens/kayitHasta';
import SifremiUnuttum from '../screens/sifremiUnuttum';
import HastaTabs from './HastaTabs';

const Stack = createNativeStackNavigator();

const HastaStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="girisHasta" component={GirisHasta} />
      <Stack.Screen name="kayitHasta" component={KayitHasta} />
      <Stack.Screen name="sifremiUnuttum" component={SifremiUnuttum} />
      <Stack.Screen name="HastaTabs" component={HastaTabs} />
    </Stack.Navigator>
  );
};

export default HastaStack;