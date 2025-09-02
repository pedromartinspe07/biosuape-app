// src/types/navigation.ts

import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// Tipos para a navegação por abas
export type AppTabParamList = {
  Mapa: undefined;
  Biblioteca: undefined;
  Relatorios: undefined;
  Perfil: undefined;
};

// Tipos para a navegação por pilha (se você tiver)
// Exemplo: se uma tela dentro da aba "Biblioteca" puder abrir um detalhe da espécie
export type LibraryStackParamList = {
  Library: undefined;
  BioindicadorDetalhe: { bioindicadorId: string };
};

// Tipos para as telas
export type MapScreenProps = BottomTabScreenProps<AppTabParamList, 'Mapa'>;
export type LibraryScreenProps = BottomTabScreenProps<AppTabParamList, 'Biblioteca'>;

// Tipagem completa para o root (que pode conter múltiplas navegações)
export type RootStackParamList = {
  Tabs: NavigatorScreenParams<AppTabParamList>;
  // Outras telas que não estão nas abas podem ser adicionadas aqui
};

// Exemplo de como usar a tipagem em um componente de tela
// export type BioindicadorDetalheScreenProps = StackScreenProps<LibraryStackParamList, 'BioindicadorDetalhe'>;