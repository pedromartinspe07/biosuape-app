import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Strings } from '../constants/strings';
import { Bioindicador } from '../types/common';
import Card from '../components/common/Card';

const mockBioindicadores: Bioindicador[] = [
  {
    id: '1',
    nomePopular: 'Alga Marrom',
    nomeCientifico: 'Sargassum sp.',
    descricao: 'Alga comum em áreas costeiras. Sua grande presença pode indicar desequilíbrio nutricional.',
    funcaoBioindicadora: 'Indicador de eutrofização (excesso de nutrientes).',
    imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Alga',
  },
  {
    id: '2',
    nomePopular: 'Peixe-agulha',
    nomeCientifico: 'Strongylura marina',
    descricao: 'Peixe que vive em águas rasas. Sua saúde é um bom indicativo da qualidade da água.',
    funcaoBioindicadora: 'Indicador da saúde geral do ecossistema.',
    imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Peixe-agulha',
  },
  {
    id: '3',
    nomePopular: 'Ostras',
    nomeCientifico: 'Crassostrea gigas',
    descricao: 'Moluscos filtradores. Acumulam poluentes e são sensíveis a variações na qualidade da água.',
    funcaoBioindicadora: 'Indicador de poluição por metais pesados e toxinas.',
    imageUrl: 'https://via.placeholder.com/150/FFFF00/000000?text=Ostras',
  },
];

const LibraryScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  
  const filteredBioindicadores = mockBioindicadores.filter((item) =>
    item.nomePopular.toLowerCase().includes(searchText.toLowerCase()) ||
    item.nomeCientifico.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }: { item: Bioindicador }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        // Lógica de navegação para a tela de detalhes do bioindicador
        console.log('Navegar para detalhes:', item.nomePopular);
      }}
    >
      <Card>
        <Text style={styles.itemTitle}>{item.nomePopular}</Text>
        <Text style={styles.itemSubtitle}>{item.nomeCientifico}</Text>
      </Card>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{Strings.libraryScreen.title}</Text>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={Colors.textSecondary} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder={Strings.libraryScreen.searchPlaceholder}
              placeholderTextColor={Colors.textSecondary}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>
        <FlatList
          data={filteredBioindicadores}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerContainer: {
    backgroundColor: Colors.surface,
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 15,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  listContainer: {
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  itemSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});

export default LibraryScreen;