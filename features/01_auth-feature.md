# Feature: Autenticação e Gestão de Usuários (JWT + BCrypt)

## 1. Objetivo
Restringir o acesso ao projeto apenas a usuários autenticados e aprovados, implementando um fluxo de login seguro e uma área de administração de usuários.

## 2. Modelagem de Dados (Banco de Dados)
O Antigravity deve gerar o script/migration para a tabela `users`:
- `id`: UUID (Primary Key)
- `name`: VARCHAR(255) NOT NULL
- `email`: VARCHAR(255) UNIQUE NOT NULL
- `password_hash`: VARCHAR(255) NOT NULL
- `created_at`: TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
- `updated_at`: TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
- `verified_at`: TIMESTAMP WITH TIME ZONE DEFAULT NULL (Indica se o usuário está ativo/aprovado)

## 3. Segurança e Criptografia
- **Hash de Senha:** Utilizar obrigatoriamente **BCrypt** com salt de 10.
- **Autenticação:** Utilizar **JWT (JSON Web Token)**.
- **Expiração do Token:** O token deve expirar em exatamente **8 horas**.
- **Transporte:** O token deve ser enviado via Header `Authorization: Bearer <token>`.

## 4. Fluxos Funcionais
### Autenticação
1. **Registro (Sign Up):** POST `/auth/register`. Cria o usuário com `verified_at` como NULL.
2. **Login (Sign In):** POST `/auth/login`. 
   - Deve validar e-mail e senha.
   - **Regra Crítica:** Bloquear login se `verified_at` for NULL.
   - Retornar JWT de 8h em caso de sucesso.
3. **Middleware:** Validar o JWT em todas as rotas protegidas. Retornar 401 se inválido/expirado.
4. **Logout:** Remover o token no lado do cliente.

### Gestão de Usuários (CRUD Administrativo)
Criar uma área protegida para listar e gerenciar usuários:
1. **Listagem:** GET `/users` - Exibir todos os usuários cadastrados.
2. **Aprovação:** PATCH `/users/:id/approve` - Botão "Aprovar" que preenche `verified_at` com o TIMESTAMP atual.
3. **Exclusão:** DELETE `/users/:id` - Remover um usuário do sistema.

## 5. Regras de Negócio
- Unicidade de e-mail obrigatória.
- Usuários não verificados recebem erro específico no login (ex: "Conta aguardando aprovação").
- Apenas usuários com `verified_at` preenchido podem gerar tokens válidos.

## 6. Interface Visual (Front-end)

### Tela de Login/Registro
- Campos claros para E-mail e Senha.
- Feedback visual de erro (ex: "Senha incorreta" ou "Usuário aguardando aprovação").

### Dashboard de Gestão de Usuários (Tabela)
- **Colunas:** Nome, E-mail, Data de Cadastro, Status (Badge).
- **Badge de Status:** 
  - Verde "Verificado" (se `verified_at` preenchido).
  - Amarelo "Pendente" (se `verified_at` nulo).
- **Ações (Botões):**
  - Botão **"Aprovar"** (Aparece apenas para usuários com status "Pendente").
  - Botão **"Excluir"** (Cor vermelha, com confirmação antes de deletar).
- **Estilização:** Layout responsivo e simples, já que usamos o PicoCSS com o VueJS 3
