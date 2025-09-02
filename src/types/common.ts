// src/types/common.ts

// --- Tipos de Entidades de Dados ---

/**
 * Define a estrutura de dados para um usuário no sistema.
 */
export interface Usuario {
  id: string;
  nome: string;
  email: string;
  dataRegistro: string; // Formato ISO 8601
}

/**
 * Define a estrutura de dados de uma espécie de bioindicador.
 */
export interface Bioindicador {
  id: string;
  nomePopular: string;
  nomeCientifico: string;
  descricao: string;
  funcaoBioindicadora: string;
  imageUrl: string;
}

/**
 * Define a estrutura de dados de uma ocorrência (contribuição do usuário).
 */
export interface Ocorrencia {
  id: string;
  // Relacionamento com outras entidades
  usuarioId: string;
  bioindicadorId: string;

  // Dados da ocorrência
  latitude: number;
  longitude: number;
  dataHora: string; // Formato ISO 8601
  observacoes: string;
  imageUrl?: string; // Opcional

  // Dados ambientais
  ph?: number;
  temperaturaAgua?: number;

  // Dados de controle
  createdAt: string; // Data de criação
  updatedAt: string; // Data de última atualização
}

/**
 * Define a estrutura de dados para um relatório analítico.
 */
export interface Relatorio {
  id: string;
  titulo: string;
  descricao: string;
  // Dados do gráfico (ex: para LineChart)
  dados: {
    labels: string[];
    datasets: {
      data: number[];
      label?: string;
    }[];
  };
}

// --- Tipos de Formulários ---

/**
 * Define a estrutura de dados para o formulário de contribuição.
 * Não inclui 'id' nem 'userId' que são gerados no backend.
 */
export interface ContributionFormInput {
  bioindicadorId: string;
  latitude: number;
  longitude: number;
  ph?: number;
  temperaturaAgua?: number;
  observacoes?: string;
  imageUrl?: string;
}