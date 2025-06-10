import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRequest, JwtPayload } from './accessToken.guard';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    const refreshToken = request.headers['authorization'];

    if (!refreshToken || !refreshToken.startsWith('Bearer ')) {
      throw new UnauthorizedException('Требуется refreshToken');
    }

    const token = refreshToken.split(' ')[1];

    try {
      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      request.user = payload;
    } catch {
      throw new UnauthorizedException('Невалидный refreshToken');
    }
    return true;
  }
}
