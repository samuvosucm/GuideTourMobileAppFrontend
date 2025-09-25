import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../contexts/AuthContext';

// Screens
import SignInScreen from '../screens/authentication/SignInScreen';
import SignUpScreen from '../screens/authentication/SignUpScreen';
import ForgotPasswordScreen from '../screens/authentication/ForgotPasswordScreen';
import TouristNavigator from '../screens/tourist/TouristNavigator';
import TourDetailScreen from '../screens/tourist/TourDetailScreen';
import GuideTestScreen from '../screens/guide/TestScreen';
import TourViewPointScreen from '../screens/tourist/TourViewPointScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // Show nothing or a loading screen while checking auth state
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // User is logged in
          user.role === 'guide' ? (
            <>
              <Stack.Screen 
                name="GuideTestScreen" 
                component={GuideTestScreen} 
                options={{ headerShown: false }} 
              />
            </>
          ) : (
            <>
              <Stack.Screen 
                name="TouristScreen" 
                component={TouristNavigator} 
                options={{ headerShown: false }} 
              />
            </>
          )
        ) : (
          // User not logged in
          <>
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
          </>
        )}

        {/* Screens accessible to both roles once logged in */}
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

