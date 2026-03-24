# Instruções do Projeto: CRUD de Produtos (Fullstack)

## 1. Visão Geral
Este é um projeto de aprendizado composto por um Frontend (Vue 3) e um Backend (Node.js), ambos utilizando TypeScript. O objetivo é gerenciar um CRUD de produtos integrado a um banco MySQL existente.

## 2. Tecnologias e Padrões
- **Frontend**: Vue 3 (Composition API), TypeScript, Pico CSS.
- **Backend**: Node.js, TypeScript, Arquitetura Hexagonal.
- **Banco de Dados**: MySQL (Tabela `produtos` já existente).

## 3. Configurações de Conexão (DB)
- **Host**: localhost | **Porta**: 3306
- **User**: root | **Password**: root
- **Database**: meu-pedido

## 4. Estrutura do Backend (Arquitetura Hexagonal)
O fluxo deve obrigatoriamente seguir esta ordem:
1. **Route**: Define o endpoint e chama a Controller.
2. **Controller**: Recebe a requisição, valida os dados via **DTO**, e chama o Service.
3. **Service**: Contém a regra de negócio e utiliza o Repository injetado.
4. **Repository**: Gerencia o SQL, utiliza os nomes das colunas e retorna **Models**.
5. **Model**: Representação da entidade `Produto`.

### Esquema da Tabela `produtos`:
- `id` (INT, PK, AI)
- `nome` (VARCHAR 255)
- `descricao` (TEXT)
- `preco` (DECIMAL 10,2)
- `estoque` (INT)
- `created_at` / `updated_at` (INT - Unix Timestamp)

## 5. Estrutura do Frontend
- Separado da pasta do backend.
- Uso de **Pico CSS** para estilização semântica e minimalista.
- Componentização simples para: Listagem, Cadastro e Edição.

## 6. Tarefas Iniciais para o Antigravity
1. Criar a estrutura de pastas: `/api` e `/public`.
2. No `/api`: inicializar projeto TS, configurar `mysql2` e implementar as camadas para o domínio `Produto`.
3. No `/public`: inicializar projeto Vue 3 + TS + Vite e configurar o consumo da API.
4. Gerar um `README.md` na raiz com:
   - Instruções de `npm install` e `npm run dev`.
   - Lista de features atuais (CRUD).
   - Lista de features futuras (Filtros, Login, Relatórios).

---
**Atenção Agente**: Mantenha o código o mais legível e simples possível, priorizando a didática da arquitetura hexagonal, do Typescript e do VueJS. Deixe claro quando um recurso for exclusivo do VueJS, do Typescript ou da arquitetura hexagonal.
