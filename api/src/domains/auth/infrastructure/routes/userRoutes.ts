import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserRepository } from '../repositories/UserRepository';
import { UserService } from '../../application/services/UserService';

const router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const controller = new UserController(userService);

router.get('/', (req, res) => controller.listUsers(req, res));
router.patch('/:id/approve', (req, res) => controller.approveUser(req, res));
router.delete('/:id', (req, res) => controller.deleteUser(req, res));

export default router;
