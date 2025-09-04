// src/services/apiService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_BASE_URL = 'http://biosuape-backend-api-production.up.railway.app/api/v1'; // Substitua pelo IP da sua máquina e pela porta do backend

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para adicionar o token de autenticação em todas as requisições
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/login', { email, password });
    return response.data;
  },
  register: async (nome: string, email: string, password: string) => {
    const response = await api.post('/register', { nome, email, password });
    return response.data;
  },
};

export const profileService = {
  getProfileData: async () => {
    const response = await api.get('/ocorrencias/minhas');
    return response.data;
  },
};

export default api;