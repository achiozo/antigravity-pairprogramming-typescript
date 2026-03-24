import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../../../../infrastructure/security/AuthMiddleware';

const router = Router();
const controller = new UserController();

router.use(authMiddleware);

router.get('/', (req, res) => controller.listUsers(req, res));
router.patch('/:id/approve', (req, res) => controller.approveUser(req, res));
router.delete('/:id', (req, res) => controller.deleteUser(req, res));

export default router;
