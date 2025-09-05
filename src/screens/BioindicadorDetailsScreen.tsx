// src/screens/BioindicadorDetailsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { LibraryStackParamList } from '../types/navigation';
import { Colors } from '../constants/colors';
import { Strings } from '../constants/strings'; // Para títulos, etc.

type BioindicadorDetailsScreenRouteProp = RouteProp<LibraryStackParamList, 'BioindicadorDetalhe'>;

const BioindicadorDetailsScreen: React.FC = () => {
  const route = useRoute<BioindicadorDetailsScreenRouteProp>();
  const { bioindicador } = route.params;

  // Adicionar um cabeçalho à tela (pode ser feito no AppNavigator ou aqui)
  // navigation.setOptions({ title: bioindicador.nomePopular });

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: bioindicador.imageUrl || 'https://via.placeholder.com/300/CCCCCC/FFFFFF?text=Sem+Imagem' }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{bioindicador.nomePopular}</Text>
        <Text style={styles.subtitle}>{bioindicador.nomeCientifico}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{Strings.bioindicadorDetails.descriptionTitle}</Text>
          <Text style={styles.text}>{bioindicador.descricao}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{Strings.bioindicadorDetails.functionTitle}</Text>
          <Text style={styles.text}>{bioindicador.funcaoBioindicadora}</Text>
        </View>

        {/* Adicionar mais informações se necessário */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
});

export default BioindicadorDetailsScreen;