// src/utils/locationHelper.ts

import * as Location from 'expo-location';

// --- Tipos para o helper de localização ---

/**
 * Define a estrutura de um objeto de coordenadas geográficas.
 */
export interface Coords {
  latitude: number;
  longitude: number;
}

/**
 * Define a estrutura do objeto de retorno da função de permissão.
 */
interface PermissionResponse {
  granted: boolean;
  error: string | null;
}

// --- Funções do helper de localização ---

/**
 * Solicita permissão de acesso à localização do usuário em primeiro plano.
 * Retorna um objeto com o status da permissão e a mensagem de erro, se houver.
 * @returns {Promise<PermissionResponse>} Um objeto com o status da permissão.
 */
export const requestLocationPermission = async (): Promise<PermissionResponse> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return {
        granted: false,
        error: 'Permissão para acessar a localização foi negada. Por favor, habilite-a nas configurações do seu dispositivo.',
      };
    }
    return {
      granted: true,
      error: null,
    };
  } catch (err) {
    console.error('Erro ao solicitar permissão de localização:', err);
    return {
      granted: false,
      error: 'Não foi possível solicitar a permissão de localização.',
    };
  }
};

/**
 * Obtém a localização atual do dispositivo.
 * Retorna um objeto de coordenadas (latitude e longitude) ou null em caso de erro.
 * @returns {Promise<Coords | null>} As coordenadas do dispositivo.
 */
export const getCurrentLocation = async (): Promise<Coords | null> => {
  try {
    const permissionStatus = await requestLocationPermission();
    if (!permissionStatus.granted) {
      console.error(permissionStatus.error);
      return null;
    }

    const location = await Location.getCurrentPositionAsync({});
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.error('Erro ao obter a localização:', error);
    return null;
  }
};