import React from 'react';
import AppNavigator from './src/navigation/AppNavigator'
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { AuthProvider } from './src/contexts/AuthContext'

import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}