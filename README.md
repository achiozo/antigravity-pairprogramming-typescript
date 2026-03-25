# FullStack em Pair Programming com o Antigravity (Gemini 3.1 Pro)

Este é um projeto fullstack gerenciador de pedidos com um backend utilizando Node.js e Arquitetura Hexagonal, e um frontend utilizando Vue 3 com Vite e Pico CSS.

## Estrutura do Projeto

- `/api`: Backend (Node.js + Express + TypeScript)
- `/public`: Frontend (Vue 3 + Vite + TypeScript + Pico CSS)

## Como Rodar

### Pré-requisitos
- Node.js
- MySQL rodando com o banco `meu-pedido` criado através das migrations incluídas para de produtos e usuários.

### Backend (`/api`)
Antes de iniciar, certifique-se de configurar o arquivo `.env` com suas portas, credenciais (`DB_HOST, DB_USER...`) e chaves secretas do JWT. Em seguida:
```sh
cd api
npm install
npm run dev
```

### Frontend (`/public`)
```sh
cd public
npm install
npm run dev
```

## Features Atuais
### 📋 Gestão de Produtos
- Listagem, Cadastro, Edição e Exclusão

### Gestão de Usuários
- Listagem, Exclusão
- Aprovação de usuário após registro

### 🔐 Segurança
- Login / Registro de novos usuários
- Rotas protegidas exigindo autenticação com token.

### 🧩 Core e Arquitetura Hexagonal 
- Modelos desacoplados por Design de Injeção de Dependências em Construtores (DI / IoC) puros sem frameworks.
- Roteadores instanciando as injeções nativas até camadas base de banco (`Pool`).
- Integração `dotenv` nativa e Interceptador HTTP na API Frontend gerenciando os tokens de cabeçalho.

## Features Futuras
- Filtros Avançados
- Relatórios
- Gestão de Categorias de Produtos
- Gestão de Tabelas de Preços de Produtos
- Gestão de Clientes
- Gestão de Pedidos
- Gestão de Fornecedores
- Gestão de Estoque
- Gestão de Usuários, Perfis e Permissões

---
*Projeto desenvolvido para fins didáticos focando em Vue 3, TypeScript e Arquitetura Hexagonal no Node.js.*