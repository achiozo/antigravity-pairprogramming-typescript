import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { User } from '../../core/models/User';

export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async listUsers(): Promise<Omit<User, 'password_hash'>[]> {
        return this.userRepository.findAll();
    }

    async approveUser(id: string): Promise<boolean> {
        return this.userRepository.approve(id);
    }

    async deleteUser(id: string): Promise<boolean> {
        return this.userRepository.delete(id);
    }
}
