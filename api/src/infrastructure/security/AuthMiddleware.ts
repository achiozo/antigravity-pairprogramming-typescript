import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key-fallback';

// Extend Express Request to append user info
export interface AuthRequest extends Request {
    user?: any;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Token missing or invalid format' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Contains userId and email passed during sign
        next();
    } catch (error: any) {
        res.status(401).json({ error: 'Token is invalid or expired' });
    }
}
