import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { unlink } from 'node:fs';
import * as path from 'path';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill) private skillRepository: Repository<Skill>,
  ) {}

  async create(userId: string, createSkillDto: CreateSkillDto) {
    return await this.skillRepository.save({
      ...createSkillDto,
      owner: { id: userId },
    });
  }

  findAll() {
    return `This action returns all skills`;
  }

  findOne(id: string) {
    return `This action returns a #${id} skill`;
  }

  async update(userId: string, id: string, updateSkillDto: UpdateSkillDto) {
    const skill = await this.userIsOwner(id, userId);
    return await this.skillRepository.save({
      ...skill,
      ...updateSkillDto,
    });
  }

  async remove(id: string, userId: string) {
    const skill = await this.userIsOwner(id, userId);
    skill.images.forEach((image) => {
      const relativePath = image.startsWith('/') ? image.slice(1) : image;
      const absolutePath = path.join(process.cwd(), relativePath);
      unlink(absolutePath, (err) => {
        if (err) {
          console.error(`Ошибка при удалении файла ${absolutePath}:`, err);
        }
      });
    });
    await this.skillRepository.delete(id);
    return `Skill with id ${id} has been removed`;
  }

  async userIsOwner(id: string, userId: string) {
    const skill = await this.skillRepository.findOneByOrFail({ id });
    if (skill.owner.id !== userId) {
      throw new ForbiddenException('Недостаточно прав');
    }
    return skill;
  }
}
