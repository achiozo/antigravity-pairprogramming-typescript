import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const controller = new UserController();

router.get('/', (req, res) => controller.listUsers(req, res));
router.patch('/:id/approve', (req, res) => controller.approveUser(req, res));
router.delete('/:id', (req, res) => controller.deleteUser(req, res));

export default router;
