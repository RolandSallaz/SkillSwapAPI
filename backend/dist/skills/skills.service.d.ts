import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
export declare class SkillsService {
    private skillRepository;
    constructor(skillRepository: Repository<Skill>);
    create(userId: string, createSkillDto: CreateSkillDto): Promise<{
        owner: {
            id: string;
        };
        title: string;
        description: string;
        category: string;
        images: string[];
    } & Skill>;
    find(query: {
        page?: string;
        limit?: string;
        search?: string;
    }): Promise<{
        data: Skill[];
        page: number;
        totalPages: number;
    }>;
    update(userId: string, id: string, updateSkillDto: UpdateSkillDto): Promise<{
        title: string;
        description: string;
        category?: string | undefined;
        images: string[];
        id: string;
        owner: import("../users/entities/users.entity").User;
    } & Skill>;
    remove(id: string, userId: string): Promise<string>;
    userIsOwner(id: string, userId: string): Promise<Skill>;
}
