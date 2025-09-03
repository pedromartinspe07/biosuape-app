import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Strings } from '../constants/strings';
import Card from '../components/common/Card';
import { Ocorrencia } from '../types/common';
import { formatDate } from '../utils/dataFormatter';

// Agora os dados viriam de um estado, de um contexto ou de uma API.
// Aqui, eles estão vazios para mostrar o estado inicial sem dados.
const user = {
  name: 'Carregando...',
  email: '',
  memberSince: '',
};

const ocorrencias: Ocorrencia[] = [];

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
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <Text style={styles.memberSince}>
          Membro desde: {formatDate(user.memberSince)}
        </Text>
      </View>

      {/* Seção de Contribuições */}
      <View style={styles.contributionsSection}>
        <Text style={styles.sectionTitle}>Minhas Contribuições Recentes</Text>
        {ocorrencias.length > 0 ? (
          <FlatList
            data={ocorrencias}
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