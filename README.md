BioSuape App - Frontend
Visão Geral

Este repositório contém o código-fonte do aplicativo móvel BioSuape, desenvolvido para dispositivos iOS e Android utilizando a framework React Native com Expo. O aplicativo funciona como a interface de usuário para o sistema de monitoramento ambiental, permitindo que cidadãos e pesquisadores contribuam com dados de ocorrências de bioindicadores.

O aplicativo se conecta ao backend (disponível aqui) para autenticação de usuários, submissão de dados e visualização de informações em tempo real.
Principais Funcionalidades

    Autenticação de Usuário: Telas de login e registro para gerenciar o acesso do usuário ao aplicativo.
    !(image_65ebf7.png)

    Mapa Interativo: Um mapa que exibe visualmente as ocorrências de bioindicadores, permitindo que os usuários explorem os dados por geolocalização.

    Visualização de Ocorrências: Permite que os usuários filtrem e visualizem as ocorrências por tipo de bioindicador (algas, moluscos, crustáceos, peixes, etc.).

    Submissão de Ocorrências: Um formulário intuitivo para registrar novas ocorrências, incluindo detalhes como tipo de bioindicador, localização, observações e dados como pH e temperatura.
    !(image_65ec18.png)

    Relatórios e Análises: Uma seção dedicada para gerar e visualizar relatórios a partir dos dados coletados, oferecendo uma visão analítica sobre a saúde ambiental da região.

    Gerenciamento de Perfil: Permite que os usuários editem suas informações e gerenciem suas sessões.

Instalação e Execução
Pré-requisitos

    Node.js (versão 18.x ou superior)

    Expo CLI instalado globalmente: npm install -g expo-cli

Passos

    Clone este repositório:

    git clone [https://github.com/pedromartss007/biosuape-frontend.git](https://github.com/pedromartss007/biosuape-frontend.git)
    cd biosuape-frontend

    Instale as dependências:

    npm install

    Crie um arquivo .env na raiz do projeto e configure a URL base do seu backend:

    EXPO_PUBLIC_API_URL=http://localhost:3000/api/v1

    (Ajuste o endereço IP se o backend estiver rodando em outro computador ou serviço de hospedagem.)

    Para iniciar o aplicativo em um emulador ou em seu dispositivo físico, execute:

    npm start

        Em seguida, escaneie o código QR com o aplicativo Expo Go (disponível na App Store ou Google Play).

Contribuindo

Contribuições são bem-vindas! Se você tiver alguma sugestão, melhoria ou encontrar algum problema, sinta-se à vontade para abrir uma issue ou um pull request.
Licença

Este projeto está sob a licença MIT License.