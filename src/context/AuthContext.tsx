import * as SecureStore from 'expo-secure-store';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { setSignOutCallback } from '../services/apiService';

// Definição dos tipos para a autenticação
export interface User {
  id: string;
  username: string;
  email: string;
  // Adicione outras informações do usuário aqui, como nome, avatar, etc.
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (token: string, userData: User) => Promise<void>;
  signOut: () => Promise<void>;
}

// Cria o contexto de autenticação com valores padrão
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define a chave para armazenar o token de forma segura
const TOKEN_KEY = 'user-auth-token';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Função para fazer o login
  const signIn = async (token: string, userData: User) => {
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      setUser(userData);
    } catch (error) {
      console.error('Falha ao armazenar o token:', error);
      throw new Error('Falha no login. Tente novamente.');
    }
  };

  // Função para fazer o logout
  const signOut = async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      setUser(null);
    } catch (error) {
      console.error('Falha ao remover o token:', error);
      throw new Error('Falha no logout. Tente novamente.');
    }
  };

  // Efeito para carregar o token de autenticação ao iniciar o app
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
        if (storedToken) {
          // Aqui você faria uma requisição para sua API para validar o token
          // e obter os dados do usuário. Por simplicidade, vamos usar um mock.
          const mockUser: User = {
            id: '123',
            username: 'suape_user',
            email: 'user@suapeconecta.com',
          };
          setUser(mockUser);
        }
      } catch (error) {
        console.error('Falha ao carregar o token de autenticação:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthData();

    // Configura a função de signOut no apiService.
    // É importante que esta função seja chamada apenas uma vez.
    setSignOutCallback(signOut);
  }, []);

  const value = {
    user,
    isLoading,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para consumir o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
