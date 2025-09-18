import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import SignInScreen from '../screens/authentication/SignInScreen';
import SignUpScreen from '../screens/authentication/SignUpScreen';
import ForgotPasswordScreen from '../screens/authentication/ForgotPasswordScreen';
import TouristNavigator from '../screens/tourist/TouristNavigator';
import TourDetailScreen from '../screens/tourist/TourDetailScreen';

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
        <Stack.Screen 
          name="ForgotPasswordScreen" 
          component={ForgotPasswordScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="TouristScreen" 
          component={TouristNavigator} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="TourDetailScreen" 
          component={TourDetailScreen} 
          options={{ title: 'Tour Detail' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
