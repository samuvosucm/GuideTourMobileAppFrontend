import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import SignInScreen from '../screens/Authentication/SignInScreen';
import SignUpScreen from '../screens/Authentication/SignUpScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignInScreen">
        <Stack.Screen 
          name="SignInScreen" 
          component={SignInScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="SignUpScreen" 
          component={SignUpScreen} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
