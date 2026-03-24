export const API_URL = 'http://localhost:3000';

export interface Produto {
    id?: number;
    nome: string;
    descricao: string;
    preco: number;
    estoque: number;
}

export interface User {
    id?: string;
    name: string;
    email: string;
    verified_at?: string | null;
    created_at?: string;
}

let authToken: string | null = localStorage.getItem('token');

export const setAuthToken = (token: string | null) => {
    authToken = token;
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
};

export const getAuthToken = () => authToken;

const getHeaders = () => {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
    return headers;
};

const handleResponse = async (res: Response) => {
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.error || error.message || 'Erro na requisição');
    }
    if (res.status === 204) return;
    return res.json();
};

export const api = {
    // Auth
    async login(email: string, passwordPlain: string) {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password: passwordPlain })
        });
        return handleResponse(res);
    },
    async register(name: string, email: string, passwordPlain: string) {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password: passwordPlain })
        });
        return handleResponse(res);
    },

    // Users (Admin)
    async getUsers(): Promise<User[]> {
        const res = await fetch(`${API_URL}/users`, { headers: getHeaders() });
        return handleResponse(res);
    },
    async approveUser(id: string) {
        const res = await fetch(`${API_URL}/users/${id}/approve`, { method: 'PATCH', headers: getHeaders() });
        return handleResponse(res);
    },
    async deleteUser(id: string) {
        const res = await fetch(`${API_URL}/users/${id}`, { method: 'DELETE', headers: getHeaders() });
        return handleResponse(res);
    },

    // Produtos
    async listarTodos(): Promise<Produto[]> {
        const res = await fetch(`${API_URL}/produtos`, { headers: getHeaders() });
        return handleResponse(res);
    },
    async buscarPorId(id: number): Promise<Produto> {
        const res = await fetch(`${API_URL}/produtos/${id}`, { headers: getHeaders() });
        return handleResponse(res);
    },
    async criar(produto: Produto): Promise<Produto> {
        const res = await fetch(`${API_URL}/produtos`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(produto)
        });
        return handleResponse(res);
    },
    async atualizar(id: number, produto: Partial<Produto>): Promise<Produto> {
        const res = await fetch(`${API_URL}/produtos/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(produto)
        });
        return handleResponse(res);
    },
    async excluir(id: number): Promise<void> {
        const res = await fetch(`${API_URL}/produtos/${id}`, { method: 'DELETE', headers: getHeaders() });
        return handleResponse(res);
    }
};
