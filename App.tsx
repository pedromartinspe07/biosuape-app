// src/App.tsx

import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

// Importações do projeto
import { Colors } from './src/constants/colors';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  // Carrega as fontes personalizadas
  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('./src/assets/fonts/scifi2k2.ttf'),
    'Inter-Regular': require('/.src/assets/fonts/scifi2ki.ttf'),
    // Adicione outras fontes do projeto aqui, se necessário.
  });

  // Exibe uma tela de carregamento enquanto as fontes são carregadas.
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  // Renderiza a navegação principal do aplicativo.
  // Os Providers devem envolver o NavigationContainer para que os estados fiquem disponíveis em todas as telas.
  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor={Colors.background} />
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
});