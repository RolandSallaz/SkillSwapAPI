import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';

@WebSocketGateway()
export class UsersGateway {
  constructor(private readonly usersService: UsersService) {}

  @SubscribeMessage('createUser')
  create(@MessageBody() createUsersDto: CreateUsersDto) {
    return this.usersService.create(createUsersDto);
  }

  @SubscribeMessage('findAllUser')
  findAll() {
    return this.usersService.findAll();
  }

  @SubscribeMessage('findOneUser')
  findOne(@MessageBody() id: number) {
    return this.usersService.findOne(id);
  }

  @SubscribeMessage('updateUser')
  update(@MessageBody() updateUsersDto: UpdateUsersDto) {
    return this.usersService.update(updateUsersDto.id, updateUsersDto);
  }

  @SubscribeMessage('removeUser')
  remove(@MessageBody() id: number) {
    return this.usersService.remove(id);
  }
}
