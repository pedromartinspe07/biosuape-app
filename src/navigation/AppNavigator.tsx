import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Strings } from '../constants/strings';
import { Colors } from '../constants/colors';
import { RootStackParamList, AppTabParamList } from '../types/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importe as telas
import SplashScreen from '../screens/SplashScreen';
import AuthScreen from '../screens/AuthScreen';
import MapScreen from '../screens/MapScreen';
import LibraryScreen from '../screens/LibraryScreen';
import ReportsScreen from '../screens/ReportsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<AppTabParamList>();
const LibraryStack = createNativeStackNavigator();

// Navegador de pilha para a tela de Biblioteca
const LibraryStackNavigator = () => {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen
        name={Strings.navigation.library}
        component={LibraryScreen}
        options={{ headerShown: false }}
      />
      {/* Adicione outras telas aqui se necessário */}
    </LibraryStack.Navigator>
  );
};

// Navegador de abas principal
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === Strings.navigation.map) {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === Strings.navigation.library) {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === Strings.navigation.reports) {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else { // O caso padrão para a rota de perfil
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name={Strings.navigation.map} component={MapScreen} />
      <Tab.Screen name={Strings.navigation.library} component={LibraryStackNavigator} />
      <Tab.Screen name={Strings.navigation.reports} component={ReportsScreen} />
      <Tab.Screen name={Strings.navigation.profile} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="AppStack" component={MainTabs} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
