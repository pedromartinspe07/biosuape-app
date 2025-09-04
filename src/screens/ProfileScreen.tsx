// src/screens/ProfileScreen.tsx

import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Card from '../components/common/Card';
import { Colors } from '../constants/colors';
import { profileService } from '../services/apiService';
import { IOcorrencia, IUsuario } from '../types/common';
import { formatDate } from '../utils/dataFormatter';

// --- COMPONENTE DE ITEM DE OCORRÊNCIA ---
const OcorrenciaItem: React.FC<{ item: IOcorrencia }> = ({ item }) => (
  <Card containerStyle={styles.contributionCard}>
    <View style={styles.cardHeader}>
      <Ionicons name="location-outline" size={20} color={Colors.primary} />
      <Text style={styles.contributionTitle}>
            Ocorrência em {formatDate(item.dataHora)}
      </Text>
    </View>
    <Text style={styles.contributionText}>{`Bioindicador ID: ${item.bioindicadorId}`}</Text>
    {item.observacoes && (
      <Text style={styles.contributionText}>{`Obs: ${item.observacoes}`}</Text>
    )}
  </Card>
);

// --- COMPONENTE DE TELA DE PERFIL ---
const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState<IUsuario | null>(null);
  const [ocorrencias, setOcorrencias] = useState<IOcorrencia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // 1. Busca os dados do usuário armazenados localmente
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        // 2. Faz a chamada real à sua API para buscar as ocorrências do usuário
        const response = await profileService.getProfileData();
        setOcorrencias(response.data); // Acessa o array 'data' da resposta
      } catch (error) {
        setIsError(true);
        console.error('Falha ao carregar dados do usuário:', error);
      } finally {
        setIsLoading(false); // Garante que o estado de carregamento seja desativado
      }
    };
    loadUserData();
  }, []);

  const renderHeader = () => (
    <View style={styles.listHeaderContainer}>
      <View style={styles.profileSection}>
        <View style={styles.profileIconContainer}>
          <Ionicons
            name="person-circle-outline"
            size={100}
            color={Colors.textSecondary}
          />
        </View>
        <Text style={styles.userName}>{user?.nome || 'Carregando...'}</Text>
        <Text style={styles.userEmail}>{user?.email || ''}</Text>
        {user?.dataRegistro && (
          <Text style={styles.memberSince}>
            Membro desde: {formatDate(user.dataRegistro)}
          </Text>
        )}
      </View>
      <View style={styles.contributionsSection}>
        <Text style={styles.sectionTitle}>Minhas Contribuições Recentes</Text>
      </View>
    </View>
  );

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons
        name="documents-outline"
        size={50}
        color={Colors.textSecondary}
      />
      <Text style={styles.noContributionsText}>
        Você ainda não tem contribuições.
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Carregando perfil...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.loadingContainer}>
        <Ionicons name="warning-outline" size={50} color={Colors.error} />
        <Text style={styles.errorText}>
          Erro ao carregar o perfil. Tente novamente.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={ocorrencias}
      renderItem={({ item }) => <OcorrenciaItem item={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={styles.listContentContainer}
    />
  );
};

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
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.textSecondary,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.error,
    textAlign: 'center',
  },
  listContentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  listHeaderContainer: {
    // Estilos para o cabeçalho da FlatList, se necessário
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: 10,
  },
  profileIconContainer: {
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  userEmail: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 5,
  },
  memberSince: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  contributionsSection: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  contributionCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  contributionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginLeft: 8,
  },
  contributionText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 50,
  },
  noContributionsText: {
    textAlign: 'center',
    color: Colors.textSecondary,
    marginTop: 10,
    fontStyle: 'italic',
  },
});

export default ProfileScreen;