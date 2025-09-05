// src/services/apiService.ts
import SecureStore from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

// Definindo o URL base da API.
// Em uma aplicação real, é altamente recomendado usar variáveis de ambiente
// para gerenciar URLs de API (ex: process.env.API_BASE_URL).
const API_BASE_URL = 'https://biosuape-backend-api-production.up.railway.app/api/v1';

// --- Interfaces para tipagem de dados ---
// Isso garante que os dados manipulados sejam consistentes e evita erros.

interface User {
  id: number;
  nome: string;
  email: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface Ocorrencia {
  // Adicione aqui os campos do objeto Ocorrência, como id, titulo, descricao, etc.
  id: number;
  titulo: string;
  descricao: string;
  // outros campos...
}

// Uma variável para armazenar a função de logout do contexto de autenticação.
// É inicializada como uma função vazia para evitar erros.
let onSignOut: (() => Promise<void>) | null = null;

/**
 * Configura a função de callback para o logout.
 * Esta função é chamada pelo AuthContext.
 * @param callback A função de logout do AuthContext.
 */
export const setSignOutCallback = (callback: () => Promise<void>) => {
  onSignOut = callback;
};

// Criando uma instância do Axios para ser usada em toda a aplicação.
// Isso centraliza as configurações e interceptores.
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Tempo limite de 10 segundos para as requisições
});

// --- Interceptor de Requisição ---
// Adiciona o token de autenticação em todas as requisições.
api.interceptors.request.use(
  async (config) => {
    try {
      const token: string | null = await SecureStore.getItem('userToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Erro ao obter o token do SecureStore:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Função para lidar com o erro 401 (Não Autorizado)
const handleAuthError = async (error: AxiosError) => {
  if (error.response?.status === 401) {
    console.log('Token expirado ou inválido. Deslogando automaticamente.');
    // Se a função de logout do contexto foi definida, chame-a.
    if (onSignOut) {
      onSignOut();
    }
  }
  return Promise.reject(error);
};

// --- Interceptor de Resposta ---
// Lida com erros da API de forma centralizada.
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  handleAuthError
);

// --- Serviços da Aplicação ---

// Gerencia todas as funcionalidades de autenticação (login, cadastro, logout).
export const authService = {
  /**
   * Realiza o login do usuário.
   * @param email O email do usuário.
   * @param password A senha do usuário.
   * @returns Uma promessa que resolve para o token e os dados do usuário.
   */
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/login', { email, password });
      await SecureStore.setItem('userToken', response.data.token);
      return response.data;
    } catch (error) {
      throw error; // Propaga o erro para ser tratado pelo componente
    }
  },

  /**
   * Realiza o cadastro de um novo usuário.
   * @param nome O nome do usuário.
   * @param email O email do usuário.
   * @param password A senha do usuário.
   * @returns Uma promessa que resolve para o token e os dados do novo usuário.
   */
  register: async (nome: string, email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/register', { nome, email, password });
      await SecureStore.setItem('userToken', response.data.token);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Realiza o logout do usuário, removendo o token de autenticação.
   */
  logout: async (): Promise<void> => {
    try {
      await SecureStore.removeItem('userToken');
    } catch (error) {
      throw error;
    }
  }
};

// Gerencia as funcionalidades relacionadas às ocorrências.
export const ocorrenciasService = {
  /**
   * Busca todas as ocorrências do usuário logado.
   * @returns Uma promessa que resolve para um array de objetos de Ocorrência.
   */
  getOcorrencias: async (): Promise<Ocorrencia[]> => {
    try {
      const response = await api.get<Ocorrencia[]>('/ocorrencias/minhas');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default api;
