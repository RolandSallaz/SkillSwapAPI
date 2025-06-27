import { Request } from 'express';
export interface JwtPayload {
    sub: string;
    email: string;
    role: 'user' | 'admin';
}
export interface AuthRequest extends Request {
    user: JwtPayload;
}
