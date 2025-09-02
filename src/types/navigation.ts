import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Strings } from '../constants/strings';

// --- Parâmetros das Rotas ---

/**
 * Define os parâmetros para a navegação por pilha dentro da aba 'Biblioteca'.
 * Permite navegar para a tela de detalhes de um bioindicador.
 */
export type LibraryStackParamList = {
  [Strings.navigation.library]: undefined; // A tela inicial da aba
  BioindicadorDetalhe: { bioindicadorId: string; nomePopular: string };
};

/**
 * Define os parâmetros para a navegação por abas na raiz do aplicativo.
 * Cada aba é uma tela ou um navegador (como a pilha da 'Biblioteca').
 */
export type AppTabParamList = {
  [Strings.navigation.map]: undefined;
  [Strings.navigation.library]: NavigatorScreenParams<LibraryStackParamList>;
  [Strings.navigation.reports]: undefined;
  [Strings.navigation.profile]: undefined;
};

// --- Tipagem para Telas ---

/**
 * Tipagem para as props da tela de Mapa.
 */
export type MapScreenProps = BottomTabScreenProps<AppTabParamList, typeof Strings.navigation.map>;

/**
 * Tipagem para as props da tela de Biblioteca (a raiz da pilha).
 */
export type LibraryScreenProps = StackScreenProps<LibraryStackParamList, typeof Strings.navigation.library>;

/**
 * Tipagem para as props da tela de Detalhes de Bioindicador.
 */
export type BioindicadorDetalheScreenProps = StackScreenProps<LibraryStackParamList, 'BioindicadorDetalhe'>;

// --- Tipagem Raiz ---

/**
 * Tipagem completa para o navegador raiz.
 */
export type RootStackParamList = {
  // Telas iniciais que não fazem parte das abas, como Splash e Autenticação.
  Splash: undefined;
  Auth: undefined;
  // O AppStack representa o fluxo principal do aplicativo após a autenticação.
  AppStack: NavigatorScreenParams<AppTabParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
