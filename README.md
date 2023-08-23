## Lista de Tarefas Avançada
- [Acessar Site](https://todo-rosa.meteorapp.com/)


### Descrição
Esta é uma lista de tarefas avançada para criar uma aplicação de lista de afazeres com recursos adicionais, como autenticação de usuários, roteamento, design usando Material-UI e muito mais.

### Instruções
Siga as etapas abaixo para completar as tarefas propostas:

### 1. Autenticação e Acesso do Usuário
Crie uma aplicação Meteor que só seja acessível por usuários logados. Implemente um sistema de login e senha.

Pacotes a serem utilizados:
- [Meteor Accounts](https://guide.meteor.com/accounts.html)

### 2. Rotas com React Router
Adicione rotas à sua aplicação usando o pacote React Router. O sistema deve ter uma tela de boas-vindas e pelo menos uma tela que liste as tarefas.

Pacotes a serem utilizados:
- [React Router](https://reacttraining.com/react-router/)

### 3. Lista de Tarefas Simples com Material-UI
Implemente uma lista de tarefas simples usando o pacote Material-UI. A lista de tarefas deve ser exibida usando o componente List, mostrando um ícone, o nome da tarefa no texto principal e o usuário que criou a tarefa no texto secundário. Todos os outros componentes de interação com o usuário também devem ser do pacote Material-UI. Consulte a seção de Componentes na documentação para detalhes sobre os componentes.

Pacotes a serem utilizados:
- [Material-UI](https://material-ui.com/)

### 4. Detalhes e Edição de Tarefas
Crie duas telas para a Lista de Tarefas. A primeira tela deve exibir uma lista de tarefas com botões de ícone para remover e editar tarefas. A edição de uma tarefa deve levar a outra rota onde os usuários podem editar as informações da tarefa e salvar as alterações, retornando à tela anterior. Essa tela terá dois estados: Visualização e Edição. Quando acessada, estará no estado de Visualização. Ao clicar em Editar, mudará para o estado de Edição, permitindo alterações nas informações da tarefa. As tarefas devem incluir: Nome, Descrição, Status, Data e o usuário que a criou. Todos os componentes de interação do usuário devem ser do pacote Material-UI. Os status possíveis são: Criada, Em Progresso e Concluída. A tela de Visualização deve ter botões para mudar o status das tarefas e esses botões devem estar desabilitados quando as transições não forem possíveis.

### 5. Gerenciamento de Tarefas Específicas do Usuário
Modifique o sistema para permitir apenas que o criador da tarefa a edite ou a exclua, mas que todos possam visualizá-la.

### 6. Tarefas Pessoais vs Públicas
Permita que as tarefas sejam marcadas como pessoais. Se uma tarefa for marcada como pessoal, apenas o criador da tarefa poderá visualizá-la. Implemente essa restrição de visibilidade através do sistema de publicações do Meteor.

### 7. Gerenciamento do Perfil do Usuário
Implemente uma seção de Perfil do Usuário para usuários logados. Os usuários devem ter as seguintes informações usando componentes do Material-UI: Nome, E-mail, Data de Nascimento, Gênero (usando combobox/selects), Empresa e uma Foto (salva no banco de dados usando base64).

### 8. Navegação com Drawer
Usando o Material-UI, crie um Drawer com dois links: um para acessar a lista de tarefas e outro para acessar os dados do usuário logado. Os dados do usuário (foto, nome e e-mail) devem ser visíveis no topo do Drawer.

### 9. Painel de Controle para Tarefas
Modifique a tela de boas-vindas exibida após o login para mostrar um painel de controle de tarefas com informações como Total de Tarefas Criadas, Total de Tarefas em Progresso, Total de Tarefas Concluídas e uma ação para acessar a lista completa de tarefas.

### 10. Estilização CSS e Componentes
Tarefa extra (opcional): Refine o design visual da aplicação e os componentes usando CSS. Considere utilizar flexbox para o design de layout. (Opcional)

### 11. Exibição de Tarefas Concluídas
Tarefa extra (opcional): Adicione uma caixa de seleção à lista de tarefas para exibir tarefas concluídas. Quando desmarcada, apenas as tarefas com os status "Criada" e "Em Progresso" devem ser mostradas. Use ReactiveVar do Meteor e realize a filtragem no lado do servidor usando publicações. (Opcional)

### 12. Pesquisa de Tarefas
Tarefa extra (opcional): Implemente um campo de pesquisa para filtrar tarefas com base em seus nomes. A pesquisa deve retornar tanto tarefas pessoais do usuário logado quanto tarefas públicas. Realize essa filtragem no lado do servidor usando publicações do Meteor. (Opcional)

### 13. Paginação
Tarefa extra (opcional): Adicione paginação às listas de tarefas, limitando cada página a um máximo de 4 tarefas. Use SKIP e LIMIT nas consultas do MongoDB para a paginação. Realize essa paginação no lado do servidor usando publicações do Meteor. (Opcional)

## Run
Para executar o projeto, é necessário tornar as variáveis de config visíveis ao meteor, para isso execute:

    ```
        meteor --settings settings.json
    ```