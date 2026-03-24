# Projeto: CRUD de Produtos (Fullstack)

Este é um projeto fullstack gerenciando um CRUD de produtos com um backend utilizando Node.js e Arquitetura Hexagonal, e um frontend utilizando Vue 3 com Vite e Pico CSS.

## Estrutura do Projeto

- `/api`: Backend (Node.js + Express + TypeScript)
- `/public`: Frontend (Vue 3 + Vite + TypeScript)

## Como Rodar

### Pré-requisitos
- Node.js
- MySQL rodando com o banco `meu-pedido` criado (tabela `produtos`).
- Credenciais padrão no código: root:root @ localhost:3306.

### Backend (`/api`)
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

## Features Atuais (CRUD)
- Listagem de Produtos
- Cadastro de Novo Produto
- Edição de Produto Existente
- Exclusão de Produto

## Features Futuras
- Filtros Avançados
- Login / Autenticação
- Relatórios

---
*Projeto desenvolvido para fins didáticos focando em Vue 3, TypeScript e Arquitetura Hexagonal no Node.js.*