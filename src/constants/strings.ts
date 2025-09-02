/**
 * @fileoverview Constantes de strings para a aplicação.
 * Organizado por contexto para facilitar a gestão e a tradução futura.
 */

export const Strings = {
  // Strings globais usadas em múltiplos lugares.
  common: {
    loading: 'Carregando...',
    submit: 'Enviar',
    cancel: 'Cancelar',
    save: 'Salvar',
    edit: 'Editar',
    delete: 'Excluir',
    success: 'Sucesso',
    error: 'Erro',
    ok: 'OK',
    appName: 'Bioindicadores Suape',
  },

  // Rótulos para a navegação principal da aplicação.
  navigation: {
    map: 'Mapa',
    library: 'Biblioteca',
    reports: 'Relatórios',
    profile: 'Perfil',
  },

  // Strings específicas da tela de Mapa.
  mapScreen: {
    title: 'Mapa Interativo',
    addOccurrenceAlertTitle: 'Adicionar Ocorrência',
    addOccurrenceAlertMessage: 'Deseja adicionar uma nova ocorrência neste local?',
    addOccurrenceButton: 'Adicionar Ocorrência',
    locationPermissionTitle: 'Permissão de Localização',
    locationPermissionMessage: 'Precisamos de sua localização para adicionar uma ocorrência. Por favor, habilite nas configurações.',
  },

  // Strings específicas da tela da Biblioteca.
  libraryScreen: {
    title: 'Biblioteca de Bioindicadores',
    searchPlaceholder: 'Buscar espécie...',
    noResults: 'Nenhum resultado encontrado.',
    detailsTitle: 'Detalhes da Espécie',
  },

  // Strings específicas da tela de Relatórios.
  reportsScreen: {
    title: 'Relatórios e Análises',
    noData: 'Nenhum dado disponível para gerar relatórios.',
    generateReportButton: 'Gerar Relatório',
  },

  // Strings específicas do formulário de Contribuição.
  contributionForm: {
    title: 'Adicionar Nova Ocorrência',
    speciesLabel: 'Nome da Espécie:',
    notesLabel: 'Observações:',
    phLabel: 'pH:',
    tempLabel: 'Temperatura (°C):',
    speciesPlaceholder: 'Ex: Alga Vermelha',
    notesPlaceholder: 'Detalhes sobre o organismo...',
    submitting: 'Enviando...',
    locationLabel: 'Localização:',
    gettingLocation: 'Obtendo...',
    pickImage: 'Adicionar Foto',
  },
  
  // Strings específicas de autenticação (login e cadastro).
  auth: {
    loginTitle: 'Entrar',
    registerTitle: 'Criar Conta',
    emailLabel: 'E-mail:',
    emailPlaceholder: 'Digite seu e-mail',
    usernameLabel: 'Nome de Usuário:',
    usernamePlaceholder: 'Digite seu nome de usuário',
    passwordLabel: 'Senha:',
    passwordPlaceholder: 'Digite sua senha',
    loginButton: 'Login',
    registerButton: 'Cadastrar',
    noAccount: 'Não tem uma conta? Crie uma',
    hasAccount: 'Já tem uma conta? Faça login',
  },

  // Mensagens de alerta e feedback.
  alerts: {
    successTitle: 'Dados enviados!',
    successMessage: 'Sua contribuição foi registrada com sucesso.',
    errorTitle: 'Falha no envio',
    errorMessage: 'Ocorreu um erro ao enviar os dados. Tente novamente.',
    speciesRequired: 'O nome da espécie é obrigatório.',
    locationDenied: 'Permissão de localização negada. Não é possível enviar a contribuição.',
    imagePermissionDenied: 'Permissão para acessar a galeria de fotos negada.',
  },
};
