import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';

@Injectable()
export class UsersService {
  create(createUsersDto: CreateUsersDto) {
    return `Создание пользователя: ${createUsersDto.name}`;
  }

  findAll() {
    return `Вывод всех пользователей`;
  }

  findOne(id: number) {
    return `Найти пользователя по #${id}`;
  }

  update(id: number, updateUsersDto: UpdateUsersDto) {
    return `Обновление пользователя по #${id} ${updateUsersDto.name}`;
  }

  remove(id: number) {
    return `Удаление пользователя по #${id}`;
  }
}
