import { User } from '../entities/users.entity';
import { Gender, UserRole } from '../enums';
import { Skill } from 'src/skills/entities/skill.entity';
declare const FindUserDTO_base: import("@nestjs/mapped-types").MappedType<Partial<User>>;
export declare class FindUserDTO extends FindUserDTO_base {
    id: string;
    name: string;
    email: string;
    age: number;
    city: string;
    aboutMe: string;
    gender: Gender;
    skills: Skill[];
    favoriteSkills: Skill[];
    role: UserRole;
}
export {};
