// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/navigation/RootStack';

import { AuthProvider } from './src/context/AuthContext';
import { HatirlatmaProvider } from './src/context/HatirlatmaContext';

export default function App() {
  return (
    <AuthProvider>
      <HatirlatmaProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </HatirlatmaProvider>
    </AuthProvider>
  );
}
