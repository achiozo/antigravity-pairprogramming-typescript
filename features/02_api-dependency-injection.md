# Refatoração para Injeção de Dependência (Pasta /api)

Atue exclusivamente nos arquivos contidos na pasta `api/` para implementar a Injeção de Dependência (DI) via construtor, seguindo as diretrizes abaixo:

## 1. Escopo de Atuação
- **Service**: Deve receber as dependências no construtor.
- **Controller**: Deve receber dependências no construtor.
- **Routes**: Deve instanciar as dependências de baixo para cima e passá-las nos construtores.

## 2. Padrões de Código
- Remova a inicialização direta de atributos (ex: `private repo = new Repo()`).
- Declare os atributos como `private readonly` dentro dos parâmetros do `constructor`.
- Tipagem obrigatória: Utilize as classes/interfaces correspondentes para os parâmetros.

## 3. Fluxo de Instanciação em `authRoutes.ts`
1. Instancie o `UserRepository` e `PasswordHasher`.
2. Instancie o `AuthService` passando as instâncias anteriores.
3. Instancie o `AuthController` passando o `AuthService`.
4. Garanta que as rotas chamem os métodos do controller mantendo o contexto do `this` (ex: `(req, res) => controller.register(req, res)`).

## 4. Restrições
- Não utilize bibliotecas externas de DI (como Inversify ou Reflect-metadata).
- Não altere a lógica interna dos métodos, apenas a forma como as dependências são acessadas (via `this`).
- Não altere arquivos fora da pasta `api/`.
