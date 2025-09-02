// src/constants/colors.ts

// Paleta de cores base
export const Palette = {
  blue: {
    500: '#007BFF', // Tom principal
    600: '#0069D9', // Tom escuro para botões pressionados
    700: '#0056B3',
  },
  green: {
    500: '#28A745',
    600: '#218838',
    700: '#1E7E34',
  },
  red: {
    500: '#DC3545',
    600: '#C82333',
    700: '#BD2130',
  },
  orange: {
    500: '#FFC107',
    600: '#E0A800',
  },
  gray: {
    100: '#F8F9FA', // Cinza muito claro (quase branco)
    200: '#E9ECEF', // Borda e separadores leves
    300: '#DEE2E6',
    400: '#CED4DA',
    500: '#ADB5BD',
    600: '#6C757D', // Texto mudo
    700: '#495057', // Texto principal
    800: '#343A40',
    900: '#212529', // Cinza muito escuro
  },
  white: '#FFFFFF',
  black: '#000000',
};

// Cores do tema para facilitar o uso nos componentes
export const Colors = {
  // Cores primárias
  primary: Palette.blue[500],
  primaryDark: Palette.blue[600],

  // Fundo e superfícies
  background: Palette.gray[100],
  surface: Palette.white,
  border: Palette.gray[200],

  // Cores de texto
  textPrimary: Palette.gray[800],
  textSecondary: Palette.gray[600],
  textLight: Palette.white,

  // Cores de feedback
  success: Palette.green[500],
  successDark: Palette.green[600],
  error: Palette.red[500],
  errorDark: Palette.red[600],
  warning: Palette.orange[500],
};
