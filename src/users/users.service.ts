import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create.users.dto';
import { UpdateUsersDto } from './dto/update.users.dto';

//Создание логики для работы с пользователями
@Injectable()
export class UsersService {
  create(createUsersDto: CreateUsersDto) {
    return `Создание пользователя: ${createUsersDto.name}`;
  }

  findAll() {
    return `Вывод всех пользователей`;
  }

  findById(id: number) {
    // возвращаем данные по id
    return {
      message: `Данные пользователя с id ${id}`,
      id,
      username: 'test',
      password: 'hashed-password',
    };
  }

  getMe(id: number) {
    // возвращаем данные текущего пользователя
    return {
      message: 'Данные текущего пользователя',
      id,
      username: 'current-user',
      password: 'hashed-password',
    };
  }

  updateMe(id: number, updateUsersDto: UpdateUsersDto) {
    return `Обновление пользователя #${id} с данными: ${JSON.stringify(updateUsersDto)}`;
  }

  updateMePassword(id: number, updateUsersDto: UpdateUsersDto) {
    return `Обновление пароля пользователя #${id} с данными: ${JSON.stringify(updateUsersDto)}`;
  }

  remove(id: number) {
    return `Удаление пользователя по #${id}`;
  }
}
