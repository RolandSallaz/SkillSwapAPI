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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(200)
  refresh(@Req() req: AuthRequest) {
    return this.authService.refresh({
      id: req.user.sub,
      email: req.user.email,
      role: req.user.role,
    });
  }
  @UseGuards(AccessTokenGuard)
  @Post('logout')
  @HttpCode(200)
  logout(@Req() req: AuthRequest) {
    return this.authService.logout(req.user.sub);
  }
}
