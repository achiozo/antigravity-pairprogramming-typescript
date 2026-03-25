// Infraestrutura: Definicao de rotas com Express acoplam endpoints web especificos
// as respectivas operacoes das controllers.
import { Router } from 'express';
import { ProdutoController } from '../controllers/ProdutoController';
import { ProdutoRepository } from '../repositories/ProdutoRepository';
import { ProdutoService } from '../../application/services/ProdutoService';

const router = Router();
const repository = new ProdutoRepository();
const service = new ProdutoService(repository);
const controller = new ProdutoController(service);

// Binding das rotas assegurando que o 'this' da controller mantenha o contexto via arrow functions.
router.get('/', (req, res) => controller.listarTodos(req, res));
router.get('/:id', (req, res) => controller.buscarPorId(req, res));
router.post('/', (req, res) => controller.criar(req, res));
router.put('/:id', (req, res) => controller.atualizar(req, res));
router.delete('/:id', (req, res) => controller.excluir(req, res));

export default router;
