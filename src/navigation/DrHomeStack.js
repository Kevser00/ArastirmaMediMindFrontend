import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DrAnaSayfa from '../screens/drAnaSayfa';
import DrHastaGoruntule from '../screens/drHastaGoruntule';

const Stack = createNativeStackNavigator();

const DrHomeStack = ({ route }) => {
  const doctor = route?.params?.doctor;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="drAnaSayfa"
        component={DrAnaSayfa}
        initialParams={{ doctor }}
      />
      <Stack.Screen
        name="drHastaGoruntule"
        component={DrHastaGoruntule}
      />
    </Stack.Navigator>
  );
};

export default DrHomeStack;
