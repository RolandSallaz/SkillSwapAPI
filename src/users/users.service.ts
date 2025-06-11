import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsersDto } from './dto/create.users.dto';
import { UpdateUsersDto } from './dto/update.users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUsersDto) {
    const usersEmail = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (usersEmail) {
      throw new NotFoundException(
        `Пользователь с email ${createUserDto.email} уже существует`,
      );
    }
    await this.userRepository.save(createUserDto);
    return `Создан новый пользователь ${JSON.stringify(createUserDto)}`;
  }

  async findAll() {
    const users = await this.userRepository.find();
    if (!users) {
      throw new NotFoundException(`Пользователи не найдены`);
    }
    const usersWithoutPassword = users.map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    return usersWithoutPassword;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Пользователь не найден`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async updateUser(id: number, updateUserDto: UpdateUsersDto) {
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOneBy({ id });

    if (!updatedUser) {
      throw new NotFoundException(`Пользователь не найден`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
  }

  async updatePassword(id: number, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userRepository.update(id, { password: hashedPassword });
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`Пользователь не найден`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`Пользователь не найден`);
    }
    await this.userRepository.delete({ id });
    return `Удалён пользователь с id ${id}`;
  }

  findByEmail(email: string) {
    return {
      message: `Данные пользователя с email ${email}`,
      id: 1, // здесь должен быть реальный id пользователя
      username: 'test',
      password: 'hashed-password',
      email: `${email}`,
      role: 'User',
    };
  }
}
