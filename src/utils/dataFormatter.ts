// src/utils/dataFormatter.ts

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

/**
 * Formata uma data ISO 8601 para o formato 'dd/MM/yyyy HH:mm'.
 * @param isoDateString A string de data ISO 8601.
 * @returns A data formatada.
 */
export const formatDate = (isoDateString: string): string => {
  try {
    const date = parseISO(isoDateString);
    return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  } catch (error) {
    console.error('Erro ao formatar a data:', error);
    return isoDateString; // Retorna a string original em caso de erro
  }
};

/**
 * Formata um valor numérico para uma casa decimal.
 * @param value O valor numérico a ser formatado.
 * @returns O valor formatado como string, ou o valor original se não for um número.
 */
export const formatNumberToOneDecimal = (value?: number): string => {
  if (typeof value !== 'number') {
    return 'N/A';
  }
  return value.toFixed(1);
};