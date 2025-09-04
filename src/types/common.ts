// src/types/common.ts

// --- Tipos de Entidades de Dados ---

/**
 * Define a estrutura de dados para um usuário no sistema.
 */
export interface IUsuario {
  id: string;
  nome: string;
  email: string;
  dataRegistro: string; // Formato ISO 8601
}

/**
 * Define a estrutura de dados de uma espécie de bioindicador.
 */
export interface IBioindicador {
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
export interface IOcorrencia {
  id: string;
  usuarioId: string;
  bioindicadorId: string;
  latitude: number;
  longitude: number;
  dataHora: string; // Formato ISO 8601
  observacoes: string;
  imageUrl?: string | null; // Opcional, pode ser nulo
  ph?: number | null;
  temperaturaAgua?: number | null;
  createdAt: string;
  updatedAt: string;
}

// --- Tipos de Gráficos (para bibliotecas como react-native-chart-kit) ---

/**
 * Define a estrutura de dados de um conjunto de dados para um gráfico.
 */
interface IChartDataset {
  data: number[];
  label?: string;
  color?: (opacity: number) => string;
  strokeWidth?: number;
}

/**
 * Define a estrutura de dados para o relatório de gráfico.
 */
export interface IReportData {
  labels: string[];
  datasets: IChartDataset[];
}

// --- Tipos de Formulários e UI ---

/**
 * Define a estrutura de dados para o formulário de login e registro.
 */
export interface IAuthFormInput {
  username?: string;
  email: string;
  password: string;
}

/**
 * Define a estrutura de dados para o formulário de contribuição.
 */
export interface IContributionFormInput {
  bioindicadorId: string;
  latitude: number;
  longitude: number;
  ph?: number | null;
  temperaturaAgua?: number | null;
  observacoes?: string | null;
  imageUrl?: string | null;
}

/**
 * Define a estrutura de dados para a resposta da autenticação.
 */
export interface IAuthData {
  token: string;
  usuario: IUsuario;
}

/**
 * Define a estrutura de dados para mensagens de feedback visual.
 */
export interface IMessage {
  text: string;
  type: 'success' | 'error' | 'info';
}