
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import hastaAnaSayfa from '../screens/hastaAnaSayfa';
import hastaBildirimSayfa from '../screens/hastaBildirimSayfa';
import mediAi from '../screens/mediAi';
import hastaBilgiSayfa from '../screens/hastaBilgiSayfa';

const Tab = createBottomTabNavigator();

const HastaTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="hastaAnaSayfa" component={hastaAnaSayfa} />
      <Tab.Screen name="hastaBildirimSayfa" component={hastaBildirimSayfa} />
      <Tab.Screen name="mediAi" component={mediAi} />
      <Tab.Screen name="hastaBilgiSayfa" component={hastaBilgiSayfa} />
    </Tab.Navigator>
  );
};

export default HastaTabs;
