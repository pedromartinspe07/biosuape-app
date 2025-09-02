import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// Você vai importar o MapView aqui após a instalação da biblioteca react-native-maps
// import MapView from 'react-native-maps';

const MapScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Aqui você vai adicionar o componente MapView */}
      <Text style={styles.text}>Tela do Mapa</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default MapScreen;