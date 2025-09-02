import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Strings } from '../constants/strings';
import { Colors } from '../constants/colors';

// Importe as telas
import MapScreen from '../screens/MapScreen';
import LibraryScreen from '../screens/LibraryScreen';
import ReportsScreen from '../screens/ReportsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: 'map' | 'book' | 'bar-chart' | 'person';

          if (route.name === Strings.navigation.map) {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === Strings.navigation.library) {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === Strings.navigation.reports) {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === Strings.navigation.profile) {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          height: 60, // Aumenta a altura da barra para melhor UX
        },
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 5,
        },
      })}
    >
      <Tab.Screen name={Strings.navigation.map} component={MapScreen} options={{ headerShown: false }} />
      <Tab.Screen name={Strings.navigation.library} component={LibraryScreen} options={{ headerShown: false }} />
      <Tab.Screen name={Strings.navigation.reports} component={ReportsScreen} options={{ headerShown: false }} />
      <Tab.Screen name={Strings.navigation.profile} component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
