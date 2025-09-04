// src/constants/colors.ts

/**
 * @fileoverview Paleta de cores e constantes para uso em toda a aplicação.
 * Projetado para um design moderno e vibrante, com foco em uma experiência de usuário intuitiva.
 */

// Paleta de cores base. A luminosidade é indicada pelo número.
export const Palette = {
  // Cores de marca (neutras) - mais quentes para maior suavidade
  neutral: {
    50: '#F5F5F7',
    100: '#EAEAEB',
    200: '#D6D6D7',
    300: '#C2C2C4',
    400: '#A3A3A6',
    500: '#75757A',
    600: '#525256',
    700: '#3D3D40',
    800: '#29292D',
    900: '#1A1A1D',
  },
  // Cor primária - um vibrante azul-petróleo que evoca o mar
  teal: {
    50: '#E0F7F9',
    100: '#B2EBF2',
    200: '#80DEEA',
    300: '#4DD0E1',
    400: '#26C6DA',
    500: '#00BCD4', // Tom principal e mais vibrante
    600: '#00ACC1',
    700: '#0097A7',
    800: '#00838F',
    900: '#006064',
  },
  // Cor de destaque - um verde mais orgânico
  green: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50', // Tom principal
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20',
  },
  // Cor de erro - um vermelho mais profundo e forte
  red: {
    50: '#FFEBEE',
    100: '#FFCDD2',
    200: '#EF9A9A',
    300: '#E57373',
    400: '#EF5350',
    500: '#F44336', // Tom principal
    600: '#E53935',
    700: '#D32F2F',
    800: '#C62828',
    900: '#B71C1C',
  },
  // Cor de aviso - um amarelo mais intenso
  yellow: {
    50: '#FFFDE7',
    100: '#FFF9C4',
    200: '#FFF59D',
    300: '#FFF176',
    400: '#FFEE58',
    500: '#FFEB3B', // Tom principal
    600: '#FDD835',
    700: '#FBC02D',
    800: '#F9A825',
    900: '#F57F17',
  },
  white: '#FFFFFF',
  black: '#000000',
};

// Cores do tema, usando nomes semânticos para clareza
export const Colors = {
  // Cores principais
  primary: Palette.teal[500],
  primaryDark: Palette.teal[700],
  accent: Palette.green[500],
  
  // Cores de fundo
  background: Palette.neutral[50], // Fundo de toda a tela, claro e suave
  surface: Palette.white, // Fundo de cards, modais, etc., para contraste
  
  // Cores de borda e separadores
  border: Palette.neutral[200],
  divider: Palette.neutral[300],

  // Cores de texto para garantir alta legibilidade
  textPrimary: Palette.neutral[900], // Para títulos e textos importantes
  textSecondary: Palette.neutral[600], // Para legendas, textos de suporte
  textLight: Palette.white, // Texto sobre fundos escuros
  textLink: Palette.teal[700],

  // Cores de feedback e status
  success: Palette.green[500],
  successDark: Palette.green[700],
  error: Palette.red[500],
  errorDark: Palette.red[700],
  warning: Palette.yellow[500],
  warningDark: Palette.yellow[700],
  info: Palette.teal[400],
};