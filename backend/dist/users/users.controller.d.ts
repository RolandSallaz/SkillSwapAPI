import { FindUserDTO } from './dto/find.users.dto';
import { UpdateUsersDto } from './dto/update.users.dto';
import { UsersService } from './users.service';
import { AuthRequest } from '../auth/types';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<FindUserDTO[]>;
    findCurrentUser(req: AuthRequest): Promise<{
        id: string;
        name: string;
        email: string;
        age: number;
        city: string;
        aboutMe: string;
        gender: import("./enums").Gender;
        skills: import("../skills/entities/skill.entity").Skill[];
        favoriteSkills: import("../skills/entities/skill.entity").Skill[];
        role: import("./enums").UserRole;
    }>;
    updateUser(req: AuthRequest, updateUserDto: UpdateUsersDto): Promise<{
        name: string;
        email: string;
        id: string;
        age: number;
        city: string;
        aboutMe: string;
        gender: import("./enums").Gender;
        skills: import("../skills/entities/skill.entity").Skill[];
        favoriteSkills: import("../skills/entities/skill.entity").Skill[];
        role: import("./enums").UserRole;
    }>;
    updatePassword(req: AuthRequest, password: string): Promise<{
        id: string;
        name: string;
        email: string;
        age: number;
        city: string;
        aboutMe: string;
        gender: import("./enums").Gender;
        skills: import("../skills/entities/skill.entity").Skill[];
        favoriteSkills: import("../skills/entities/skill.entity").Skill[];
        role: import("./enums").UserRole;
    }>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        age: number;
        city: string;
        aboutMe: string;
        gender: import("./enums").Gender;
        skills: import("../skills/entities/skill.entity").Skill[];
        favoriteSkills: import("../skills/entities/skill.entity").Skill[];
        role: import("./enums").UserRole;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
