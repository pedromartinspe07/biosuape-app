// src/services/authService.ts

import { API_BASE_URL } from '../constants/api';
import { saveAuthToken } from '../utils/authHelper';

/**
 * Interface para a resposta de login da API.
 */
interface LoginResponse {
  message: string;
  token: string;
  // Outros dados do usuário, se a API retornar
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
      const error = new Error(data.message || 'Ocorreu um erro na requisição.');
      // Adiciona o status do erro ao objeto para um tratamento mais específico
      (error as any).status = response.status;
      throw error;
    }

    return data as T;
  } catch (error) {
    console.error('Falha na comunicação com o servidor:', error);
    throw new Error('Não foi possível se conectar ao servidor. Verifique sua conexão.');
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
    } else {
      throw new Error('Token de autenticação não recebido.');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Falha no login: ${error.message}`);
    }
    throw error;
  }
};

/**
 * Realiza a chamada de API para o cadastro de um novo usuário.
 * @returns Uma mensagem de sucesso em caso de cadastro bem-sucedido.
 */
export const register = async (username: string, email: string, password: string): Promise<string> => {
  try {
    // A propriedade 'username' foi ajustada para 'nome' para refletir o modelo User.ts
    const data = await makeRequest<RegisterResponse>('/register', 'POST', { nome: username, email, password });
    
    // A API agora retorna uma mensagem, que pode ser usada na UI
    return data.message;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Falha no cadastro: ${error.message}`);
    }
    throw error;
  }
};