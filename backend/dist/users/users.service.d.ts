import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create.users.dto';
import { UpdateUsersDto } from './dto/update.users.dto';
import { User } from './entities/users.entity';
import { ConfigService } from '@nestjs/config';
export declare class UsersService {
    private userRepository;
    private readonly configService;
    constructor(userRepository: Repository<User>, configService: ConfigService);
    create(createUserDto: CreateUsersDto): Promise<{
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
    findAll(): Promise<{
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
    }[]>;
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
    updateUser(id: string, updateUserDto: UpdateUsersDto): Promise<{
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
    updatePassword(id: string, newPassword: string): Promise<{
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
    findByEmail(email: string): Promise<User | null>;
    removeRefreshToken(id: string): Promise<{
        message: string;
    }>;
}
