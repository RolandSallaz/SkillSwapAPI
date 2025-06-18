import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill) private skillRepository: Repository<Skill>,
  ) {}

  async create(userId: string, createSkillDto: CreateSkillDto) {
    return await this.skillRepository.save({
      ...createSkillDto,
      owner: userId,
    });
  }

  findAll() {
    return `This action returns all skills`;
  }

  findOne(id: string) {
    return `This action returns a #${id} skill`;
  }

  async update(userId: string, id: string, updateSkillDto: UpdateSkillDto) {
    const skill = await this.skillRepository.findOneByOrFail({ id });
    if (skill.owner !== userId) {
      throw new ForbiddenException('Недостаточно прав');
    }
    return await this.skillRepository.save({
      ...skill,
      ...updateSkillDto,
    });
  }

  remove(id: string) {
    return `This action removes a #${id} skill`;
  }
}
