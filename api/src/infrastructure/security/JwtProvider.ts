import jwt from 'jsonwebtoken';
import { ITokenProvider } from '../../domains/auth/core/ITokenProvider';

export class JwtProvider implements ITokenProvider {
    constructor(
        private readonly secret: string,
        private readonly expiresIn: string
    ) {}

    create(payload: object): string {
        return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn as any });
    }

    verify(token: string): any {
        return jwt.verify(token, this.secret);
    }

    decode(token: string): any {
        return jwt.decode(token);
    }

    isValid(token: string): boolean {
        try {
            this.verify(token);
            return true;
        } catch {
            return false;
        }
    }
}
