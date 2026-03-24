// Infraestrutura: Definicao de rotas com Express acoplam endpoints web especificos
// as respectivas operacoes das controllers.
import { Router } from 'express';
import { ProdutoController } from '../controllers/ProdutoController';

const router = Router();
const controller = new ProdutoController();

// Binding das rotas assegurando que o 'this' da controller mantenha o contexto via arrow functions.
router.get('/', (req, res) => controller.listarTodos(req, res));
router.get('/:id', (req, res) => controller.buscarPorId(req, res));
router.post('/', (req, res) => controller.criar(req, res));
router.put('/:id', (req, res) => controller.atualizar(req, res));
router.delete('/:id', (req, res) => controller.excluir(req, res));

export default router;
