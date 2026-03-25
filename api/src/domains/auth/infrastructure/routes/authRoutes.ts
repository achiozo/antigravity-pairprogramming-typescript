import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { UserRepository } from '../repositories/UserRepository';
import { PasswordHasher } from '../../../../infrastructure/security/PasswordHasher';
import { AuthService } from '../../application/services/AuthService';
import pool from '../../../../infrastructure/database/connection';

const router = Router();
const userRepository = new UserRepository(pool);
const passwordHasher = new PasswordHasher();
const authService = new AuthService(userRepository, passwordHasher);
const controller = new AuthController(authService);

router.post('/register', (req, res) => controller.register(req, res));
router.post('/login', (req, res) => controller.login(req, res));

export default router;
