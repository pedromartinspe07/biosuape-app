// src/constants/strings.ts

/**
 * @fileoverview Constantes de strings para a aplicação.
 * Adaptado para um tom de voz amigável, motivacional e focado na experiência do usuário.
 */

export const Strings = {
  // Strings globais para o app
  common: {
    loading: 'Carregando...',
    submit: 'Compartilhar',
    cancel: 'Cancelar',
    save: 'Salvar',
    edit: 'Editar',
    delete: 'Excluir',
    success: 'Sucesso!',
    error: 'Ops, algo deu errado.',
    ok: 'Entendido',
    appName: 'Suape Conecta',
  },

  // Rótulos da navegação principal
  navigation: {
    map: 'Mapa',
    library: 'Biblioteca',
    reports: 'Relatórios',
    profile: 'Perfil',
  },

  // Conteúdo para a tela de Mapa
  mapScreen: {
    title: 'Seu Mapa Interativo',
    addOccurrenceAlertTitle: 'Compartilhar Descoberta',
    addOccurrenceAlertMessage: 'Quer registrar uma nova ocorrência neste local?',
    addOccurrenceButton: 'Registrar Ocorrência',
    locationPermissionTitle: 'Localização Necessária',
    locationPermissionMessage: 'Para registrar sua descoberta, precisamos de acesso à sua localização. Ative nas configurações do dispositivo.',
  },

  // Conteúdo para a tela da Biblioteca
  libraryScreen: {
    title: 'Guia de Bioindicadores',
    searchPlaceholder: 'Buscar espécies...',
    noResults: 'Não encontramos nenhum bioindicador com esse nome.',
    detailsTitle: 'Detalhes da Espécie',
  },

  // Conteúdo para a tela de Relatórios
  reportsScreen: {
    title: 'Relatórios e Impactos',
    noData: 'Ainda não há dados suficientes para gerar um relatório.',
    generateReportButton: 'Gerar Relatório',
  },

  // Conteúdo para o formulário de Contribuição
  contributionForm: {
    title: 'Nova Descoberta',
    speciesLabel: 'Qual espécie você encontrou?',
    notesLabel: 'Suas observações:',
    phLabel: 'pH da água:',
    tempLabel: 'Temperatura da água (°C):',
    speciesPlaceholder: 'Ex: Alga Vermelha',
    notesPlaceholder: 'Detalhes sobre a espécie e o ambiente...',
    submitting: 'Registrando sua descoberta...',
    locationLabel: 'Localização atual:',
    gettingLocation: 'Obtendo sua localização...',
    pickImage: 'Adicionar Foto',
  },

  // Conteúdo para as telas de Autenticação
  auth: {
    loginTitle: 'Bem-vindo de volta!',
    registerTitle: 'Junte-se a nós!',
    emailLabel: 'Seu e-mail:',
    emailPlaceholder: 'exemplo@email.com',
    usernameLabel: 'Seu nome de usuário:',
    usernamePlaceholder: 'Seu nome para o app',
    passwordLabel: 'Sua senha:',
    passwordPlaceholder: 'Crie uma senha segura',
    loginButton: 'Entrar',
    registerButton: 'Criar Minha Conta',
    noAccount: 'Não tem uma conta? Cadastre-se agora',
    hasAccount: 'Já tem uma conta? Fazer login',
  },

  // Mensagens de alerta e feedback
  alerts: {
    successTitle: 'Descoberta Registrada!',
    successMessage: 'Obrigado por sua contribuição! Você está ajudando a ciência.',
    errorTitle: 'Falha ao Registrar',
    errorMessage: 'Não conseguimos enviar sua contribuição. Verifique sua conexão e tente novamente.',
    speciesRequired: 'Por favor, selecione ou digite a espécie.',
    locationDenied: 'Não foi possível obter sua localização. Por favor, habilite o GPS.',
    imagePermissionDenied: 'Permissão para acessar a galeria negada.',
  },
};