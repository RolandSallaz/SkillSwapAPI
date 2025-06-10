import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.auth.dto';
import { LoginDto } from './dto/login.auth.dto';
import { UsersService } from '../users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Создание логики для работы с авторизацией
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  register(registerDto: RegisterDto) {
    return {
      message:
        'Регистрация прошла успешно, При регистрации пароль должен хешироваться перед сохранением в бд',
      user: registerDto,
      accessToken: 'fake-accessToken',
      refreshToken: 'fake-refreshToken',
    };
  }

  async login(loginDto: LoginDto) {
    const user = this.usersService.findByEmail(loginDto.email);
    if (!user)
      throw new UnauthorizedException(
        'Пользователь не найден. Неверный email или пароль',
      );

    const tokens = await this._getTokens(user);
    return {
      message: 'Вход выполнен успешно',
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  refresh(refreshToken: string) {
    console.log('refreshToken:', refreshToken);
    return {
      accessToken: 'newAccessToken',
      refreshToken: 'newRefreshToken',
    };
  }

  logout() {
    return {
      message: 'Вы вышли из системы',
    };
  }

  async _getTokens(user: { id: number; email: string; role?: string }) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role || 'user',
    };
    const accessToken = await this.jwtService.signAsync(payload);

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('jwt.refreshTokenSecret'),
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}
