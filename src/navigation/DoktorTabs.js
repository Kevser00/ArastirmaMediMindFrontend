import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DrIlacEkle from '../screens/drIlacEkle';
import MediAi from '../screens/mediAi';
import DrBilgiSayfa from '../screens/drBilgiSayfa';

import CustomDoctorTabBar from './CustomDoctorTabBar';
import DrHomeStack from './DrHomeStack';

const Tab = createBottomTabNavigator();

const DoktorTabs = ({ route }) => {
  const doctor = route?.params?.doctor;

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomDoctorTabBar {...props} />}
    >
      <Tab.Screen
        name="DrHome"
        component={DrHomeStack}
        initialParams={{ doctor }}
      />

      <Tab.Screen name="drIlacEkle" component={DrIlacEkle} />
      <Tab.Screen name="mediAi" component={MediAi} />
      <Tab.Screen name="drBilgiSayfa" component={DrBilgiSayfa} />
    </Tab.Navigator>
  );
};

export default DoktorTabs;
