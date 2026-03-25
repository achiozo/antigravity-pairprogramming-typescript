# Refatoração: Segurança, Variáveis de Ambiente e Injeção de Token Provider

O objetivo é centralizar as configurações de segurança, implementar a inversão de dependência para tokens e remover strings fixas (hardcoded) do código.

## 1. Configuração de Ambiente (.env)
- **Ação**: Crie o arquivo `.env` na raiz de `api/` com as chaves: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`, e `JWT_EXPIRES_IN`.
- **Ação**: Refatore `infrastructure/database/connection.ts` para carregar `dotenv.config()` e ler as credenciais de `process.env`.

## 2. Abstração de Token (Core & Security)
- **Interface**: Crie `ITokenProvider.ts` em `src/domains/auth/core/` com os métodos:
    - `create(payload: object): string`
    - `verify(token: string): string`
    - `decode(token: string): any`
    - `isValid(token: string): boolean`
- **Implementação**: Crie `JwtProvider.ts` em `src/infrastructure/security/` implementando `ITokenProvider`. 
    - O construtor deve receber `secret` e `expiresIn` vindos do `process.env`.
    - Utilize a biblioteca `jsonwebtoken` já instalada.

## 3. Refatoração do AuthMiddleware (Factory Function)
- **Ação**: Transforme o `AuthMiddleware.ts` em uma **Factory Function** que recebe `tokenProvider: ITokenProvider`.
- **Lógica**: Remova qualquer importação de `process.env` ou constantes `JWT_SECRET` de dentro do middleware. Use `tokenProvider.verify()` para validar o token vindo do header.

## 4. Injeção no AuthService
- **Ação**: No `AuthService.ts`, remova as constantes de JWT.
- **Construtor**: Adicione `private readonly tokenProvider: ITokenProvider` ao construtor.
- **Lógica**: Substitua chamadas de `jwt.sign` por `this.tokenProvider.create()`.

## 5. Atualização do Composition Root (authRoutes.ts)
- **Instanciação**:
    1. Instancie o `JwtProvider` com as variáveis de `process.env`.
    2. Instancie o `AuthService` passando o repository e o token provider.
    3. Ao definir rotas protegidas, inicialize o middleware: `const auth = authMiddleware(jwtProvider)`.

## 6. Restrições
- Proibido manter `secret-key-fallback` ou valores fixos no código.
- Mantenha a tipagem `AuthRequest` para estender o `Request` do Express.
- Garanta que todos os domínios (Auth e Produto) usem a mesma instância de banco e segurança quando necessário.
