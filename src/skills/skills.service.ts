import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
// import { CreateSkillDto } from './dto/create-skill.dto';
// import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillsService {
  // create(createSkillDto: CreateSkillDto) {
  //   return 'This action adds a new skill';
  // }

  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async findAll(query: { page?: string; limit?: string; search?: string }) {
    const page = parseInt(query.page ?? '1') || 1;
    const limit = parseInt(query.limit ?? '20') || 20;
    const search = (query.search || '').toLowerCase();

    const qb = this.skillRepository
      .createQueryBuilder('skill')
      .where('LOWER(skill.title) LIKE :search', { search: `%${search}%` });

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

  findOne(id: number) {
    return `This action returns a #${id} skill`;
  }

  // update(id: number, updateSkillDto: UpdateSkillDto) {
  //   return `This action updates a #${id} skill`;
  // }

  remove(id: number) {
    return `This action removes a #${id} skill`;
  }
}
