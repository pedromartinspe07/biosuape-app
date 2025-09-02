/**
 * @fileoverview Paleta de cores e constantes para uso em toda a aplicação.
 * Organizado em uma paleta base para consistência e cores semânticas para uso em componentes.
 */

// Paleta de cores base. Segue uma convenção de nomenclatura comum
// onde o número indica a luminosidade da cor (ex: 500 é o tom principal).
export const Palette = {
  // Cores de marca (neutras)
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  // Cores primárias da marca
  blue: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6', // Tom principal
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },
  // Cores de status de sucesso
  green: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981', // Tom principal
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
  },
  // Cores de status de erro
  red: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444', // Tom principal
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },
  // Cores de status de aviso
  yellow: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B', // Tom principal
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },
  white: '#FFFFFF',
  black: '#000000',
};

// Cores do tema, usando nomes semânticos para clareza
export const Colors = {
  // Cores principais
  primary: Palette.blue[500],
  primaryDark: Palette.blue[700],
  accent: Palette.blue[400],

  // Fundo e superfícies
  background: Palette.neutral[50], // Fundo de toda a tela
  surface: Palette.white, // Fundo de cards, modais
  border: Palette.neutral[200], // Borda de inputs e separadores
  divider: Palette.neutral[300],

  // Cores de texto
  textPrimary: Palette.neutral[900], // Texto principal
  textSecondary: Palette.neutral[600], // Texto secundário (legibilidade menor)
  textLight: Palette.white, // Texto sobre fundos escuros
  textLink: Palette.blue[600],

  // Cores de feedback
  success: Palette.green[500],
  successDark: Palette.green[700],
  error: Palette.red[500],
  errorDark: Palette.red[700],
  warning: Palette.yellow[500],
  warningDark: Palette.yellow[700],
  info: Palette.blue[400],
};
