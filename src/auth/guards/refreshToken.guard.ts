import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

interface RefreshTokenRequest extends Request {
  cookies: {
    refreshToken?: string; // имя куки с refreshToken
    [key: string]: any;
  };
}

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RefreshTokenRequest>();
    const refreshToken = request.cookies?.refreshToken; // имя куки с refreshToken

    if (!refreshToken) {
      throw new UnauthorizedException('Требуется refreshToken');
    }

    try {
      this.jwtService.verify(refreshToken, {
        secret: 'test-secret', // фейковый секретный ключ для refreshToken
      });
    } catch {
      throw new UnauthorizedException('Невалидный refreshToken');
    }
    return true;
  }
}
