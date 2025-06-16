import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  AccessTokenGuard,
  AuthRequest,
} from '../auth/guards/accessToken.guard';
import { CreateUsersDto } from './dto/create.users.dto';
import { UpdateUsersDto } from './dto/update.users.dto';

//Создание точки входа для работы с пользователями
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AccessTokenGuard)
  @Get('me')
  findCurrentUser(@Req() req: AuthRequest) {
    return this.usersService.findOne(req.user.sub);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('me')
  updateUser(@Req() req: AuthRequest, @Body() updateUserDto: UpdateUsersDto) {
    return this.usersService.updateUser(req.user.sub, updateUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('me/password')
  updatePassword(@Req() req: AuthRequest, @Body('password') password: string) {
    return this.usersService.updatePassword(req.user.sub, password);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
