import pool from '../../../../infrastructure/database/connection';
import { User } from '../../core/models/User';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export class UserRepository {
    async findByEmail(email: string): Promise<User | null> {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) return null;
        return rows[0] as User;
    }

    async create(user: User): Promise<User> {
        await pool.query<ResultSetHeader>(
            'INSERT INTO users (id, name, email, password_hash) VALUES (?, ?, ?, ?)',
            [user.id, user.name, user.email, user.password_hash]
        );
        return await this.findByEmail(user.email) as User;
    }

    async findAll(): Promise<Omit<User, 'password_hash'>[]> {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT id, name, email, created_at, updated_at, verified_at FROM users');
        return rows as Omit<User, 'password_hash'>[];
    }

    async approve(id: string): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            'UPDATE users SET verified_at = CURRENT_TIMESTAMP WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0;
    }

    async delete(id: string): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            'DELETE FROM users WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0;
    }
}
