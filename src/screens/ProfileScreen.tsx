import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Strings } from '../constants/strings';
import Card from '../components/common/Card';
import { Ocorrencia } from '../types/common';
import { formatDate } from '../utils/dataFormatter';

// Dados de usuário e ocorrências mockados
const mockUser = {
  name: 'Pedro Henrique',
  email: 'pedro.h@example.com',
  memberSince: '2025-09-02T16:00:00Z',
};

const mockOcorrencias: Ocorrencia[] = [
  {
    id: '1',
    usuarioId: 'user1',
    bioindicadorId: '1',
    latitude: -8.3123,
    longitude: -34.9012,
    dataHora: '2025-09-01T10:30:00Z',
    observacoes: 'Grande quantidade de peixes-agulha, a água parece clara.',
    imageUrl: 'https://via.placeholder.com/150',
    createdAt: '2025-09-01T10:30:00Z',
    updatedAt: '2025-09-01T10:30:00Z',
  },
  {
    id: '2',
    usuarioId: 'user1',
    bioindicadorId: '2',
    latitude: -8.32,
    longitude: -34.905,
    dataHora: '2025-08-25T14:45:00Z',
    observacoes: 'Presença de algas vermelhas em áreas rasas, indicando possível poluição.',
    imageUrl: 'https://via.placeholder.com/150',
    createdAt: '2025-09-01T10:30:00Z',
    updatedAt: '2025-09-01T10:30:00Z',
  },
];

const ProfileScreen: React.FC = () => {
  const renderOcorrenciaItem = ({ item }: { item: Ocorrencia }) => (
    <Card containerStyle={styles.contributionCard}>
      <View style={styles.cardHeader}>
        <Ionicons name="location-outline" size={20} color={Colors.primary} />
        <Text style={styles.contributionTitle}>Ocorrência em {formatDate(item.dataHora)}</Text>
      </View>
      <Text style={styles.contributionText}>{`Bioindicador ID: ${item.bioindicadorId}`}</Text>
      <Text style={styles.contributionText}>{`Obs: ${item.observacoes}`}</Text>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Seção do Perfil */}
      <View style={styles.profileSection}>
        <View style={styles.profileIconContainer}>
          <Ionicons name="person-circle-outline" size={100} color={Colors.textSecondary} />
        </View>
        <Text style={styles.userName}>{mockUser.name}</Text>
        <Text style={styles.userEmail}>{mockUser.email}</Text>
        <Text style={styles.memberSince}>
          Membro desde: {formatDate(mockUser.memberSince)}
        </Text>
      </View>

      {/* Seção de Contribuições */}
      <View style={styles.contributionsSection}>
        <Text style={styles.sectionTitle}>Minhas Contribuições Recentes</Text>
        {mockOcorrencias.length > 0 ? (
          <FlatList
            data={mockOcorrencias}
            renderItem={renderOcorrenciaItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false} // Desabilita o scroll da FlatList dentro da ScrollView
          />
        ) : (
          <Text style={styles.noContributionsText}>Você ainda não tem contribuições.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  contributionCard: {
    marginBottom: 12,
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
  noContributionsText: {
    textAlign: 'center',
    color: Colors.textSecondary,
    marginTop: 20,
    fontStyle: 'italic',
  },
});

export default ProfileScreen;