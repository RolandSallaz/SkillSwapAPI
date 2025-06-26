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
    const { senderId, receiverId, offeredSkillId, requestedSkillId } =
      createRequestDto;
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

    const offeredSkill = await this.skillRepository.findOneBy({
      id: offeredSkillId,
    });
    const requestedSkill = await this.skillRepository.findOneBy({
      id: requestedSkillId,
    });

    if (offeredSkill == null)
      throw new BadRequestException(`Предлагаемый навык не существует`);

    if (requestedSkill == null)
      throw new BadRequestException(`Запрашиваемый навык не существует`);

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

  findOne(id: number) {
    return `This action returns a #${id} request`;
  }

  update(id: number, updateRequestDto: UpdateRequestDto) {
    return `This action updates a #${id} request`;
  }

  remove(id: number) {
    return `This action removes a #${id} request`;
  }
}
