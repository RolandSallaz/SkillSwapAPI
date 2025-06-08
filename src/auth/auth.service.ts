import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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
    const user = this.usersService.findOne(loginDto.userId);
    if (!user) throw new UnauthorizedException('Пользователь не найден');
    return {
      message:
        'Вход выполнен успешно, При входе должен сверяться переданный в body пароль с хешем из бд, если авторизация успешна, то отправляем jwt токен через куки',
      user: loginDto.email,
      accessToken: 'fake-accessToken',
      refreshToken: 'fake-refreshToken',
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
