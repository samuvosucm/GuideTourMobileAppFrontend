import React, { useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../contexts/AuthContext';

// Screens
import SignInScreen from '../screens/authentication/SignInScreen';
import SignUpScreen from '../screens/authentication/SignUpScreen';
import ForgotPasswordScreen from '../screens/authentication/ForgotPasswordScreen';
import TouristNavigator from '../screens/tourist/TouristNavigator';
import TourDetailScreen from '../screens/common/TourDetailScreen';
import TourViewPointScreen from '../screens/tourist/TourViewPointScreen';
import GuideNavigator from '../screens/guide/GuideNavigator';
import CreateTourScreen from '../screens/guide/CreateTourScreen';
import AddLocationScreen from '../screens/guide/AddLocationScreen';
import MapPickerScreen from '../screens/guide/MapPickerScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#b05454" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          user.role === 'guide' ? (
            <>
              <Stack.Screen name="GuideScreen" component={GuideNavigator} options={{ headerShown: false }} />
              <Stack.Screen name="CreateTourScreen" component={CreateTourScreen} options={{ title: 'Create Tour' }} /> 
              <Stack.Screen name="AddLocationScreen" component={AddLocationScreen} options={{ title: 'Add Location' }} /> 
              <Stack.Screen name="MapPickerScreen" component={MapPickerScreen} options={{ title: 'Map Picker' }} /> 
            </>
          ) : (
            <>
              <Stack.Screen name="TouristScreen" component={TouristNavigator} options={{ headerShown: false }} />
            </>
          )
        ) : (
          <>
            <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }} />
          </>
        )}

        {/* Screens accessible to both roles */}
        <Stack.Screen name="TourDetailScreen" component={TourDetailScreen} options={{ title: 'Tour Detail' }} />
        <Stack.Screen name="TourViewPointScreen" component={TourViewPointScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
