import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HastaAnaSayfa from '../screens/hastaAnaSayfa';
import HastaBildirimSayfa from '../screens/hastaBildirimSayfa';
import MediAi from '../screens/mediAi';
import HastaBilgiSayfa from '../screens/hastaBilgiSayfa';

import CustomHastaTabBar from './CustomHastaTabBar';
import { useAuth } from '../context/AuthContext';

const Tab = createBottomTabNavigator();

const HastaTabs = () => {
  const { hasta } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { 
          backgroundColor: '#1483C7', 
          borderBottomLeftRadius: 24, 
          borderBottomRightRadius: 24 
        },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '700', fontSize: 20 },
        headerShadowVisible: false,
      }}
      tabBar={(props) => <CustomHastaTabBar {...props} />}
    >
      {/* Ana Sayfa */}
      <Tab.Screen
        name="hastaAnaSayfa"
        component={HastaAnaSayfa}
        options={{
          headerShown: true,
          headerTitle: () => (
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 18 }}>
              Merhaba {hasta?.ad} {hasta?.soyad}
            </Text>
          ),
        }}
      />

      {/* Bildirim Ekle */}
      <Tab.Screen
        name="hastaBildirimSayfa"
        component={HastaBildirimSayfa}
        options={{
          headerShown: true,
          headerTitle: 'İlaç Ekle',
        }}
      />

      {/* MediAI */}
      <Tab.Screen
        name="mediAi"
        component={MediAi}
        options={{
          headerShown: true,
          headerTitle: 'MediAI',
        }}
      />

      {/* Profil / Bilgi Sayfası */}
      <Tab.Screen
        name="hastaBilgiSayfa"
        component={HastaBilgiSayfa}
        options={{
          headerShown: true,
          headerTitle: 'Profil Bilgilerim',
        }}
      />
    </Tab.Navigator>
  );
};

export default HastaTabs;
