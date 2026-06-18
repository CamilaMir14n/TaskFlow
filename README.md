==================================================
TaskFlow - Gerenciador de Projetos e Tarefas
==================================================

Aplicação web desenvolvida como Projeto Semestral.

O TaskFlow é um gerenciador de produtividade que permite
organizar projetos, administrar tarefas (com checklists e
comentários) e registrar anotações rápidas.

A aplicação simula o consumo de um banco de dados relacional
através de um arquivo JavaScript exportado, mantendo as relações
entre as entidades do sistema.


==================================================
FUNCIONALIDADES
==================================================

- Criação e gerenciamento de projetos
- Organização de tarefas por projeto
- Checklists para acompanhamento de atividades
- Comentários vinculados às tarefas
- Registro de notas rápidas
- Navegação entre páginas utilizando SPA


==================================================
ESTRUTURA DE DADOS
==================================================

A aplicação utiliza um modelo relacional simulado composto por
4 tabelas principais:

1. PROJETOS
   - Tabela principal (entidade "pai")

2. TAREFAS
   - Associadas a um projeto específico

3. COMENTÁRIOS
   - Associados a uma tarefa

4. NOTAS
   - Associadas a um projeto


==================================================
TECNOLOGIAS UTILIZADAS
==================================================

React JS
- Biblioteca principal da aplicação
- Inicializado utilizando Vite

React Router Dom
- Gerenciamento de rotas e navegação SPA

Tailwind CSS
- Estilização da interface e responsividade

Lucide React
- Biblioteca de ícones SVG


==================================================
INSTALAÇÃO E EXECUÇÃO
==================================================

Para executar o projeto localmente:

1. Clone o repositório:

git clone https://github.com/CamilaMir14n/TaskFlow.git


2. Acesse a pasta do projeto:

cd TaskFlow


3. Instale as dependências:

npm install --legacy-peer-deps


4. Inicie o servidor de desenvolvimento:

npm run dev


5. Acesse no navegador:

http://localhost:5173