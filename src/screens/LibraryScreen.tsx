// src/screens/LibraryScreen.tsx

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Card from '../components/common/Card';
import { Colors } from '../constants/colors';
import { Strings } from '../constants/strings';
import { IBioindicador } from '../types/common';
import { LibraryStackParamList } from '../types/navigation';

// Mock de dados para simular uma API. Substitua pela chamada da sua API.
const mockBioindicadores: IBioindicador[] = [
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

type LibraryScreenNavigationProp = StackNavigationProp<LibraryStackParamList, 'Library'>;

const BioindicadorItem: React.FC<{ item: IBioindicador; onPress: () => void }> = ({ item, onPress }) => (
  <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
    <Card containerStyle={styles.itemCard}>
      <Text style={styles.itemTitle}>{item.nomePopular}</Text>
      <Text style={styles.itemSubtitle}>{item.nomeCientifico}</Text>
    </Card>
  </TouchableOpacity>
);

const LibraryScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [bioindicadores, setBioindicadores] = useState<IBioindicador[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<LibraryScreenNavigationProp>();

  // UseEffect para simular a busca de dados da API
  useEffect(() => {
    const fetchBioindicadores = async () => {
      // Simulação de delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBioindicadores(mockBioindicadores);
      setIsLoading(false);
    };

    fetchBioindicadores();
  }, []);

  const filteredBioindicadores = bioindicadores.filter((item) =>
    item.nomePopular.toLowerCase().includes(searchText.toLowerCase()) ||
    item.nomeCientifico.toLowerCase().includes(searchText.toLowerCase())
  );

  const handlePressItem = (item: IBioindicador) => {
    // A tela de destino precisa estar definida no seu LibraryStack.
    // Ex: navigation.navigate('BioindicadorDetails', { bioindicador: item });
    console.log('Navegar para detalhes:', item.nomePopular);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Carregando Bioindicadores...</Text>
      </View>
    );
  }

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="alert-circle-outline" size={50} color={Colors.textSecondary} />
      <Text style={styles.emptyText}>Nenhum bioindicador encontrado.</Text>
    </View>
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
          renderItem={({ item }) => (
            <BioindicadorItem item={item} onPress={() => handlePressItem(item)} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={ListEmptyComponent}
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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: Colors.textSecondary,
    fontSize: 16,
  },
  listContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  itemCard: {
    padding: 16,
    marginBottom: 8,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 50,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

export default LibraryScreen;