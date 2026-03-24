import { Request, Response } from 'express';
import { UserService } from '../../application/services/UserService';

export class UserController {
    private userService = new UserService();

    async listUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.listUsers();
            res.json(users);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async approveUser(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id as string;
            const success = await this.userService.approveUser(id);
            if (!success) {
                res.status(404).json({ message: "Usuário não encontrado." });
                return;
            }
            res.json({ message: "Usuário aprovado com sucesso." });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id as string;
            const success = await this.userService.deleteUser(id);
            if (!success) {
                res.status(404).json({ message: "Usuário não encontrado." });
                return;
            }
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
