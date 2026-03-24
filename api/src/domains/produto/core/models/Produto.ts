// Typescript/Hexagonal Architecture: O Model e o 'Core' (ou Entity do dominio) 
// representam o modelo de negocios independente de frameworks externos ou bases de dados especificas.
export interface Produto {
    id?: number;
    nome: string;
    descricao: string;
    preco: number;
    estoque: number;
    created_at?: number; // Unix timestamp
    updated_at?: number; // Unix timestamp
}
