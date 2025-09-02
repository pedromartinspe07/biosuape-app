import { saveAuthToken } from '../utils/authHelper';
import { API_BASE_URL } from '../constants/api';
import { Usuario } from '../types/common';

/**
 * Realiza a chamada de API para o login do usuário.
 * Em caso de sucesso, salva o token de autenticação.
 */
export const login = async (email: string, password: string): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Falha no login. Verifique suas credenciais.');
        }

        // Supondo que a API retorne um objeto com a propriedade 'token'
        if (data.token) {
            await saveAuthToken(data.token);
        } else {
            throw new Error('Token de autenticação não recebido.');
        }

    } catch (error) {
        throw new Error(`Falha na comunicação com o servidor: ${error}`);
    }
};

/**
 * Realiza a chamada de API para o cadastro de um novo usuário.
 */
export const register = async (username: string, email: string, password: string): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Falha no cadastro. Verifique os dados fornecidos.');
        }

        console.log('Usuário registrado com sucesso!', data);

    } catch (error) {
        throw new Error(`Falha na comunicação com o servidor: ${error}`);
    }
};
