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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { JwtPayload } from '../auth/guards/accessToken.guard';
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: JwtPayload;
}

//Создание точки входа для работы с пользователями
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(AccessTokenGuard)
  @Get('me')
  findCurrentUser(@Req() req: RequestWithUser) {
    return this.usersService.findOne(req.user.sub);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('me')
  updateUser(
    @Req() req: RequestWithUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(req.user.sub, updateUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('me/password')
  updatePassword(
    @Req() req: RequestWithUser,
    @Body('password') password: string,
  ) {
    return this.usersService.updatePassword(req.user.sub, password);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
