// src/screens/ProfileScreen.tsx

import { Ionicons } from '@expo/vector-icons';
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
import { IOcorrencia, IUsuario } from '../types/common';
import { formatDate } from '../utils/dataFormatter';

// --- SIMULAÇÃO DE DADOS (Substitua por sua API quando for o momento) ---
const mockUser: IUsuario = {
  id: 'user-123',
  nome: 'João da Silva',
  email: 'joao.silva@exemplo.com',
  dataRegistro: '2025-09-04T10:30:00Z',
};

const mockOcorrencias: IOcorrencia[] = [
  {
    id: 'occ-001',
    usuarioId: 'user-123',
    bioindicadorId: '1',
    latitude: -8.0578,
    longitude: -34.8828,
    dataHora: new Date('2025-08-20T14:00:00Z').toISOString(),
    observacoes: 'Encontrado na praia de Boa Viagem, com muitas algas.',
    createdAt: new Date('2025-08-20T14:05:00Z').toISOString(),
    updatedAt: new Date('2025-08-20T14:05:00Z').toISOString(),
  },
  {
    id: 'occ-002',
    usuarioId: 'user-123',
    bioindicadorId: '2',
    latitude: -8.065,
    longitude: -34.872,
    dataHora: new Date('2025-08-20T14:00:00Z').toISOString(),
    observacoes: 'Visto perto do recife de corais.',
    createdAt: new Date('2025-08-20T14:05:00Z').toISOString(),
    updatedAt: new Date('2025-08-20T14:05:00Z').toISOString(),
  },
];

const fetchUserData = async (): Promise<{
  user: IUsuario;
  ocorrencias: IOcorrencia[];
}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ user: mockUser, ocorrencias: mockOcorrencias });
    }, 1500); // Simula o tempo de carregamento de uma API
  });
};

// --- COMPONENTE DE ITEM DE OCORRÊNCIA ---
const OcorrenciaItem: React.FC<{ item: IOcorrencia }> = ({ item }) => (
  <Card containerStyle={styles.contributionCard}>
    <View style={styles.cardHeader}>
      <Ionicons name="location-outline" size={20} color={Colors.primary} />
      <Text style={styles.contributionTitle}>
        Ocorrência em {formatDate(item.dataHora.toString())}
      </Text>
    </View>
    <Text style={styles.contributionText}>
      {`Bioindicador ID: ${item.bioindicadorId}`}
    </Text>
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
        // Usa a função de simulação de dados
        const { user: fetchedUser, ocorrencias: fetchedOcorrencias } =
          await fetchUserData();
        setUser(fetchedUser);
        setOcorrencias(fetchedOcorrencias);
      } catch (error) {
        setIsError(true);
        console.error('Falha ao carregar dados do usuário:', error);
      } finally {
        setIsLoading(false);
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
  listHeaderContainer: {},
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