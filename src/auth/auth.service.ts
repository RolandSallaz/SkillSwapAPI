import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.auth.dto';
import { UsersService } from '../users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.auth.dto';
import { v4 as uuidv4 } from 'uuid';

// Создание логики для работы с авторизацией
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  //register для регистрации: возвращает данные пользователя и токена refreshToken и accessToken
  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new UnauthorizedException(
        'Пользователь с таким email уже существует',
      );
    }
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const id = uuidv4();
    const tokens = await this._getTokens({
      id,
      email: registerDto.email,
    });
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);
    const newUser = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
      id,
      refreshToken: hashedRefreshToken,
      role: 'user',
    });
    return {
      message: 'Регистрация прошла успешно',
      user: newUser,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
  //При входе должен сверяться переданный в body пароль с хешем из бд, если авторизация успешна, то отправляем jwt токен через куки

  //login для входа в аккаунт: возвращает данные пользователя и токены refreshToken и accessToken
  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!passwordMatch)
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

  async refresh(payload: { id: string; email: string; role?: string }) {
    return await this._getTokens(payload);
  }

  async logout(id: string) {
    return await this.usersService.removeRefreshToken(id);
  }

  async _getTokens(user: { id: string; email: string; role?: string }) {
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
