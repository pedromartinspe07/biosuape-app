import { StyleSheet } from 'react-native';
import AppNavigator from '../src/navigation/AppNavigator';

/**
 * Este é o ponto de entrada principal da sua aplicação.
 * Ele renderiza o componente AppNavigator, que gerencia todas as
 * telas e a navegação da aplicação.
 */
export default function App() {
  return <AppNavigator />;
}

// Estilos básicos que podem ser reaproveitados em outras telas, se necessário.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 960,
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 36,
    color: '#38434D',
  },
});
