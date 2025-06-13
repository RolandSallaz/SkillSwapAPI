import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.auth.dto';
import { UsersService } from '../users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { CreateUsersDto } from 'src/users/dto/create.users.dto';
// Создание логики для работы с авторизацией
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  //register для регистрации: возвращает данные пользователя и токена refreshToken и accessToken
  register(user: CreateUsersDto) {
    // const hashedPassword = bcrypt.hash(user.password, 10);
    // let id: number;
    // const randomNum = async (num) => {
    //   id = Math.floor(Math.random() * num);
    //   if (await this.usersService.findOne(id)) {
    //     await randomNum(num);
    //   }
    //   return id;
    // };
    // await randomNum(100000000000000000000);

    // const tokens = this._getTokens({
    //   id: id,
    //   email: user.email,
    //   role: user.role,
    // });
    // const newUser = await this.usersService.create({
    //   ...user,
    //   password: hashedPassword,
    //   id: id,
    //   token: tokens.refreshToken
    // });
    return {
      message:
        'Регистрация прошла успешно, При регистрации пароль должен хешироваться перед сохранением в бд',
      user: user,
      accessToken: 'fake-accessToken',
      refreshToken: 'fake-refreshToken',
    };
  }
  //login для входа в аккаунт: возвращает данные пользователя и токены refreshToken и accessToken

  async login(loginDto: LoginDto) {
    const user = this.usersService.findByEmail(loginDto.email);
    const hashedPassword = await bcrypt.hash(loginDto.password, 10);
    if (!user || user?.password !== hashedPassword)
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

  async refresh(payload: { id: number; email: string; role?: string }) {
    return await this._getTokens(payload);
  }

  async logout(id: number) {
    return await this.usersService.removeRefreshToken(id);
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
