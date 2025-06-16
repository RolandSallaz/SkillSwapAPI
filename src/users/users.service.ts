import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUsersDto } from './dto/update.users.dto';
import { CreateUsersDto } from './dto/create.users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }
  async create(createUserDto: CreateUsersDto) {
    const user = await this.userRepository.save(createUserDto) as User;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, refreshToken, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findAll() {
    const users = await this.userRepository.find();
    const usersWithoutPassword = users.map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, refreshToken, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    return usersWithoutPassword;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneByOrFail({ id });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, refreshToken, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateUser(id: string, updateUserDto: UpdateUsersDto) {
    const user = await this.userRepository.findOneByOrFail({ id });
    const updatedUser = await this.userRepository.save({
      ...user,
      ...updateUserDto
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, refreshToken, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async updatePassword(id: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await this.userRepository.findOneByOrFail({ id });
    const updatedUser = await this.userRepository.save({
      ...user,
      password: hashedPassword,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, refreshToken, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async remove(id: string) {
    await this.userRepository.delete(id);
    return `Пользователь с id #${id} удален`;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async removeRefreshToken(id: string) {
    const user = await this.userRepository.findOneByOrFail({ id });
    user.refreshToken = '';
    await this.userRepository.save(user);
    return { message: `Refresh token для пользователя с id ${id} удален` };
  }
}
