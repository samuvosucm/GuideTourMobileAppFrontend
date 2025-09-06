import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Screens
import TouristHomeScreen from "./TouristHomeScreen";
import TouristProfileScreen from "./TouristProfileScreen";
import TouristToursScreen from "./TouristToursScreen";


const Tab = createBottomTabNavigator();

export default function TouristNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Profile") {
            iconName = "person-outline";
          } else if (route.name === "My Tours") {
            iconName = "grid-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: "#b05454",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name ="Home" component={TouristToursScreen}/>
      <Tab.Screen name="My Tours" component={TouristHomeScreen} />
      <Tab.Screen name="Profile" component={TouristProfileScreen} />
    </Tab.Navigator>
  );
}
