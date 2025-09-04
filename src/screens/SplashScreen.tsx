// src/screens/SplashScreen.tsx

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/colors';
import { Strings } from '../constants/strings';
import { RootStackParamList } from '../types/navigation'; // Tipagem das rotas
import { checkAuthStatus } from '../utils/authHelper';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC = () => {
    const navigation = useNavigation<SplashScreenNavigationProp>();

    useEffect(() => {
        const checkAuth = async () => {
            // Simulação de tempo de carregamento para uma melhor UX
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Verificação do status de autenticação
            const isAuthenticated = await checkAuthStatus();

            if (isAuthenticated) {
                // Navega para o AppStack se o usuário estiver autenticado
                navigation.replace('AppStack' as any);
            } else {
                // Navega para a tela de autenticação
                navigation.replace('Auth');
            }
        };

        checkAuth();
    }, [navigation]);

    return (
        <View style={styles.container}>
            {/* O ícone da sua aplicação */}
            <Image 
                source={require('../assets/images/favicon.png')} 
                style={styles.logo} 
            />
            <Text style={styles.title}>{Strings.common.appName}</Text>
            <ActivityIndicator 
                size="large" 
                color={Colors.primary} 
                style={styles.loading} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginTop: 20,
    },
    loading: {
        marginTop: 40,
    },
});

export default SplashScreen;