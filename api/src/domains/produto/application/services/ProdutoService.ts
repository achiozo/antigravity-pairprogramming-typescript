// Arquitetura Hexagonal: O Service (usecase/application layer) contem a regra de negocios pura.
// Ele orquestra o dominio, recebe chamadas da Controller, faz validacoes e chama o Repository associado
// sem conhecer os detalhes (como se eh MySQL ou outro banco).
import { Produto } from '../../core/models/Produto';
import { ProdutoRepository } from '../../infrastructure/repositories/ProdutoRepository';

export class ProdutoService {
    constructor(private readonly repository: ProdutoRepository) {}

    async listarTodos(): Promise<Produto[]> {
        return this.repository.findAll();
    }

    async buscarPorId(id: number): Promise<Produto | null> {
        return this.repository.findById(id);
    }

    async criar(produto: Produto): Promise<Produto> {
        // Regras de validacoes de negocios ficariam aqui antes de salvar
        if (!produto.nome || produto.preco <= 0) {
            throw new Error("Dados invalidos para o produto.");
        }
        return this.repository.create(produto);
    }

    async atualizar(id: number, produto: Partial<Produto>): Promise<Produto | null> {
        return this.repository.update(id, produto);
    }

    async excluir(id: number): Promise<boolean> {
        return this.repository.delete(id);
    }
}
