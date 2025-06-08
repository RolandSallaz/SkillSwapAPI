import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  register(registerDto: RegisterDto) {
    return {
      message: 'Регистрация прошла успешно',
      user: registerDto,
      accessToken: 'fake-accessToken',
      refreshToken: 'fake-refreshToken',
    };
  }

  login(loginDto: LoginDto) {
    return {
      message: 'Вход выполнен успешно',
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
}
