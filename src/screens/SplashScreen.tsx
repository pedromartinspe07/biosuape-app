import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Colors } from '../constants/colors';
import { Strings } from '../constants/strings';
import { checkAuthStatus } from '../utils/authHelper'; // Função que você precisará criar

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>; // 'Splash' é o nome da rota na navigation
type RootStackParamList = {
    Splash: undefined;
    AppStack: undefined;
    Auth: undefined;
};

const SplashScreen: React.FC = () => {
    const navigation = useNavigation<SplashScreenNavigationProp>();

    useEffect(() => {
        const checkAuth = async () => {
            // Simulação de tempo de carregamento
            await new Promise(resolve => setTimeout(resolve, 2000));

            const isAuthenticated = await checkAuthStatus(); // Verifica se o usuário tem um token válido

            if (isAuthenticated) {
                navigation.replace('AppStack', {} as any);
            } else {
                navigation.replace('Auth', {} as any);
            }
        };

        checkAuth();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/favicon.png')} style={styles.logo} />
            <Text style={styles.title}>{Strings.common.appName}</Text>
            <ActivityIndicator size="large" color={Colors.primary} style={styles.loading} />
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