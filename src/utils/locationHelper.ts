// src/utils/locationHelper.ts

import * as Location from 'expo-location';

// --- Tipos e Erros para o helper de localização ---

/**
 * Define a estrutura de um objeto de coordenadas geográficas.
 */
export interface Coords {
  latitude: number;
  longitude: number;
}

/**
 * Códigos de erro específicos para a lógica de localização.
 */
export enum LocationErrorCode {
  PermissionDenied = 'PERMISSION_DENIED',
  RequestFailed = 'REQUEST_FAILED',
  LocationUnavailable = 'LOCATION_UNAVAILABLE',
}

/**
 * Classe de erro personalizada para falhas de localização.
 */
export class LocationError extends Error {
  code: LocationErrorCode;

  constructor(message: string, code: LocationErrorCode) {
    super(message);
    this.name = 'LocationError';
    this.code = code;
  }
}

// --- Funções do helper de localização ---

/**
 * Solicita permissão de acesso à localização do usuário em primeiro plano.
 * @returns {Promise<boolean>} Retorna true se a permissão for concedida, ou lança um LocationError.
 */
export const requestLocationPermission = async (): Promise<boolean> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new LocationError(
        'Permissão para acessar a localização foi negada. Por favor, habilite-a nas configurações.',
        LocationErrorCode.PermissionDenied
      );
    }
    return true;
  } catch (err) {
    if (err instanceof LocationError) {
      throw err; // Propaga nosso erro personalizado
    }
    console.error('Erro ao solicitar permissão de localização:', err);
    throw new LocationError(
      'Não foi possível solicitar a permissão de localização.',
      LocationErrorCode.RequestFailed
    );
  }
};

/**
 * Obtém a localização atual do dispositivo.
 * Tenta usar a localização atual. Se falhar, tenta obter a última localização conhecida.
 * @returns {Promise<Coords>} As coordenadas do dispositivo.
 * @throws {LocationError} Lança um erro se a localização não puder ser obtida.
 */
export const getCurrentLocation = async (): Promise<Coords> => {
  try {
    const isPermissionGranted = await requestLocationPermission();
    if (!isPermissionGranted) {
      // requestLocationPermission já lida com o erro, então apenas lançamos
      // um erro genérico aqui para manter a tipagem.
      throw new Error();
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    
    if (location) {
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    }
  } catch (error) {
    console.warn('Falha ao obter a localização atual. Tentando a última conhecida...');
  }

  // Se a primeira tentativa falhar, tenta a última localização conhecida
  try {
    const lastKnownLocation = await Location.getLastKnownPositionAsync();
    if (lastKnownLocation) {
      return {
        latitude: lastKnownLocation.coords.latitude,
        longitude: lastKnownLocation.coords.longitude,
      };
    }
  } catch (error) {
    console.error('Falha ao obter a última localização conhecida:', error);
  }

  throw new LocationError(
    'Não foi possível obter sua localização. Verifique o GPS ou as configurações do seu dispositivo.',
    LocationErrorCode.LocationUnavailable
  );
};