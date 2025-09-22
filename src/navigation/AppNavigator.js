import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import SignInScreen from '../screens/authentication/SignInScreen';
import SignUpScreen from '../screens/authentication/SignUpScreen';
import ForgotPasswordScreen from '../screens/authentication/ForgotPasswordScreen';
import TouristNavigator from '../screens/tourist/TouristNavigator';
import TourDetailScreen from '../screens/tourist/TourDetailScreen';
import TourViewPointScreen from '../screens/tourist/TourViewPointScreen';
import { getToken } from '../services/dataService';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      setInitialRoute(token ? 'TouristScreen' : 'SignInScreen');
    };
    checkToken();
  }, []);

  if (!initialRoute) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
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
        <Stack.Screen 
          name="TourViewPointScreen" 
          component={TourViewPointScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
