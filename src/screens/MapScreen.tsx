// src/screens/MapScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text, ActivityIndicator, Platform } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Strings } from '../constants/strings';
import { getCurrentLocation } from '../utils/locationHelper';
import Card from '../components/common/Card';
import { Ocorrencia } from '../types/common';
import ContributionForm from '../components/form/ContributionForm';
import { getAuthToken } from '../utils/authHelper'; // Importa a função para pegar o token
import { API_BASE_URL } from '../constants/api'; // Importa a URL base da API

const MapView = Platform.OS === 'web' ? null : require('react-native-maps').default;
const Marker = Platform.OS === 'web' ? null : require('react-native-maps').Marker;
const Callout = Platform.OS === 'web' ? null : require('react-native-maps').Callout;

type LatLng = { latitude: number; longitude: number };

const MapScreen: React.FC = () => {
  const [region, setRegion] = useState({
    latitude: -8.3075,
    longitude: -34.9125,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [newMarkerCoord, setNewMarkerCoord] = useState<LatLng | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Ocorrencia | null>(null);
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Função para buscar ocorrências da API
  const fetchOcorrencias = async () => {
    setIsLoading(true);
    try {
      const token = await getAuthToken();
      if (!token) {
        Alert.alert(Strings.alerts.errorTitle, 'Usuário não autenticado. Por favor, faça login novamente.');
        // Em um app real, você pode redirecionar para a tela de login aqui
        return;
      }

      const response = await fetch(`${API_BASE_URL}/ocorrencias`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao buscar ocorrências.');
      }

      const data = await response.json();
      setOcorrencias(data);
    } catch (error) {
      console.error('Falha ao buscar ocorrências:', error);
      Alert.alert(Strings.alerts.errorTitle, `Não foi possível carregar as ocorrências: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const userLocation = await getCurrentLocation();
      if (userLocation) {
        setRegion({
          ...region,
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        });
      } else {
        Alert.alert(Strings.alerts.locationDenied, 'Não foi possível obter sua localização. O mapa será centrado em uma área padrão.');
      }
      fetchOcorrencias();
    };
    fetchInitialData();
  }, []);

  const handleAddButtonPress = () => {
    setNewMarkerCoord({ latitude: region.latitude, longitude: region.longitude });
    setModalVisible(true);
  };

  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setNewMarkerCoord({ latitude, longitude });
    setModalVisible(true);
  };

  const handleMarkerPress = (ocorrencia: Ocorrencia) => {
    setSelectedMarker(ocorrencia);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setNewMarkerCoord(null);
  };

  if (Platform.OS === 'web') {
    return (
      <View style={styles.webContainer}>
        <Text style={styles.webText}>O mapa não está disponível para visualização na web.</Text>
        <Text style={styles.webSubText}>Execute o projeto em um emulador ou dispositivo físico para ver o mapa.</Text>
        <Ionicons name="map" size={100} color={Colors.textSecondary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={setRegion}
        onPress={handleMapPress}
        showsUserLocation
        showsMyLocationButton
      >
        {ocorrencias.map((ocorrencia) => (
          <Marker
            key={ocorrencia.id}
            coordinate={{ latitude: ocorrencia.latitude, longitude: ocorrencia.longitude }}
            onPress={() => handleMarkerPress(ocorrencia)}
          >
            <Ionicons
              name="water"
              size={30}
              color={selectedMarker?.id === ocorrencia.id ? Colors.primaryDark : Colors.primary}
            />
            <Callout tooltip>
              <Card containerStyle={styles.cardCallout}>
                <View style={styles.cardHeader}>
                  <Ionicons name="fish" size={20} color={Colors.textPrimary} />
                  <Text style={styles.cardTitle}>{`ID: ${ocorrencia.bioindicadorId}`}</Text>
                </View>
                <Text style={styles.cardText}>{ocorrencia.observacoes}</Text>
              </Card>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddButtonPress}
        activeOpacity={0.7}
      >
        <Ionicons name="add" size={30} color={Colors.textLight} />
      </TouchableOpacity>
      
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Carregando ocorrências...</Text>
        </View>
      )}

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={handleModalClose}
        style={styles.modal}
        backdropTransitionOutTiming={0}
      >
        <View style={styles.modalContent}>
          <ContributionForm onClose={handleModalClose} />
          <TouchableOpacity onPress={handleModalClose} style={styles.closeButton}>
            <Ionicons name="close-circle" size={30} color={Colors.error} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background,
  },
  webText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 10,
  },
  webSubText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  addButton: {
    position: 'absolute',
    bottom: 90,
    right: 30,
    backgroundColor: Colors.primary,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: Colors.surface,
    padding: 22,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    minHeight: 400,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  cardCallout: {
    padding: 10,
    borderRadius: 8,
    maxWidth: 200,
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginLeft: 5,
  },
  cardText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.textPrimary,
  },
});

export default MapScreen;