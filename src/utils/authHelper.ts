import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN_KEY = 'auth_token';

/**
 * Salva o token de autenticação no AsyncStorage.
 * @param token O token JWT a ser salvo.
 */
export const saveAuthToken = async (token: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
    } catch (error) {
        console.error('Falha ao salvar o token de autenticação:', error);
    }
};

/**
 * Remove o token de autenticação do AsyncStorage.
 */
export const removeAuthToken = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    } catch (error) {
        console.error('Falha ao remover o token de autenticação:', error);
    }
};

/**
 * Verifica se um token de autenticação válido está armazenado.
 * Retorna true se houver um token, false caso contrário.
 */
export const checkAuthStatus = async (): Promise<boolean> => {
    try {
        const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
        // Em uma implementação real, você também verificaria se o token é válido (por exemplo, se não expirou)
        // usando uma biblioteca de JWT.
        return !!token;
    } catch (error) {
        console.error('Falha ao verificar o status de autenticação:', error);
        return false;
    }
};

/**
 * Obtém o token de autenticação do AsyncStorage.
 * @returns O token ou null se não for encontrado.
 */
export const getAuthToken = async (): Promise<string | null> => {
    try {
        const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
        return token;
    } catch (error) {
        console.error('Falha ao obter o token de autenticação:', error);
        return null;
    }
};
