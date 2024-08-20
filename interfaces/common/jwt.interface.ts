import { JwtPayload as IJwtPayload } from 'jsonwebtoken';

export interface JwtPayload extends IJwtPayload {
    sub: string;
    user_email: string;
    iat?: number;
    exp?: number;
}
