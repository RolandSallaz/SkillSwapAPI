import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/users.entity';
import { Skill } from 'src/skills/entities/skill.entity';
import { Request } from 'src/requests/entities/request.entity';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request) private requestRepository: Repository<Request>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Skill) private skillRepository: Repository<Skill>,
  ) {}

  async create(senderID: string, createRequestDto: CreateRequestDto) {
    const { offeredSkillId, requestedSkillId } = createRequestDto;

    const offeredSkill = await this.skillRepository.findOneBy({
      id: offeredSkillId,
    });
    const requestedSkill = await this.skillRepository.findOneBy({
      id: requestedSkillId,
    });

    if (offeredSkill == null || requestedSkill == null)
      throw new BadRequestException(
        `Предлагаемый / запрашиваемый навык не существует`,
      );

    const senderId = offeredSkill.owner.id;
    const receiverId = requestedSkill.owner.id;

    if (senderID !== senderId)
      throw new BadRequestException(
        `Заявка сгенерирована не от имени авторизированного пользователя`,
      );
    const sender = await this.userRepository.findOneBy({ id: senderId });
    const receiver = await this.userRepository.findOneBy({ id: receiverId });
    if (sender == null)
      throw new BadRequestException(
        `Заявка сгенерирована  несуществующим пользователем`,
      );

    if (receiver == null)
      throw new BadRequestException(
        `Заявка адресована  несуществующему пользователю`,
      );

    const senderHasOfferedSkill = sender.skills.some(
      (skill) => skill.id === offeredSkillId,
    );

    if (!senderHasOfferedSkill) {
      throw new BadRequestException(
        `Авторизированный пользователь не обладает предлагаемым навыком.`,
      );
    }

    const receiverHasRequestedSkill = receiver.skills.some(
      (skill) => skill.id === requestedSkillId,
    );

    if (!receiverHasRequestedSkill) {
      throw new BadRequestException(
        `Получатель не обладает запрашиваемым навыком.`,
      );
    }

    const newRequest = new Request();

    newRequest.sender = sender;
    newRequest.receiver = receiver;
    newRequest.offeredSkill = offeredSkill;
    newRequest.requestedSkill = requestedSkill;

    return await this.requestRepository.save(newRequest);
  }

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
