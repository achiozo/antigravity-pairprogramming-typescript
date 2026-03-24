import { User } from '../../core/models/User';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { PasswordHasher } from '../../../../infrastructure/security/PasswordHasher';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key-fallback';
const JWT_EXPIRES_IN = '8h';

export class AuthService {
    private userRepository = new UserRepository();
    private passwordHasher = new PasswordHasher();

    async register(data: Partial<User>): Promise<Omit<User, 'password_hash'>> {
        if (!data.name || !data.email || !data.password_hash) {
            throw new Error('Name, email, and password are required');
        }

        const exactEmail = data.email.toLowerCase();
        const existing = await this.userRepository.findByEmail(exactEmail);
        if (existing) {
            throw new Error('Email is already registered');
        }

        const hash = await this.passwordHasher.hash(data.password_hash);

        const newUser: User = {
            id: uuidv4(),
            name: data.name,
            email: exactEmail,
            password_hash: hash,
        };

        const created = await this.userRepository.create(newUser);
        const { password_hash, ...userWithoutPassword } = created;
        return userWithoutPassword;
    }

    async login(email: string, passwordPlain: string): Promise<{ token: string, user: Omit<User, 'password_hash'> }> {
        const user = await this.userRepository.findByEmail(email.toLowerCase());
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isMatch = await this.passwordHasher.compare(passwordPlain, user.password_hash);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        if (!user.verified_at) {
            throw new Error('Account pending approval');
        }

        const payload = { userId: user.id, email: user.email };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        const { password_hash, ...userWithoutPassword } = user;
        return { token, user: userWithoutPassword };
    }
}
