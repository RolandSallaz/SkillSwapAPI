import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { unlink } from 'node:fs';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { logger } from 'src/logger/mainLogger';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill) private skillRepository: Repository<Skill>,
  ) {}

  async create(userId: string, createSkillDto: CreateSkillDto) {
    logger.info('вывод');
    return await this.skillRepository.save({
      ...createSkillDto,
      owner: { id: userId },
    });
  }

  async find(query: { page?: string; limit?: string; search?: string }) {
    const page = Math.max(parseInt(query.page ?? '1'), 1);
    const limit = Math.min(Math.max(parseInt(query.limit ?? '20'), 1), 100);
    const search = (query.search || '').trim().toLowerCase();
    const qb = this.skillRepository.createQueryBuilder('skill');

    if (search) {
      qb.where('LOWER(skill.title) LIKE :search', { search: `%${search}%` });
    }

    const [skills, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    if (page > totalPages && totalPages !== 0) {
      throw new NotFoundException('Page not found');
    }

    return {
      data: skills,
      page,
      totalPages,
    };
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
