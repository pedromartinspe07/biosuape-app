// src/types/navigation.ts

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Strings } from '../constants/strings';
import { IBioindicador } from './common'; // Importa a interface do bioindicador

// --- Parâmetros das Rotas ---

/**
 * Define os parâmetros para a navegação por pilha dentro da aba 'Biblioteca'.
 */
export type LibraryStackParamList = {
    // A tela inicial da aba de biblioteca
    [Strings.navigation.library]: undefined;
    // Parâmetros para a tela de detalhes do bioindicador
    BioindicadorDetalhe: { bioindicador: IBioindicador };
};

/**
 * Define os parâmetros para a navegação por abas na raiz do aplicativo.
 * Cada chave corresponde a uma aba.
 */
export type AppTabParamList = {
    [Strings.navigation.map]: undefined;
    [Strings.navigation.library]: NavigatorScreenParams<LibraryStackParamList>;
    [Strings.navigation.reports]: undefined;
    [Strings.navigation.profile]: undefined;
};

/**
 * Tipagem completa para o navegador raiz (Stack).
 * Controla os fluxos de autenticação, splash e o fluxo principal.
 */
export type RootStackParamList = {
    Splash: undefined;
    Auth: undefined;
    AppStack: NavigatorScreenParams<AppTabParamList>;
};

// --- Tipagens de Props para Telas Específicas ---

/**
 * Tipo utilitário para as props de todas as telas.
 * Isso evita a necessidade de declarar 'props' individualmente em cada componente.
 */
export type ScreenProps = {
    // Props para telas do Tab Navigator
    Map: BottomTabScreenProps<AppTabParamList, typeof Strings.navigation.map>;
    Library: BottomTabScreenProps<AppTabParamList, typeof Strings.navigation.library>;
    Reports: BottomTabScreenProps<AppTabParamList, typeof Strings.navigation.reports>;
    Profile: BottomTabScreenProps<AppTabParamList, typeof Strings.navigation.profile>;

    // Props para telas do Stack Navigator (Biblioteca)
    BioindicadorDetalhe: StackScreenProps<LibraryStackParamList, 'BioindicadorDetalhe'>;
    
    // Props para telas do Stack Navigator (Root)
    Splash: StackScreenProps<RootStackParamList, 'Splash'>;
    Auth: StackScreenProps<RootStackParamList, 'Auth'>;
    AppStack: StackScreenProps<RootStackParamList, 'AppStack'>;
};

// --- Declaração Global para o React Navigation ---

/**
 * Estende o namespace 'ReactNavigation' para que o hook 'useNavigation'
 * seja automaticamente tipado em todo o projeto.
 */
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}