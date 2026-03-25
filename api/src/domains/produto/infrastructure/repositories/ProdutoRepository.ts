// Arquitetura Hexagonal: O Repository pertence a 'infrastructure'. Ele implementa as operacoes
// concretas de persistencia, traduzindo as requisicoes do dominio para a linguagem do banco (SQL).
import { Pool } from 'mysql2/promise';
import { Produto } from '../../core/models/Produto';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export class ProdutoRepository {
    constructor(private readonly db: Pool) { }
    async findAll(): Promise<Produto[]> {
        // Typescript: O RowDataPacket[] eh um tipo especifico do mysql2 usado para indicar
        // que o retorno sera um array de dados de linhas (registro do banco).
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM produtos');
        return rows as Produto[];
    }

    async findById(id: number): Promise<Produto | null> {
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM produtos WHERE id = ?', [id]);
        if (rows.length === 0) return null;
        return rows[0] as Produto;
    }

    async create(produto: Produto): Promise<Produto> {
        const now = Math.floor(Date.now() / 1000); // Unix timestamp
        const [result] = await this.db.query<ResultSetHeader>(
            'INSERT INTO produtos (nome, descricao, preco, estoque, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
            [produto.nome, produto.descricao, produto.preco, produto.estoque, now, now]
        );
        return { ...produto, id: result.insertId, created_at: now, updated_at: now };
    }

    async update(id: number, produto: Partial<Produto>): Promise<Produto | null> {
        const now = Math.floor(Date.now() / 1000);
        // Typescript: O Partial<Produto> permitira receber apenas as propriedades que serao alteradas.
        const [result] = await this.db.query<ResultSetHeader>(
            'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, estoque = ?, updated_at = ? WHERE id = ?',
            [
                produto.nome,
                produto.descricao,
                produto.preco,
                produto.estoque,
                now,
                id
            ]
        );

        if (result.affectedRows === 0) return null;
        return this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await this.db.query<ResultSetHeader>('DELETE FROM produtos WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }

    async countAll(): Promise<number> {
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT COUNT(*) as count FROM produtos');
        return rows[0].count;
    }
}
