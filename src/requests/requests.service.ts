import { Injectable } from '@nestjs/common';
// import { CreateRequestDto } from './dto/create-request.dto';
// import { UpdateRequestDto } from './dto/update-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { Repository } from 'typeorm';
import { RequestStatus } from './enums';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request) private requestRepository: Repository<Request>,
    private usersService: UsersService,
  ) {}
  // create(createRequestDto: CreateRequestDto) {
  //   return 'This action adds a new request';
  // }

  findAll() {
    return `This action returns all requests`;
  }

  findOne(id: string) {
    return `This action returns a #${id} request`;
  }

  async update(id: string, action: string) {
    const request = await this.requestRepository.findOneOrFail({
      where: { id },
      relations: ['sender', 'receiver', 'offeredSkill', 'requestedSkill'],
    });
    switch (action) {
      case 'read':
        request.isRead = true;
        break;
      case 'accept':
        request.status = RequestStatus.ACCEPTED;
        //добавляем навыки пользователям, если их еще у пользователей нет
        if (
          !request.sender.favoriteSkills.some(
            (skill) => skill.id === request.requestedSkill.id,
          )
        ) {
          request.sender.favoriteSkills.push(request.requestedSkill);
          await this.usersService.updateUser(request.sender.id, {
            favoriteSkills: request.sender.favoriteSkills,
          });
        }
        if (
          !request.receiver.favoriteSkills.some(
            (skill) => skill.id === request.offeredSkill.id,
          )
        ) {
          request.receiver.favoriteSkills.push(request.offeredSkill);
          await this.usersService.updateUser(request.receiver.id, {
            favoriteSkills: request.receiver.favoriteSkills,
          });
        }

        break;
      case 'reject':
        if (request.status === RequestStatus.PENDING) {
          request.status = RequestStatus.REJECTED;
        } else {
          request.status = RequestStatus.PENDING;
        }
        break;
    }
    return await this.requestRepository.save(request);
  }

  remove(id: string) {
    return `This action removes a #${id} request`;
  }
}
