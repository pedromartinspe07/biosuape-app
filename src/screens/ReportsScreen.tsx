import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReportsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Tela de Relatórios</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReportsScreen;