// src/types/common.ts

// Define a estrutura de dados de uma espécie de bioindicador
export interface Bioindicador {
    id: string;
    nomePopular: string;
    nomeCientifico: string;
    descricao: string;
    funcaoBioindicadora: string;
    imageUrl: string;
  }
  
  // Define a estrutura de dados de uma ocorrência (a contribuição do usuário)
  export interface Ocorrencia {
    id: string;
    userId: string;
    bioindicadorId: string;
    latitude: number;
    longitude: number;
    dataHora: string;
    ph?: number; // Opcional
    temperaturaAgua?: number; // Opcional
    observacoes?: string; // Opcional
    imageUrl: string;
  }