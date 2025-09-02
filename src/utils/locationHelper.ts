// src/utils/locationHelper.ts

import * as Location from 'expo-location';

/**
 * Solicita permissão de acesso à localização do usuário.
 * @returns Um objeto com o status da permissão e a mensagem de erro, se houver.
 */
export const requestLocationPermission = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return {
      granted: false,
      error: 'Permissão para acessar a localização foi negada.'
    };
  }
  return {
    granted: true,
    error: null
  };
};

/**
 * Obtém a localização atual do dispositivo.
 * @returns As coordenadas (latitude e longitude) ou null em caso de erro.
 */
export const getCurrentLocation = async () => {
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