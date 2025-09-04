// src/utils/dataFormatter.ts

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

/**
 * Formata uma string de data ISO 8601 ou um objeto Date para um formato legível.
 * @param date A string de data ISO 8601 ou o objeto Date.
 * @param formatString O formato de saída (padrão: "dd/MM/yyyy 'às' HH:mm").
 * @returns A data formatada como string ou uma mensagem de erro em caso de falha.
 */
export const formatDate = (
  date: string | Date,
  formatString: string = "dd/MM/yyyy 'às' HH:mm"
): string => {
  if (!date) {
    return 'Data inválida';
  }
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return format(parsedDate, formatString, { locale: ptBR });
  } catch (error) {
    console.error('Erro ao formatar a data:', error);
    return 'Data inválida';
  }
};

/**
 * Formata um valor numérico para um número específico de casas decimais.
 * Retorna 'N/A' se o valor não for um número.
 * @param value O valor numérico a ser formatado.
 * @param decimalPlaces O número de casas decimais (padrão: 1).
 * @returns O valor formatado como string.
 */
export const formatNumber = (value?: number | null, decimalPlaces: number = 1): string => {
  if (value === null || typeof value !== 'number' || isNaN(value)) {
    return 'N/A';
  }
  return value.toFixed(decimalPlaces);
};

/**
 * Formata coordenadas geográficas (latitude e longitude) para exibição.
 * @param lat A latitude.
 * @param lng A longitude.
 * @returns A string formatada no padrão 'Lat: X.XXXX, Lng: Y.YYYY'.
 */
export const formatCoordinates = (lat: number, lng: number): string => {
  return `Lat: ${formatNumber(lat, 4)}, Lng: ${formatNumber(lng, 4)}`;
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