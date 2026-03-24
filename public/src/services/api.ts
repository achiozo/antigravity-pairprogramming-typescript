export const API_URL = 'http://localhost:3000/produtos';

export interface Produto {
    id?: number;
    nome: string;
    descricao: string;
    preco: number;
    estoque: number;
    created_at?: number;
    updated_at?: number;
}

export const api = {
    async listarTodos(): Promise<Produto[]> {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Erro ao buscar produtos');
        return res.json();
    },
    async buscarPorId(id: number): Promise<Produto> {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error('Erro ao buscar produto');
        return res.json();
    },
    async criar(produto: Produto): Promise<Produto> {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        });
        if (!res.ok) throw new Error('Erro ao criar produto');
        return res.json();
    },
    async atualizar(id: number, produto: Partial<Produto>): Promise<Produto> {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        });
        if (!res.ok) throw new Error('Erro ao atualizar produto');
        return res.json();
    },
    async excluir(id: number): Promise<void> {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Erro ao excluir produto');
    }
};
