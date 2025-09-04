// src/services/authService.ts

import { API_BASE_URL } from '../constants/api';
import { IAuthData } from '../types/common';
import { saveAuthToken } from '../utils/authHelper';

/**
 * Função utilitária para centralizar as requisições de API.
 * Lida com headers, parse de JSON e tratamento de erros padrão.
 */
const makeRequest = async <T>(endpoint: string, method: string, body?: object): Promise<T> => {
    const url = `${API_BASE_URL}${endpoint}`;
    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        const data = await response.json();

        if (!response.ok) {
            // Lança a mensagem de erro exata da API
            const errorMessage = data.message || 'Ocorreu um erro na requisição.';
            throw new Error(errorMessage);
        }

        return data as T;
    } catch (error) {
        // Propaga um erro de rede genérico para falhas de conexão
        if (error instanceof Error && (error.message.includes('Network request failed') || error.message.includes('Failed to fetch'))) {
            throw new Error('Não foi possível se conectar ao servidor. Verifique sua conexão.');
        }
        // Se não for um erro de rede, propaga o erro original
        throw error;
    }
};

/**
 * Realiza a chamada de API para o login do usuário.
 * Em caso de sucesso, salva o token de autenticação e retorna os dados do usuário.
 * @returns Os dados de autenticação (token e usuário) em caso de sucesso.
 */
export const login = async (email: string, password: string): Promise<IAuthData> => {
    const data = await makeRequest<IAuthData>('/login', 'POST', { email, password });
    
    if (data.token) {
        await saveAuthToken(data.token);
    } else {
        throw new Error('Token de autenticação não recebido.');
    }

    return data;
};

/**
 * Realiza a chamada de API para o cadastro de um novo usuário.
 * @returns Uma mensagem de sucesso em caso de cadastro bem-sucedido.
 */
export const register = async (username: string, email: string, password: string): Promise<string> => {
    const data = await makeRequest<{ message: string }>('/register', 'POST', { nome: username, email, password });
    
    return data.message;
};