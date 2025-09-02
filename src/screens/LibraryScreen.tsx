import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
// Você pode criar um tipo para a espécie
// import { Especie } from '../types/common';

const LibraryScreen: React.FC = () => {
  // Dados mockados para a demonstração
  const bioindicadores = [
    { id: '1', nome: 'Alga Marrom', nomeCientifico: 'Sargassum sp.' },
    { id: '2', nome: 'Peixe-agulha', nomeCientifico: 'Strongylura marina' },
  ];

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{item.nome}</Text>
      <Text style={styles.itemSubtitle}>{item.nomeCientifico}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Biblioteca de Bioindicadores</Text>
      <FlatList
        data={bioindicadores}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#666',
  },
});

export default LibraryScreen;