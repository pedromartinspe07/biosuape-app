// src/screens/MapScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import ContributionForm from '../components/form/ContributionForm';
import { API_BASE_URL } from '../constants/api';
import { Colors } from '../constants/colors';
import { Strings } from '../constants/strings';
import { IOcorrencia } from '../types/common';
import { getAuthToken } from '../utils/authHelper';
import { getCurrentLocation } from '../utils/locationHelper';

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
  const [modalVisible, setModalVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<LatLng | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ocorrencias, setOcorrencias] = useState<IOcorrencia[]>([]);

  useEffect(() => {
    fetchOcorrencias();
  }, []);

  const fetchOcorrencias = async () => {
    setIsLoading(true);
    try {
      const token = await getAuthToken();
      
      const headers: { [key: string]: string } = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/ocorrencias`, { headers });
      
      if (!response.ok) {
        throw new Error('Falha ao buscar ocorrências.');
      }

      const data = await response.json();
      
      if (Array.isArray(data)) {
        setOcorrencias(data);
      } else {
        console.error('API retornou um formato inválido:', data);
        setOcorrencias([]);
      }

    } catch (error) {
      console.error('Erro ao buscar ocorrências:', error);
      Alert.alert(Strings.alerts.errorTitle, 'Não foi possível carregar as ocorrências. Verifique sua conexão.');
    } finally {
      setIsLoading(false);
    }
  };

  const getLocation = async () => {
    setIsLoading(true);
    try {
      const location = await getCurrentLocation();
      if (location) {
        setCurrentLocation(location);
        setRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      Alert.alert(Strings.alerts.errorTitle, 'Não foi possível obter sua localização.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
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
        initialRegion={region}
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
                <Text style={styles.cardText}>Data: {new Date(ocorrencia.dataHora).toLocaleDateString()}</Text>
                <Text style={styles.cardText}>Latitude: {ocorrencia.latitude}</Text>
                <Text style={styles.cardText}>Longitude: {ocorrencia.longitude}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <TouchableOpacity style={styles.addButton} onPress={getLocation}>
        <Ionicons name="add" size={30} color={Colors.textLight} />
      </TouchableOpacity>
      
      {currentLocation && (
        <Modal
          isVisible={modalVisible}
          style={styles.modal}
          onBackdropPress={handleCloseModal}
          onBackButtonPress={handleCloseModal}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Ionicons name="close-circle" size={30} color={Colors.primary} />
            </TouchableOpacity>
            <ContributionForm
              initialCoordinates={currentLocation ? { latitude: currentLocation.latitude, longitude: currentLocation.longitude } : undefined}
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