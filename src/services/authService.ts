// src/services/authService.ts

import { API_BASE_URL } from '../constants/api';
import { saveAuthToken } from '../utils/authHelper';

/**
 * Interface para a resposta de login da API.
 */
interface LoginResponse {
  message: string;
  token: string;
}

/**
 * Interface para a resposta de registro da API.
 */
interface RegisterResponse {
  message: string;
}

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
      const error = new Error(data.message || 'Ocorreu um erro na requisição.');
      (error as any).status = response.status;
      throw error;
    }

    return data as T;
  } catch (error) {
    // Propaga o erro de comunicação com o servidor
    if (error instanceof Error) {
        // Verifica se é um erro de rede (Ex: servidor offline)
        if (error.message.includes('Failed to fetch') || error.message.includes('Network request failed')) {
            throw new Error('Não foi possível se conectar ao servidor. Verifique sua conexão.');
        }
    }
    // Caso contrário, propaga o erro de resposta do backend
    throw error;
  }
};

/**
 * Realiza a chamada de API para o login do usuário.
 * Em caso de sucesso, salva o token de autenticação.
 * @returns O token de autenticação em caso de sucesso.
 */
export const login = async (email: string, password: string): Promise<string> => {
  try {
    const data = await makeRequest<LoginResponse>('/login', 'POST', { email, password });

    if (data.token) {
      await saveAuthToken(data.token);
      return data.token;
    }
    // Se o token não for recebido, a função makeRequest já teria lançado um erro,
    // mas este é um bom fallback de segurança.
    throw new Error('Token de autenticação não recebido.');
  } catch (error) {
    // Apenas propaga o erro lançado por makeRequest
    throw error;
  }
};

/**
 * Realiza a chamada de API para o cadastro de um novo usuário.
 * @returns Uma mensagem de sucesso em caso de cadastro bem-sucedido.
 */
export const register = async (username: string, email: string, password: string): Promise<string> => {
  try {
    const data = await makeRequest<RegisterResponse>('/register', 'POST', { nome: username, email, password });
    
    return data.message;
  } catch (error) {
    // Apenas propaga o erro lançado por makeRequest
    throw error;
  }
};