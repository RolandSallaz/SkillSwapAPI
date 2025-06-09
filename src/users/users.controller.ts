import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create.users.dto';
import { UpdateUsersDto } from './dto/update.users.dto';

interface AuthenticatedRequest extends Request {
  user: { sub: number; username: string };
}

//Создание точки входа для работы с пользователями
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUsersDto: CreateUsersDto) {
    return this.usersService.create(createUsersDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  // нужна гварда
  getMe(@Req() req: AuthenticatedRequest) {
    const user = this.usersService.getMe(req.user['sub']);
    return user;
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    const user = this.usersService.findById(id);
    return user;
  }

  @Patch('me')
  updateMe(
    @Req() req: AuthenticatedRequest,
    @Body() updateUsersDto: UpdateUsersDto,
  ) {
    return this.usersService.updateMe(req.user.sub, updateUsersDto);
  }

  @Patch('me/password')
  updateMePassword(
    @Req() req: AuthenticatedRequest,
    @Body() updateUsersDto: UpdateUsersDto,
  ) {
    return this.usersService.updateMe(req.user.sub, updateUsersDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
