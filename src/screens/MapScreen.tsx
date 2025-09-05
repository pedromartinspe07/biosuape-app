// src/screens/MapScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import Button from '../components/common/Button'; // << NOVA IMPORTAÇÃO
import ContributionForm from '../components/form/ContributionForm';
import { Colors } from '../constants/colors';
import { Strings } from '../constants/strings';
import api from '../services/apiService'; // Importe a instância do Axios
import { IOcorrencia } from '../types/common';
import { formatDate } from '../utils/dataFormatter';
import { Coords, getCurrentLocation } from '../utils/locationHelper';

const MapView = Platform.OS === 'web' ? null : require('react-native-maps').default;
const Marker = Platform.OS === 'web' ? null : require('react-native-maps').Marker;
const Callout = Platform.OS === 'web' ? null : require('react-native-maps').Callout;

const initialRegion = {
  latitude: -8.3075,
  longitude: -34.9125,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const MapScreen: React.FC = () => {
  const [region, setRegion] = useState(initialRegion);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Coords | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ocorrencias, setOcorrencias] = useState<IOcorrencia[]>([]);

  // UseEffect para carregar as ocorrências quando a tela é montada.
  useEffect(() => {
    fetchOcorrencias();
  }, []);

  const fetchOcorrencias = async () => {
    setIsLoading(true);
    try {
      // Usa a instância do Axios. O interceptor em `apiService.ts` já adiciona o token.
      const response = await api.get<IOcorrencia[]>('/ocorrencias');
      if (Array.isArray(response.data)) {
        setOcorrencias(response.data);
      } else {
        console.error('API retornou um formato inválido:', response.data);
        setOcorrencias([]);
      }
    } catch (error) {
      console.error('Erro ao buscar ocorrências:', error);
      Alert.alert(Strings.alerts.errorTitle, 'Não foi possível carregar as ocorrências. Sua sessão pode ter expirado ou há um problema de conexão.');
    } finally {
      setIsLoading(false);
    }
  };

  const getLocationAndOpenForm = async () => {
    setIsLoading(true);
    try {
      const location = await getCurrentLocation();
      setCurrentLocation(location);
      setRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
      setModalVisible(true);
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      Alert.alert(Strings.alerts.errorTitle, 'Não foi possível obter sua localização. Verifique as permissões do seu dispositivo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    // Recarrega as ocorrências após o fechamento do modal para ver a nova contribuição
    fetchOcorrencias();
  };

  if (MapView === null) {
    return <Text>O componente de mapa não está disponível na web.</Text>;
  }

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}

      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        followsUserLocation={true}
        onRegionChangeComplete={setRegion}
      >
        {ocorrencias.map((ocorrencia) => (
          <Marker
            key={ocorrencia.id}
            coordinate={{ latitude: ocorrencia.latitude, longitude: ocorrencia.longitude }}
            title={ocorrencia.bioindicadorId}
          >
            <Callout tooltip>
              <View style={styles.cardCallout}>
                <Text style={styles.cardTitle}>{ocorrencia.bioindicadorId}</Text>
                <Text style={styles.cardText}>Data: {formatDate(ocorrencia.dataHora, 'dd/MM/yyyy HH:mm')}</Text>
                <Text style={styles.cardText}>pH: {ocorrencia.ph || 'N/A'}</Text>
                <Text style={styles.cardText}>Temperatura: {ocorrencia.temperaturaAgua || 'N/A'}°C</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <Button style={styles.addButton} onPress={getLocationAndOpenForm}>
        <Ionicons name="add" size={30} color={Colors.textLight} />
      </Button>

      {currentLocation && (
        <Modal
          isVisible={modalVisible}
          style={styles.modal}
          onBackdropPress={handleCloseModal}
          onBackButtonPress={handleCloseModal}
        >
          <View style={styles.modalContent}>
            <Button style={styles.closeButton} onPress={handleCloseModal}>
              <Ionicons name="close-circle" size={30} color={Colors.primary} />
            </Button>
            <ContributionForm
              initialCoordinates={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }}
              onClose={handleCloseModal}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
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
    zIndex: 1,
  },
  cardCallout: {
    padding: 10,
    borderRadius: 8,
    maxWidth: 200,
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    marginBottom: 2,
  },
});

export default MapScreen;