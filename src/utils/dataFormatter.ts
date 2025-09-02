// src/utils/dataFormatter.ts

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

/**
 * Formata uma string de data ISO 8601 para o formato 'dd/MM/yyyy às HH:mm'.
 * Retorna a data original se a formatação falhar.
 * @param isoDateString A string de data ISO 8601.
 * @returns A data formatada.
 */
export const formatDate = (isoDateString: string): string => {
  try {
    const date = parseISO(isoDateString);
    return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  } catch (error) {
    console.error('Erro ao formatar a data:', error);
    return isoDateString;
  }
};

/**
 * Formata um valor numérico para uma casa decimal.
 * Retorna 'N/A' se o valor não for um número.
 * @param value O valor numérico a ser formatado.
 * @returns O valor formatado como string.
 */
export const formatNumberToOneDecimal = (value?: number): string => {
  if (typeof value !== 'number' || isNaN(value)) {
    return 'N/A';
  }
  return value.toFixed(1);
};

/**
 * Formata coordenadas geográficas (latitude e longitude) para exibição.
 * @param lat A latitude.
 * @param lng A longitude.
 * @returns A string formatada no padrão 'Lat: X.XXXX, Lng: Y.YYYY'.
 */
export const formatCoordinates = (lat: number, lng: number): string => {
  return `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
};

/**
 * Limita o comprimento de uma string, adicionando reticências se necessário.
 * @param text A string a ser truncada.
 * @param maxLength O comprimento máximo permitido.
 * @returns A string truncada.
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength).trim() + '...';
};