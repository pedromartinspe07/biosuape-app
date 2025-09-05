// src/utils/authHelper.ts

import SecureStore from '@react-native-async-storage/async-storage';

const AUTH_TOKEN_KEY = 'auth_token';

/**
 * Salva o token de autenticação no SecureStore.
 * @param token O token JWT a ser salvo.
 * @returns Uma Promise que resolve quando a operação é concluída.
 */
export const saveAuthToken = async (token: string): Promise<void> => {
    try {
        await SecureStore.setItem(AUTH_TOKEN_KEY, token);
        console.log('Token de autenticação salvo com sucesso.');
    } catch (error) {
        console.error('Falha ao salvar o token de autenticação:', error);
        // Em um app de produção, você pode querer lançar um erro ou tratar de forma diferente
    }
};

/**
 * Remove o token de autenticação do SecureStore.
 * @returns Uma Promise que resolve quando a operação é concluída.
 */
export const removeAuthToken = async (): Promise<void> => {
    try {
        await SecureStore.removeItem(AUTH_TOKEN_KEY);
        console.log('Token de autenticação removido com sucesso.');
    } catch (error) {
        console.error('Falha ao remover o token de autenticação:', error);
    }
};

/**
 * Obtém o token de autenticação do SecureStore.
 * @returns O token como string ou null se não for encontrado.
 */
export const getAuthToken = async (): Promise<string | null> => {
    try {
        const token = await SecureStore.getItem(AUTH_TOKEN_KEY);
        return token;
    } catch (error) {
        console.error('Falha ao obter o token de autenticação:', error);
        return null;
    }
};

/**
 * Verifica o status de autenticação do usuário.
 * Em uma implementação real, você também verificaria a validade do token (ex: expiração).
 * @returns True se houver um token válido, False caso contrário.
 */
export const checkAuthStatus = async (): Promise<boolean> => {
    try {
        const token = await getAuthToken();
        if (token) {
            // Lógica adicional para validar o token, como decodificá-lo e verificar a expiração.
            // Exemplo (usando uma biblioteca como jwt-decode):
            // const decodedToken = jwtDecode(token);
            // const isTokenExpired = decodedToken.exp * 1000 < Date.now();
            // return !isTokenExpired;
            
            return true; // Retorna true se um token existir
        }
        return false;
    } catch (error) {
        console.error('Falha ao verificar o status de autenticação:', error);
        return false;
    }
};