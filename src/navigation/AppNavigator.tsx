// src/navigation/AppNavigator.tsx

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Colors } from '../constants/colors';
import { Strings } from '../constants/strings';
import { AppTabParamList, LibraryStackParamList, RootStackParamList } from '../types/navigation';

// Importe as telas
import AuthScreen from '../screens/AuthScreen';
import LibraryScreen from '../screens/LibraryScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ReportsScreen from '../screens/ReportsScreen';
import SplashScreen from '../screens/SplashScreen';

// Criação dos navegadores
const RootStack = createNativeStackNavigator<RootStackParamList>();
const AppTabs = createBottomTabNavigator<AppTabParamList>();
const LibraryStack = createNativeStackNavigator<LibraryStackParamList>();

/**
 * Navegador de pilha para as telas da seção de Biblioteca.
 * Isso permite a navegação entre a tela principal da biblioteca e outras telas relacionadas (ex: detalhes).
 */
const LibraryStackNavigator = () => {
  return (
    <LibraryStack.Navigator screenOptions={{ headerShown: false }}>
      <LibraryStack.Screen
        name="Library" // Nome único para a tela principal da biblioteca
        component={LibraryScreen}
      />
      {/* Exemplo de como adicionar uma tela de detalhes: */}
      {/* <LibraryStack.Screen 
        name="LibraryDetails" 
        component={LibraryDetailsScreen}
      /> */}
    </LibraryStack.Navigator>
  );
};

/**
 * Navegador de abas para as principais telas da aplicação.
 * Exibe ícones na barra inferior para alternar entre as funcionalidades.
 */
const MainTabs = () => {
  return (
    <AppTabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case Strings.navigation.map:
              iconName = focused ? 'map' : 'map-outline';
              break;
            case Strings.navigation.library:
              iconName = focused ? 'book' : 'book-outline';
              break;
            case Strings.navigation.reports:
              iconName = focused ? 'bar-chart' : 'bar-chart-outline';
              break;
            case Strings.navigation.profile:
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'ellipse-outline'; // Ícone padrão para evitar erros
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
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
      <AppTabs.Screen name={Strings.navigation.map} component={MapScreen} />
      <AppTabs.Screen name={Strings.navigation.library} component={LibraryStackNavigator} />
      <AppTabs.Screen name={Strings.navigation.reports} component={ReportsScreen} />
      <AppTabs.Screen name={Strings.navigation.profile} component={ProfileScreen} />
    </AppTabs.Navigator>
  );
};

/**
 * Navegador de pilha principal que gerencia o fluxo de autenticação e navegação da aplicação.
 * A tela 'AppStack' é o navegador de abas que só é acessado após a autenticação.
 */
const AppNavigator: React.FC = () => {
  return (
    <RootStack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Screen name="Splash" component={SplashScreen} />
      <RootStack.Screen name="Auth" component={AuthScreen} />
      <RootStack.Screen name="AppStack" component={MainTabs} />
    </RootStack.Navigator>
  );
};

export default AppNavigator;