import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { UpdateUsersDto } from './dto/update.users.dto';
import { UsersService } from './users.service';
import { AuthRequest } from '../auth/types'

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
