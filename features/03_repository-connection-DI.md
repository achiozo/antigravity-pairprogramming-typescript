# Refatoração: Injeção de Conexão no Repository (Pasta /api)

O objetivo é remover a importação direta do `pool` nos Repositories e injetá-lo via construtor para desacoplar a infraestrutura de banco de dados.

## 1. Escopo de Atuação
- **Arquivos**: Todos os arquivos dentro de `src/domains/*/infrastructure/repositories/`.
- **Dependência**: O objeto de conexão (`pool`) do `mysql2/promise`.

## 2. Padrões de Código no Repository
- Remova o `import pool from ...` do cabeçalho do arquivo.
- Adicione o tipo `Pool` (vinda de `mysql2/promise`) no construtor.
- Declare como: `constructor(private readonly db: Pool) {}`.
- Substitua todas as chamadas internas de `pool.query` ou `pool.execute` para `this.db.query` ou `this.db.execute`.

## 3. Atualização do Composition Root (Routes)
- No arquivo de rotas (ex: `authRoutes.ts` e `produtoRoutes.ts`):
    1. Importe o `pool` do arquivo `connection.ts`.
    2. Ao instanciar o Repository (ex: `new UserRepository(pool)`), passe a instância do pool como argumento.

## 4. Restrições
- Não altere o arquivo `connection.ts`.
- Certifique-se de que o tipo `Pool` está corretamente importado nos Repositories para evitar erros de tipagem.
- Não altere a lógica das queries SQL, apenas a origem da chamada do objeto de banco.
