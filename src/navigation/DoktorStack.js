import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GirisDr from '../screens/girisDr';
import KayitDr from '../screens/kayitDr';
import SifremiUnuttum from '../screens/sifremiUnuttum';
import DoktorTabs from './DoktorTabs';

const Stack = createNativeStackNavigator();

const DoktorStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="girisDr" component={GirisDr} />
      <Stack.Screen name="kayitDr" component={KayitDr} />
      <Stack.Screen name="sifremiUnuttum" component={SifremiUnuttum} />

      {}
      <Stack.Screen name="DoktorTabs" component={DoktorTabs} />
    </Stack.Navigator>
  );
};

export default DoktorStack;
