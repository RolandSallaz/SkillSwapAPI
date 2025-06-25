import { FindSkillsQueryDto } from './dto/find-skill.dto';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { AuthRequest } from 'src/auth/types';
export declare class SkillsController {
    private readonly skillsService;
    constructor(skillsService: SkillsService);
    create(req: AuthRequest, createSkillDto: CreateSkillDto): Promise<{
        owner: {
            id: string;
        };
        title: string;
        description: string;
        category: string;
        images: string[];
    } & import("./entities/skill.entity").Skill>;
    find(query: FindSkillsQueryDto): Promise<{
        data: import("./entities/skill.entity").Skill[];
        page: number;
        totalPages: number;
    }>;
    update(id: string, req: AuthRequest, updateSkillDto: UpdateSkillDto): Promise<{
        title: string;
        description: string;
        category?: string | undefined;
        images: string[];
        id: string;
        owner: import("../users/entities/users.entity").User;
    } & import("./entities/skill.entity").Skill>;
    remove(id: string, req: AuthRequest): Promise<string>;
}
