// App.js
import 'react-native-gesture-handler'; // <-- importa esto lo primero
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // <-- añade esto
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppNavigator />
    </GestureHandlerRootView>
  );
}
