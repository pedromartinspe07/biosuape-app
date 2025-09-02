// src/constants/strings.ts

export const Strings = {
  // Global
  appName: 'Bioindicadores Suape',
  common: {
    loading: 'Carregando...',
    submit: 'Enviar',
    cancel: 'Cancelar',
    success: 'Sucesso',
    error: 'Erro',
  },

  // Navegação
  navigation: {
    map: 'Mapa',
    library: 'Biblioteca',
    reports: 'Relatórios',
    profile: 'Perfil',
  },

  // Tela de Mapa
  mapScreen: {
    title: 'Mapa Interativo',
    alertTitle: 'Adicionar Ocorrência',
    alertMessage: 'Deseja adicionar uma nova ocorrência neste local?',
  },

  // Tela da Biblioteca
  libraryScreen: {
    title: 'Biblioteca de Bioindicadores',
    searchPlaceholder: 'Buscar espécie...',
  },

  // Tela de Relatórios
  reportsScreen: {
    title: 'Relatórios e Análises',
    noData: 'Nenhum dado disponível para gerar relatórios.',
  },

  // Formulário de Contribuição
  contributionForm: {
    title: 'Adicionar Nova Ocorrência',
    speciesLabel: 'Nome da Espécie:',
    notesLabel: 'Observações:',
    phLabel: 'pH:',
    tempLabel: 'Temperatura (°C):',
    placeholderSpecies: 'Ex: Alga Vermelha',
    placeholderNotes: 'Detalhes sobre o organismo...',
    submitting: 'Enviando...',
    location: 'Localização:',
    gettingLocation: 'Obtendo...',
  },

  // Mensagens de Alerta e Feedback
  alerts: {
    successTitle: 'Dados enviados!',
    successMessage: 'Sua contribuição foi registrada com sucesso.',
    errorTitle: 'Falha no envio',
    errorMessage: 'Ocorreu um erro ao enviar os dados. Tente novamente.',
    speciesRequired: 'O nome da espécie é obrigatório.',
    locationDenied: 'Permissão de localização negada.',
  },
};
