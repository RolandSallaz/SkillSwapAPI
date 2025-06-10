import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return `This action adds a new user ${JSON.stringify(createUserDto)}`;
  }

  async findAll() {
    const users = await this.userRepository.find();
    const usersWithoutPassword = users.map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    return usersWithoutPassword;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneByOrFail({ id });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneByOrFail({ id });
    const updatedUser = await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
  }

  async updatePassword(id: number, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await this.userRepository.findOneByOrFail({ id });
    const updatedUser = await this.userRepository.save({
      ...user,
      password: hashedPassword,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
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
