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
    private config: ConfigService,
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

  login(loginDto: LoginDto) {
    const user = this.usersService.findById(loginDto.id);
    if (!user) throw new UnauthorizedException('Пользователь не найден');

    const payload = { sub: user.id, username: user.username };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.config.get('JWT_ACCESS_SECRET'),
      expiresIn: this.config.get('JWT_ACCESS_EXPIRES_IN'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.config.get('JWT_REFRESH_SECRET'),
      expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN'),
    });
    return {
      message:
        'Вход выполнен успешно, При входе должен сверяться переданный в body пароль с хешем из бд, если авторизация успешна, то отправляем jwt токен через куки',
      accessToken,
      refreshToken,
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
}
