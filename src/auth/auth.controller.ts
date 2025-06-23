import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.auth.dto';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { RegisterDto } from './dto/register.auth.dto';
import { AuthRequest } from './types';
import { ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiBody({
    description: 'Данные для регистрации пользователя',
    schema: {
      example: {
        name: 'Александр',
        email: 'alex@email.com',
        password: 'password',
        age: 27,
        city: 'Москва',
        aboutMe: 'Я',
        gender: 'Ж',
      },
    },
  })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Авторизация пользователя',
    description: 'ЛОГИН И ПАРОЛЬ ДОЛЖНЫ БЫТЬ ТАКИМИ ЖЕ, КАК ПРИ РЕГИСТРАЦИИ',
  })
  @HttpCode(200)
  @ApiBody({
    description: 'Данные для авторизации',
    schema: {
      example: {
        email: 'alex@email.com',
        password: 'password',
      },
    },
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiBearerAuth()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @ApiOperation({
    summary: 'Обновление токенов',
    description:
      'Используется для получения новых токенов доступа и обновления refresh токена',
  })
  @HttpCode(200)
  refresh(@Req() req: AuthRequest) {
    return this.authService.refresh({
      id: req.user.sub,
      email: req.user.email,
      role: req.user.role,
    });
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post('logout')
  @ApiOperation({
    summary: 'Выход из системы',
    description: 'Удаляет refresh токен пользователя и завершает сессию',
  })
  @HttpCode(200)
  logout(@Req() req: AuthRequest) {
    return this.authService.logout(req.user.sub);
  }
}
