// Arquitetura Hexagonal: A Controller (infrastructure layer) atua como adaptador primario (driver).
// Ela interpreta requests da Web (Node/Express), despacha para o Service e empacota as repostas HTTP.
import { Request, Response } from 'express';
import { ProdutoService } from '../../application/services/ProdutoService';

export class ProdutoController {
    constructor(private readonly service: ProdutoService) {}

    // Typescript: Usando as tipagens Request e Response fornecidas nativamente pelo pacote @types/express.
    async listarTodos(req: Request, res: Response): Promise<void> {
        try {
            const produtos = await this.service.listarTodos();
            res.json(produtos);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async buscarPorId(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id as string);
            const produto = await this.service.buscarPorId(id);
            if (!produto) {
                res.status(404).json({ message: "Produto nao encontrado." });
                return;
            }
            res.json(produto);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async criar(req: Request, res: Response): Promise<void> {
        try {
            const produtoNovo = req.body;
            const produto = await this.service.criar(produtoNovo);
            res.status(201).json(produto);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id as string);
            const dadosAtualizacao = req.body;
            const produto = await this.service.atualizar(id, dadosAtualizacao);
            
            if (!produto) {
                res.status(404).json({ message: "Produto nao encontrado para atualizacao." });
                return;
            }
            res.json(produto);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async excluir(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id as string);
            const sucesso = await this.service.excluir(id);
            if (!sucesso) {
                res.status(404).json({ message: "Produto nao encontrado para exclusao." });
                return;
            }
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
