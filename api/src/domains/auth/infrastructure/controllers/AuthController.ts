import { Request, Response } from 'express';
import { AuthService } from '../../application/services/AuthService';

export class AuthController {
    constructor(private readonly authService: AuthService) {}

    async register(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password } = req.body;
            const user = await this.authService.register({ name, email, password_hash: password });
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const result = await this.authService.login(email, password);
            res.json(result);
        } catch (error: any) {
            const status = error.message === 'Account pending approval' ? 403 : 401;
            res.status(status).json({ error: error.message });
        }
    }
}
